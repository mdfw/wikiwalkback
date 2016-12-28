import { connect } from 'react-redux';
import React from 'react';
import SearchForm from './SearchForm';
import constants from '../constants';
import actions from '../actions/actions';

class SearchFormContainer extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    let toWhere = constants.SEARCH_AREA_LOC_TOP;
    if (this.props.searchLocation === constants.SEARCH_AREA_LOC_TOP) {
      toWhere = constants.SEARCH_AREA_LOC_MID;
    }
    this.props.dispatch(
      actions.searchAreaLoc(toWhere),
    );
    this.props.dispatch(
      actions.updateWalkStatus(constants.WALK_STATUS_START),
    );
  }
  onChange(input) {
    this.props.dispatch(
      actions.searchInput(input),
    );
  }
  render() {
    return (
      <SearchForm
        onSubmit={(e) => this.onSubmit(e)}
        onChange={(input) => this.onChange(input)}
        currentInput={this.props.currentInput}
      />
    );
  }
}

SearchFormContainer.propTypes = {
  searchLocation: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  currentInput: React.PropTypes.string.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    searchLocation: state.searchLocation,
    currentInput: state.currentInput,
  };
};


const Container = connect(mapStateToProps)(SearchFormContainer);

export default Container;

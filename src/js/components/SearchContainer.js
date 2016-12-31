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
      toWhere = constants.SEARCH_AREA_LOC_TOP;
    }
    this.props.dispatch(
      actions.searchAreaLoc(toWhere),
    );
    this.props.dispatch(
      actions.updateWalkStatus(constants.WALK_STATUS_START),
    );
  }
  onChange(input, walkDepth) {
    this.props.dispatch(
      actions.searchInput(input, walkDepth),
    );
  }
  render() {
    return (
      <SearchForm
        onSubmit={(e) => this.onSubmit(e)}
        onChange={(input, walkDepth) => this.onChange(input, walkDepth)}
        currentInput={this.props.currentInput}
        walkDepth={this.props.walkDepth}
        walkDepthMax={constants.WALK_DEPTH_MAX}
        walkDepthMin={constants.WALK_DEPTH_MIN}
        searchReady={this.props.searchReady}
      />
    );
  }
}

SearchFormContainer.propTypes = {
  searchLocation: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  currentInput: React.PropTypes.string.isRequired,
  searchReady: React.PropTypes.bool.isRequired,
  walkDepth: React.PropTypes.number.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    searchLocation: state.searchLocation,
    currentInput: state.currentInput,
    walkDepth: state.walkDepth,
    searchReady: state.searchReady,
  };
};


const Container = connect(mapStateToProps)(SearchFormContainer);

export default Container;

import { connect } from 'react-redux';
import React from 'react';
import SearchForm from './SearchForm';
import constants from '../constants';
import actions from '../actions/actions';

class SearchFormContainer extends React.Component {
  onSubmit(e) {
    e.preventDefault();
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
        onSubmit={e => this.onSubmit(e)}
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
  dispatch: React.PropTypes.func.isRequired,
  currentInput: React.PropTypes.string.isRequired,
  searchReady: React.PropTypes.bool.isRequired,
  walkDepth: React.PropTypes.number.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    currentInput: state.currentInput,
    walkDepth: state.rounds.length,
    searchReady: state.searchReady,
  };
};

const Container = connect(mapStateToProps)(SearchFormContainer);

export default Container;

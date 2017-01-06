import { connect } from 'react-redux';
import React from 'react';
import SearchForm from './SearchForm';
import constants from '../constants';
import actions from '../actions/actions';

export const SEARCH_FORM_MINIMAL = 'minSearch';
export const SEARCH_FORM_MAXIMAL = 'maxSearch';

class SearchFormContainer extends React.Component {
  componentDidMount() {
    document.body.className = 'bodyWithBackground';
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.router.push(`/results/${this.props.currentInput}/${this.props.walkDepth}`);
  }
  onChange(input, walkDepth) {
    this.props.dispatch(
      actions.searchInput(input, walkDepth),
    );
  }
  render() {
    let minForm = false;
    if (this.props.searchFormSize && this.props.searchFormSize === SEARCH_FORM_MINIMAL) {
      minForm = true;
    }
    return (
      <SearchForm
        onSubmit={e => this.onSubmit(e)}
        onChange={(input, walkDepth) => this.onChange(input, walkDepth)}
        currentInput={this.props.currentInput}
        walkDepth={this.props.walkDepth}
        walkDepthMax={constants.WALK_DEPTH_MAX}
        walkDepthMin={constants.WALK_DEPTH_MIN}
        searchReady={this.props.searchReady}
        minimalForm={minForm}
      />
    );
  }
}

SearchFormContainer.propTypes = {
  router: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchFormSize: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  currentInput: React.PropTypes.string.isRequired,
  searchReady: React.PropTypes.bool.isRequired,
  walkDepth: React.PropTypes.number.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    router: ownprops.router,
    currentInput: state.currentInput,
    walkDepth: state.rounds.length,
    searchReady: state.searchReady,
  };
};

const Container = connect(mapStateToProps)(SearchFormContainer);

export default Container;

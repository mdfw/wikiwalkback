import { connect } from 'react-redux';
import React from 'react';
import ResultRows from './ResultRows';
import constants from '../constants';
import actions from '../actions/actions';
import store from '../store';
import SearchContainer, { SEARCH_FORM_MINIMAL } from './SearchContainer';
import ResultsError from './ResultsError';

const ResultsHeader = props => (
  <div id="ResultsHeader">
    You searched for {props.currentInput}. What are the connections?
  </div>
);

ResultsHeader.propTypes = {
  currentInput: React.PropTypes.string.isRequired,
};

class ResultsContainer extends React.Component {
  componentDidMount() {
    document.body.className = 'bodyNoBackground';
    this.startNewSearch(this.props.urlSearchTerm,
      Number(this.props.urlSteps),
      this.props.resultsLastSearchTerm,
      this.props.resultsLastSearchSteps,
    );
  }
  componentWillReceiveProps(nextProps) {
    this.startNewSearch(nextProps.urlSearchTerm,
      Number(nextProps.urlSteps),
      nextProps.resultsLastSearchTerm,
      nextProps.resultsLastSearchSteps,
    );
  }
  startNewSearch(searchTerm, steps, lastSearchTerm, lastSteps) {
    /* Restarts a search if searchTerm or steps is different than those in state.
     * If searchTerm and steps match, returns without action.
     */
    let walkSteps = steps;
    if (isNaN(steps)) {
      if (searchTerm === lastSearchTerm) {
        return;
      }
      walkSteps = null;
    } else if (searchTerm === lastSearchTerm &&
      steps === lastSteps) {
      return;
    }
    this.props.dispatch(
      actions.resetWalkback(),
    );
    this.props.dispatch(
      actions.resultsParams(searchTerm, steps),
    );
    this.props.dispatch(
      actions.searchInput(searchTerm, walkSteps),
    );
    this.props.dispatch(
      actions.updateWalkStatus(constants.WALK_STATUS_START),
    );
  }
  tagClick(linkTitle) {
    this.props.router.push(`/results/${linkTitle}/${this.props.numRounds}`);
  }
  finalClick(linkTitle) { // eslint-disable-line class-methods-use-this
    const state = store.getState();
    if (linkTitle && linkTitle.length > 0 && state.wikipediaSubsite) {
      window.open(`https://${state.wikipediaSubsite}.wikipedia.org/wiki/${linkTitle}`);
    }
  }
  render() {
    let walkError = null;
    if (this.props.status === constants.WALK_STATUS_ERROR) {
      walkError = <ResultsError errorMessage={this.props.walkError} />;
    }
    const searchAgainStyle = {
      fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
      float: 'none',
      textAlign: 'center',
      fontSize: '2em',
    };
    return (
      <div id="resultsContainer">
        <div style={{ margin: '0 auto', maxWidth: 600 }}>
          <ResultRows
            tagClick={linkTitle => this.tagClick(linkTitle)}
            finalClick={linkTitle => this.finalClick(linkTitle)}
          />
          { walkError }
          <p style={searchAgainStyle}>WalkBack again!</p>
          <SearchContainer searchFormSize={SEARCH_FORM_MINIMAL} router={this.props.router} />
        </div>
      </div>
    );
  }
}

ResultsContainer.propTypes = {
  router: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  urlSteps: React.PropTypes.string,
  urlSearchTerm: React.PropTypes.string,
  status: React.PropTypes.string.isRequired,
  numRounds: React.PropTypes.number,
  walkError: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  resultsLastSearchSteps: React.PropTypes.number,
  resultsLastSearchTerm: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    router: ownprops.router,
    urlSteps: ownprops.params.steps,
    urlSearchTerm: ownprops.params.searchTerm,
    resultsLastSearchTerm: state.resultsLastSearchTerm,
    resultsLastSearchSteps: state.resultsLastSearchSteps,
    numRounds: state.rounds.length,
    status: state.walkStatus,
    walkError: state.walkError,
  };
};

const Container = connect(mapStateToProps)(ResultsContainer);

export default Container;

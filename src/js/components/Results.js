import { connect } from 'react-redux';
import React from 'react';
import ResultRows from './ResultRows';
import constants from '../constants';
import actions from '../actions/actions';

const ResultsHeader = props => (
  <div id="ResultsHeader">
    You searched for {props.currentInput}. What are the connections?
  </div>
);

ResultsHeader.propTypes = {
  currentInput: React.PropTypes.string.isRequired,
};

const ResultsError = props => (
  <div id="Error">
    There was an error: {props.errorMessage}.
  </div>
);

ResultsError.propTypes = {
  errorMessage: React.PropTypes.string.isRequired,
};

class ResultsContainer extends React.Component {
  tagClick(linkTitle) {
    console.log('clicked on ' + linkTitle);
    this.props.dispatch(
      actions.resetWalkback(),
    );
    this.props.dispatch(
      actions.searchInput(linkTitle, null),
    );
    this.props.dispatch(
      actions.updateWalkStatus(constants.WALK_STATUS_START),
    );
  }
  render() {
    let error = null;
    if (this.props.status === constants.WALK_STATUS_ERROR) {
      error = <ResultsError errorMessage={this.props.walkError} />;
    }
    return (
      <div id="resultsContainer1">
        <ResultsHeader currentInput={this.props.currentInput} />
        <ResultRows tagClick={linkTitle => this.tagClick(linkTitle)} />
        { error }
      </div>
    );
  }
}

ResultsContainer.propTypes = {
  currentInput: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  walkError: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    currentInput: state.currentInput,
    status: state.walkStatus,
    walkError: state.walkError,
  };
};

const Container = connect(mapStateToProps)(ResultsContainer);

export default Container;

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

const ResultsError = (props) => {
  let message = 'Unfortunately, an error occurred while fetching. I do not see an error message here though, so I am not sure what went wrong. Sorry about that.';
  if (props.errorMessage) {
    message = 'Unfortunately, an error occurred while fetching. The error message reads "' + props.errorMessage + '"';
  }
  const errorStyle = {
    fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
    float: 'none',
    textAlign: 'center',
    fontSize: '2em',
    margin: '2em',
    color: '#660000',
  };
  return (
    <div id="Error" style={errorStyle}>
      {message}
    </div>
  );
};

ResultsError.propTypes = {
  errorMessage: React.PropTypes.string,
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
  finalClick(linkTitle) {
    console.log('Should have opened the page' + linkTitle);
  }
  render() {
    let error = null;
    if (this.props.status === constants.WALK_STATUS_ERROR) {
      error = <ResultsError errorMessage={this.props.walkError} />;
    }
    return (
      <div id="resultsContainer">
        <ResultRows
          tagClick={linkTitle => this.tagClick(linkTitle)}
          finalClick={linkTitle => this.finalClick(linkTitle)}
        />
        { error }
      </div>
    );
  }
}

ResultsContainer.propTypes = {
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

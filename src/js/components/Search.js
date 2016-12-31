import { connect } from 'react-redux';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import constants from '../constants';
import SearchFormContainer from './SearchContainer';

class App extends React.Component {

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName='searchInOut'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div id="searchFormHolder" className='searchArea' key='searchAreaMid'>
          <SearchFormContainer />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

App.propTypes = {
  searchLocation: React.PropTypes.string.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    searchAreaHeightPercent: state.searchAreaHeightPercent,
    searchLocation: state.searchLocation,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;

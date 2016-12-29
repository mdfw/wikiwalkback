import { connect } from 'react-redux';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import constants from '../constants';
import SearchFormContainer from './SearchContainer';
import WordClouds from './WordClouds';

class App extends React.Component {

  render() {
    let divKey = constants.SEARCH_AREA_LOC_MID;
    let transName = 'moveSearchMid';
    let classForDiv = 'searchAreaMid';
    if (this.props.searchLocation === constants.SEARCH_AREA_LOC_TOP) {
      divKey = constants.SEARCH_AREA_LOC_TOP;
      transName = 'moveSearchHigh';
      classForDiv = 'searchAreaHigh';
    }
    return (
      <ReactCSSTransitionGroup
        transitionName={transName}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={1}
      >
        <div id="mainapp">
          <div id="searchFromHolder" className={['searchArea', classForDiv].join(' ')} key={divKey}>
          <SearchFormContainer />
          </div>
          <div id="cloudy">
          <WordClouds />
          </div>
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

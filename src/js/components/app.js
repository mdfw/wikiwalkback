import { connect } from 'react-redux';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import constants from '../constants';
import Header from './Header';
import Search from './Search';

class App extends React.Component {
  render() {
  let childd = []
  if (this.props.searchLocation === constants.SEARCH_AREA_LOC_MID) {
    childd.push(<Search />)
  }
     return (
       <div id="mainapp">
        <Header />
        <div className="bgImage">
          <img alt="name" src="assets/Wikipedia-puzzleglobe-V2_back.png" />
        </div>
        {childd}
      </div>
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

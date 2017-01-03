import { connect } from 'react-redux';
import React from 'react';
import constants from '../constants';
import Header from './Header';
import SearchContainer from './SearchContainer';
import Results from './Results';

function App(props) {
  let searchState = '';
  if (props.walkStatus === constants.WALK_STATUS_INPUT) {
    searchState = <SearchContainer key="allsearch" />;
  } else {
    searchState = <Results />;
  }
  return (
    <div id="mainapp">
      <Header />
      {searchState}
    </div>
  );
}

App.propTypes = {
  walkStatus: React.PropTypes.string.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    walkStatus: state.walkStatus,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;

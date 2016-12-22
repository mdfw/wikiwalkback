import { connect } from 'react-redux';
import React from 'react';
import SearchFormContainer from './SearchContainer';

class App extends React.Component {

  render() {
    const topPercent = `${this.props.searchAreaHeightPercent}%`;
    const divStyle = {
      margin: 0,
      position: 'absolute',
      top: topPercent,
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    return (
      <div style={divStyle} id="mainapp">
        <SearchFormContainer />
      </div>
    );
  }
}

App.propTypes = {
  searchAreaHeightPercent: React.PropTypes.number.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    searchAreaHeightPercent: state.searchAreaHeightPercent,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;

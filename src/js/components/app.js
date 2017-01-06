import { connect } from 'react-redux';
import React from 'react';
import Header from './Header';

function App(props) {
  return (
    <div id="mainapp">
      <Header />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
  };
};

const Container = connect(mapStateToProps)(App);

export default Container;

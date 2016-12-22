import { connect } from 'react-redux';
import React from 'react';
import SearchForm from './SearchForm';
import constants from '../constants';
import actions from '../actions/actions';

class SearchFormContainer extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const newHeight = this.props.searchAreaHeightPercent - constants.SEARCH_AREA_MOVE_PERCENT;
    this.moveSearchUp(newHeight);
  }
  moveSearchUp(toHeight) {
    this.props.dispatch(
      actions.searchAreaHeight(toHeight),
    );
    if (toHeight > constants.SEARCH_AREA_HEIGHT_MIN_PERCENT) {
      const newHeight = toHeight - constants.SEARCH_AREA_MOVE_PERCENT;
      const that = this;
      window.setTimeout(function setNewHeight() {
        that.moveSearchUp(newHeight);
      }, constants.SEARCH_AREA_MOVE_DELAY);
    }
  }
  render() {
    return (
      <SearchForm onSubmit={(e) => this.onSubmit(e)} />
    );
  }
}

SearchFormContainer.propTypes = {
  searchAreaHeightPercent: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    searchAreaHeightPercent: state.searchAreaHeightPercent,
  };
};


const Container = connect(mapStateToProps)(SearchFormContainer);

export default Container;

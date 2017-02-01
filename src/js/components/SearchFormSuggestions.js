import React from 'react';
import { connect } from 'react-redux';
import { getRandom, searchInput } from '../actions/actions';

class SearchFormSuggestions extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      getRandom(),
    );
  }
  processClick(event) {
    event.preventDefault();

    this.props.dispatch(
      searchInput(event.currentTarget.text),
    );
  }

  render() {
    let suggestionTitle = null;
    let suggestionArray = null;
    const randTitles = this.props.randomTitles;
    if (randTitles && randTitles.length > 0) {
      suggestionTitle = 'Try: ';
      const onClick = this.processClick.bind(this); // eslint-disable-line react/jsx-no-bind
      suggestionArray = randTitles.map((t, i) => {
        let sep = '';
        if (i < randTitles.length - 1) sep = ', ';
        /* eslint-disable jsx-a11y/href-no-hash */
        return (
          <span key={t}>
            <a style={{ textDecoration: 'none' }} onClick={e => onClick(e)} href="#">
              {t}
            </a>
            {sep}
          </span>
        );
        /* eslint-enable jsx-a11y/href-no-hash */
      });
    }
    return (
      <div style={{ margin: '10px' }}>
        {suggestionTitle}{suggestionArray}
      </div>
    );
  }
}

SearchFormSuggestions.propTypes = {
  randomTitles: React.PropTypes.arrayOf(React.PropTypes.string),
  dispatch: React.PropTypes.func.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    randomTitles: state.randomTitles,
  };
};

const Container = connect(mapStateToProps)(SearchFormSuggestions);

export default Container;

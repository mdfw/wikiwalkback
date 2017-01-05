import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class SearchForm extends React.Component {
  onInputChange(e) {
    this.props.onChange(e.target.value, null);
  }
  onWalkDepthChange(e) {
    this.props.onChange(null, Number(e.target.value));
  }
  render() {
    const searchStyle = {
      float: 'none',
      padding: '.3em',
      textAlign: 'center',
      verticalAlign: 'middle',
      opacity: '1',
    };
    const searchSelectStyle = {
      border: '1px solid #a2a9b1',
      borderRadius: '2px',
      height: '2rem',
      lineHeight: '1.6rem',
      fontSize: '1em',
    };
    const searchInputStyle = Object.assign({}, searchSelectStyle, {
      backgroundColor: 'white',
      width: '45%',
    });
    const formStyle = {
      textAlign: 'center',
    };
    const selections = [];
    for (let i = this.props.walkDepthMin; i <= this.props.walkDepthMax; i++) {
      const key = `depth${i}`;
      selections.push(<option value={i} key={key}>{i}</option>);
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="searchInOut"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={300}
      >
        <div id="searchFormHolder" className="searchArea" key="searchFormHolder">
          <div style={searchStyle} className="search-container" key="searchContainer">
            <p><strong>Discover the hidden connections in Wikipedia.</strong></p>
            <form style={formStyle} onSubmit={this.props.onSubmit}>
              <p>1. Enter a page to search for:</p>
              <input
                type="text"
                style={searchInputStyle}
                onChange={e => this.onInputChange(e)}
                value={this.props.currentInput}
              />
              <p>2. Select how many <i>generations</i> to walk through.</p>
              <select
                id="walkDepth"
                style={searchSelectStyle}
                defaultValue={this.props.walkDepth}
                onChange={e => this.onWalkDepthChange(e)}
              >
                {selections}
              </select>
              <p>3. Click walk and find those connections!</p>
              <button
                type="submit"
                value="Submit"
                disabled={!this.props.searchReady}
                style={searchSelectStyle}
              >Walk!</button>
            </form>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  currentInput: React.PropTypes.string.isRequired,
  searchReady: React.PropTypes.bool.isRequired,
  walkDepthMin: React.PropTypes.number.isRequired,
  walkDepthMax: React.PropTypes.number.isRequired,
  walkDepth: React.PropTypes.number.isRequired,
};

export default SearchForm;


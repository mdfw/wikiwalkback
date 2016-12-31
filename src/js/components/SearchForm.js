import React from 'react';


class SearchForm extends React.Component {
  onChange() {
    const inputval = this.refs.searchinput.value;
    const wdval = this.refs.walkDepth.value;
    this.props.onChange(inputval, wdval);
  }
  render() {
    const searchStyle = {
      float: 'none',
      padding: '.3em',
      textAlign: 'center',
      verticalAlign: 'middle',
    };

    const formStyle = {
      textAlign: 'center',
    };
    const selections = [];
    for (let i = this.props.walkDepthMin; i <= this.props.walkDepthMax; i++) {
      const key = 'depth' + i;
      selections.push(<option value={i} key={key}>{i}</option>);
    }
    return (
      <div style={searchStyle} className="search-container">
        <h2>Discover the hidden connections in Wikipedia.</h2>
        <form style={formStyle} onSubmit={this.props.onSubmit}>
          <p>1. Enter a page to search for:</p>
          <input
            ref="searchinput"
            type="text"
            onChange={(e) => this.onChange(e)}
            value={this.props.currentInput}
          />
          <p>2. Select how many <i>generations</i> to walk through.</p>
          <select
            id="walkDepth"
            ref="walkDepth"
            defaultValue={this.props.walkDepth}
            onChange={(e) => this.onChange(e)}
          >
            {selections}
          </select>
          <p>3. Click walk and find those connections!</p>
          <button type="submit" value="Submit" disabled={!this.props.searchReady}>Walk!</button>
        </form>
      </div>
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


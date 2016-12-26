import React from 'react';


class SearchForm extends React.Component {
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const searchStyle = {
      float: 'none',
      maxWidth: '95%',
      padding: '.3em',
      textAlign: 'center',
      verticalAlign: 'middle',
    };

    const formStyle = {
      textAlign: 'center',
    };

    return (
      <div style={searchStyle} className="search-container">
        <form style={formStyle} onSubmit={this.props.onSubmit}>
          <input type="text" onChange={(e) => this.onChange(e)} value={this.props.currentInput} />
          <button type="submit" value="Submit">Walk back</button>
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  currentInput: React.PropTypes.string.isRequired,
};

export default SearchForm;


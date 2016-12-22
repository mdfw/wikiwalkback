import React from 'react';


class SearchForm extends React.Component {

  render() {
    console.dir(this.state);
    console.dir(this.props);
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
          <input type="text" />
          <button type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default SearchForm;


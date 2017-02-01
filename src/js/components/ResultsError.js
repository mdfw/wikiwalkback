import React from 'react';

const ResultsError = (props) => {
  let message = 'Unfortunately, an error occurred while fetching. I do not see an error message here though, so I am not sure what went wrong. Sorry about that.';
  if (props.errorMessage) {
    message = `Unfortunately, an error occurred while fetching. The error message reads "${props.errorMessage}"`;
  }
  const errorStyle = {
    fontFamily: '"EBGaramond-Regular","Palatino Linotype", "Book Antiqua", Palatino, serif',
    float: 'none',
    textAlign: 'center',
    fontSize: '1.5em',
    margin: '2em',
    color: '#660000',
  };
  return (
    <div id="Error" style={errorStyle}>
      {message}
    </div>
  );
};

ResultsError.propTypes = {
  errorMessage: React.PropTypes.string,
};

exports.ResultsError = ResultsError;

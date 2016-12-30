import React from 'react';

const Header = function Header() {
  const headerStyle = {
    fontFamily: 'EBGaramond-Regular',
    maxWidth: '95%',
    padding: '.3em',
    textAlign: 'center',
  };
  return (
    <div style={headerStyle} id="header">
      <h1>WikiWalkBack</h1>
    </div>
  );
};

module.exports = Header;

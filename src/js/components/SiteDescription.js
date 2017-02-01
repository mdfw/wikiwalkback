import React from 'react';

const Description = function Description() {
  return (
    <div id="description" style={{ margin: '0 auto', marginBottom: '50px', padding: '20px', backgroundColor: 'white', maxWidth: '500px', fontWeight: 'strong', textAlign: 'left', boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px' }}>
      <p>Discover the hidden connections in Wikipedia - backwards.</p>
      <ol>
        <lh>The algorithm:</lh>
        <li>Pick a page.</li>
        <li>Find the wikipedia pages that link to page #1.</li>
        <li>Pick a random set of those pages.</li>
        <li>Find the links to those pages.</li>
        <li>Repeat a number of times</li>
        <li>Pick one final page from the last set.</li>
      </ol>
      <p>Imagine Ginger Rogers dancing (in heels) backward through the information graph
       of Wikipedia connections until she stops at a random spot.</p>
    </div>
  );
};

module.exports = Description;

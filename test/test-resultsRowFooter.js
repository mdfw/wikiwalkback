import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { describe, it } from 'mocha';
import { ResultsRowFooter } from '../src/js/components/ResultRowHeader';
import constants from '../src/js/constants';


describe('ResultsRowFooter', () => {
  const toFetchTitles = ['title1', 'title2', 'title3'];
  const linkCount = 29;
  let rowPosition = constants.RESULTS_ROW_FIRST;

  const renderer = TestUtils.createRenderer();

  it('Renders the penultimate row', () => {
    rowPosition = constants.RESULTS_ROW_PENULTIMATE;
    renderer.render(
      <ResultsRowFooter
        rowPosition={rowPosition}
        toFetchTitles={toFetchTitles}
        linkCount={linkCount}
      />,
    );
    const result = renderer.getRenderOutput();
    should.exist(result);
    const phrase = result.props.children;
    phrase.should.equal('With that, I present you with the final page:');
  });
  it('Renders the last row', () => {
    rowPosition = constants.RESULTS_ROW_LAST;
    renderer.render(
      <ResultsRowFooter
        rowPosition={rowPosition}
        toFetchTitles={toFetchTitles}
        linkCount={linkCount}
      />,
    );
    const result = renderer.getRenderOutput();
    const phrase = result.props.children;
    phrase.should.equal('');
  });
  it('Renders other rows', () => {
    rowPosition = constants.RESULTS_ROW_OTHER;
    renderer.render(
      <ResultsRowFooter
        rowPosition={rowPosition}
        toFetchTitles={toFetchTitles}
        linkCount={linkCount}
      />,
    );
    const result = renderer.getRenderOutput();
    const phrase = result.props.children;
    phrase.should.equal('From those 29 pages, I picked 3 to move on to the next step: "title1", "title2" and "title3"');
  });
});

/*
  ResultsRowFooter.propTypes = {
  rowPosition: React.PropTypes.string.isRequired,
  linkCount: React.PropTypes.number,
  toFetchTitles: React.PropTypes.arrayOf(React.PropTypes.string),
};
*/

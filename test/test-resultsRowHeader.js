import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { describe, it } from 'mocha';
import constants from '../src/js/constants';
import { ResultsRowHeader } from '../src/js/components/ResultRowHeader';


describe('ResultsRowHeader', () => {
  const fetchedTitles = ['title1', 'title2', 'title3'];
  const linkCount = 29;
  const maxPossibleLinks = 29;
  let rowNum = 1;
  let rowPosition = constants.RESULTS_ROW_FIRST;
  let fetching = false;

  const renderer = TestUtils.createRenderer();

  it('Renders the first row', () => {
    renderer.render(
      <ResultsRowHeader
        rowNumber={rowNum}
        rowPosition={rowPosition}
        fetchedTitles={fetchedTitles}
        linkCount={linkCount}
        fetching={fetching}
        maxPossibleLinks={maxPossibleLinks}
      />)
    ;
    const result = renderer.getRenderOutput();
    should.exist(result);
    const phrase = result.props.children;
    phrase.should.equal('Step 1: You searched for "title1, title2 and title3." I found 29 (there may be more) pages that link to the "title1", "title2" and "title3" page:');
  });
  it('Renders the penultimate row', () => {
    rowPosition = constants.RESULTS_ROW_PENULTIMATE;
    renderer.render(
      <ResultsRowHeader
        rowNumber={rowNum}
        rowPosition={rowPosition}
        fetchedTitles={fetchedTitles}
        linkCount={linkCount}
        fetching={fetching}
        maxPossibleLinks={maxPossibleLinks}
      />,
    );
    const result = renderer.getRenderOutput();
    const phrase = result.props.children;
    phrase.should.equal('Final Step:  I found at least 29 pages that link to "title1", "title2" or "title3":');
  });
  it('Renders the last row', () => {
    rowPosition = constants.RESULTS_ROW_LAST;
    renderer.render(
      <ResultsRowHeader
        rowNumber={rowNum}
        rowPosition={rowPosition}
        fetchedTitles={fetchedTitles}
        linkCount={linkCount}
        fetching={fetching}
        maxPossibleLinks={maxPossibleLinks}
      />,
    );
    const result = renderer.getRenderOutput();
    const phrase = result.props.children;
    phrase.should.equal('');
  });
  it('Renders other rows', () => {
    rowNum = 2;
    rowPosition = constants.RESULTS_ROW_OTHER;
    fetching = true;
    renderer.render(
      <ResultsRowHeader
        rowNumber={rowNum}
        rowPosition={rowPosition}
        fetchedTitles={fetchedTitles}
        linkCount={linkCount}
        fetching={fetching}
        maxPossibleLinks={maxPossibleLinks}
      />,
    );
    const result = renderer.getRenderOutput();
    const phrase = result.props.children;
    phrase.should.equal('Step 2: Fetching links to "title1", "title2" or "title3"...');
  });
});

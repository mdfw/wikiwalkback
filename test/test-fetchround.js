import { describe, it } from 'mocha';
import { should } from 'chai';
import FetchRound from '../src/js/classes/FetchRound';
import constants from '../src/js/constants';
import { LinkIdentifier, Page } from '../src/js/wikiClasses';

describe('FetchRound class', () => {
  it('Stores information about each round of fetches from wikipedia', () => {
    const round = new FetchRound(1, constants.ROUND_STATUS_FETCHING);
    const link1 = new LinkIdentifier(2, 'example');
    const link2 = new LinkIdentifier(3, 'example2');

    const linkForPage = new LinkIdentifier(3, 'linkshere');
    const page1 = new Page(12, 'wikipedia', null, null, [linkForPage]);
    const page2 = new Page(13, 'wikipedia1', null, null, [linkForPage]);
    round.pagesToFetch = [link1, link2];
    round.pagesFetched = [page1, page2];
    should.exist(round);
    round.should.be.an.instanceOf(FetchRound);
    round.pagesToFetch.should.be.an('array');
    round.pagesFetched.should.be.an('array');
    const finished = round.hasFetchedAll();
    finished.should.equal(true);
    const allLinks = round.getAllFetchedLinks();
    allLinks.length.should.equal(2);

    const fetchedLinks = round.getFetchedLinks(0);
    fetchedLinks.length.should.equal(2);

    const randLinks = round.getRandomFetchedLinks(1);
    randLinks.length.should.equal(1);

    const roundCopy = FetchRound.copyAndUpdate(round, constants.ROUND_STATUS_NONE);
    roundCopy.should.be.an.instanceOf(FetchRound);
    roundCopy.status.should.equal(constants.ROUND_STATUS_NONE);
  });
  it('Creates multiple copies of itself', () => {
    const rounds = FetchRound.buildArrayOf(4);
    rounds.length.should.equal(4);
  });
});

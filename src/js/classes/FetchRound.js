import constants from '../constants';

class FetchRound {
  /* FetchRound is the holder for all of the wiki page data returned from
      a specific round of fetching.
    Multiple instances of FetchRound are held in the state.rounds var.
    this.round {Number} - the count of the round. Should coorespond to the array loc.
    this.status {String} - the fetching status. See constants.js for values.
    this.pagesToFetch {Array of WikiLinkIdentifier} - The pages for this round to fetch.
    this.pagesFetched {Array of WikiLinkIdentifier} - The set of pages that have been fetched.
  */
  constructor(round = 0, status = constants.ROUND_STATUS_NONE) {
    this.round = round;
    this.status = status;
    this.pagesToFetch = [];  // Filled with WikiLinkIdentifier objects
    this.pagesFetched = [];  // Filled with WikiPage objects
  }
  hasFetchedAll() {
    /* Tests to see if all pages that should be fetched have been. */
    if (this.pagesToFetch.length === this.pagesFetched.length) {
      return true;
    }
    return false;
  }
  getAllFetchedLinks() {
    /* Returns all 'linkshere' items for all this.pagesFetched */
    let links = [];
    this.pagesFetched.forEach(function parsePagesFetched(page) {
      links = links.concat(page.linkshere);
    });
    return links;
  }
  getRandomFetchedLinks(num = constants.WALK_WIDTH) {
    /* Selects a random set of (num) 'linkshere' items from all this.pagesFetched */
    /* Randomization code by gonchuki from http://stackoverflow.com/a/5143910 */
    const links = this.getAllFetchedLinks();
    if (links.length <= num) {
      return links;
    }
    const linksCopy = links.slice();
    const randLinks = [];
    for (let i = 0; i < num; i++) {
      const rnd = Math.floor(Math.random() * linksCopy.length);
      const link = linksCopy.splice(rnd, 1)[0];
      randLinks.push(link);
    }
    return randLinks;
  }
  getFetchedLinks(random = 0) {
    /* Returns a set of 'linkshere' items from all this.pagesFetched
     * @param random {number} number of random items to return.
     * @note If there are less than (random), will return all we have.
     */
    if (random > 0) {
      return this.getRandomFetchedLinks(random);
    }
    return this.getAllFetchedLinks();
  }
}

export default FetchRound;

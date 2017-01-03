import constants from '../constants';

/* FetchRound is the holder for all of the wiki pages returned from a fetch
   Rounds are held in the state.rounds var.
*/

class FetchRound {
  constructor(round = 0, status = constants.ROUND_STATUS_NONE) {
    this.round = round;
    this.status = status;
    this.pagesToFetch = [];  // Filled with IdentifierToFetch
    this.pagesFetched = [];  // Filled with WikiPage
  }
  hasFetchedAll() {
    if (this.pagesToFetch.length === this.pagesFetched.length) {
      return true;
    }
    return false;
  }
  getAllLinks() {
    let theLinks = [];
    this.pagesFetched.forEach(function parsePagesFetched(page) {
      theLinks = theLinks.concat(page.linkshere);
    });
    return theLinks;
  }
  getRandomLinks(num = constants.WALK_WIDTH) {
    /* Randomization code by gonchuki from http://stackoverflow.com/a/5143910 */
    const alllinks = this.getAllLinks();
    if (alllinks.length <= num) {
      return alllinks;
    }
    const linkscopy = JSON.parse(JSON.stringify(alllinks));
    const randLinks = [];
    for (let i = 0; i < num; i++) {
      const rnd = Math.floor(Math.random() * linkscopy.length);
      const link = linkscopy.splice(rnd, 1)[0];
      randLinks.push(link);
    }
    return randLinks;
  }
  getFetchedLinks(random = 0) {
    if (random > 0) {
      return this.getRandomLinks(random);
    }
    return this.getAllLinks();
  }
}

export default FetchRound;

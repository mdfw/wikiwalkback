class WikiPage {
  constructor(id = '-1', title = '', thumb = null, image = null, links = []) {
    this.pageId = id;       // pageid
    this.pageTitle = title; // title
    this.thumbnail = thumb; // thumbnail
    this.pageimage = image; // pageimage
    this.linkshere = links; // linkshere
  }
}

class WikiLinkIdentifier {
  constructor(id = '-1', title = '') {
    this.linkId = id;        // pageid
    this.linkTitle = title;  // title
  }
}

class WikiThumbnail {
  constructor(source = null, w = 0, h = 0) {
    this.sourceURL = source;  // thumbnail -> source
    this.width = w;           // thumbnail -> width
    this.height = h;          // thumbnail -> height
  }
}

module.exports.Page = WikiPage;
module.exports.Thumbnail = WikiThumbnail;
module.exports.LinkIdentifier = WikiLinkIdentifier;

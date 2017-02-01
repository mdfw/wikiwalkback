import React from 'react';
import { connect } from 'react-redux';
import { fetchFinalPageInfo } from '../actions/actions';

function createWikiMarkup(extract) {
  return { __html: extract };
}

class ResultFinalPageRow extends React.Component {
  componentDidMount() {
    if (this.props.finalPageLink.linkId) {
      this.props.dispatch(
        fetchFinalPageInfo(this.props.finalPageLink.linkId),
      );
    }
  }
  processClick(event) {
    event.preventDefault();
    this.props.linkClick(event.currentTarget.text);
  }

  render() {
    const pageInfo = this.props.finalPageInfo;
    let wikiTitle = null;
    let title = null;
    let thumb = null;
    let extract = null;
    let linkTo = null;
    let combined = null;
    if (pageInfo) {
      if (pageInfo.title) {
        title = <span style={{ fontWeight: 'strong', fontSize: '1.5em' }}>{pageInfo.title}</span>;
        wikiTitle = pageInfo.title;
      }
      if (pageInfo.thumbnail && pageInfo.thumbnail.source) {
        thumb = <img src={pageInfo.thumbnail.source} alt={wikiTitle} style={{ verticalAlign: 'middle', marginRight: '10px' }} />;
      }
      if (pageInfo.extract) {
        extract = (
          <div
            dangerouslySetInnerHTML={createWikiMarkup(pageInfo.extract)} // eslint-disable-line 
          />
        );
      }
      if (wikiTitle) {
        /* eslint-disable jsx-a11y/href-no-hash */
        /* eslint-disable react/jsx-no-bind */
        const onClick = this.processClick.bind(this);
        linkTo = <div>Read more on Wikipedia: <a style={{ textDecoration: 'none' }} onClick={e => onClick(e)} href="#">{wikiTitle}</a></div>;
        /* eslint-enable react/jsx-no-bind */
        /* eslint-enable jsx-a11y/href-no-hash */
      }
    }

    if (thumb || title || extract) {
      combined = (
        <div style={{ marginTop: '20px', padding: '15px', boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px' }}>
          <div style={{ marginTop: '15px' }}>
            {thumb}
            {title}
          </div>
          {extract}
          {linkTo}
        </div>
      );
    }
    return combined;
  }
}

ResultFinalPageRow.propTypes = {
  finalPageInfo: React.PropTypes.instanceOf(Object),
  finalPageLink: React.PropTypes.instanceOf(Object),
  dispatch: React.PropTypes.func.isRequired,
  linkClick: React.PropTypes.func.isRequired,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    finalPageInfo: state.finalPageInfo,
    finalPageLink: state.finalPageLink,
  };
};

const Container = connect(mapStateToProps)(ResultFinalPageRow);

export default Container;

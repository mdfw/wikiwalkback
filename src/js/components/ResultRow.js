import React from 'react';
import { TagCloud } from 'react-tagcloud';

/* const roundToTags = ()
const data = [
  { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
  { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 },
  { value: "Webpack", count: 22 }, { value: "Babel.js", count: 7 },
  { value: "ECMAScript", count: 25 }, { value: "Jest", count: 15 },
  { value: "Mocha", count: 17 }, { value: "React Native", count: 27 },
  { value: "Angular.js", count: 30 }, { value: "TypeScript", count: 15 },
  { value: "Flow", count: 30 }, { value: "NPM", count: 11 },
];
*/
const customRenderer = (tag, size, color) => (
  <span 
    key={tag.key}
    style={{
      animation: 'blinker 3s linear infinite',
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${size}em`,
      border: `2px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: 'black',
    }}
  >{tag.value}</span>
);

class WordCloudContainer extends React.Component {
  onClick(e) {
    e.preventDefault();
  }
  createTags() {
    const tags = [];
    const roundData = this.props.roundData;
    const selectedLinks = this.props.toFetch;
    console.log('selectedLinks for round ' + roundData.round + ': ' + JSON.stringify(selectedLinks));
    let keyindex = 1;
    roundData.getFetchedLinks(0).forEach(function toTag(link) {
      const found = selectedLinks.findIndex(function findlink(selectedLink) {
        return selectedLink.linkId === link.linkId || selectedLink.linkTitle === link.linkTitle;
      });
      const selectedBoost = found > -1 ? 50 : 10;
      console.log('index of this item: ' + link.linkTitle + ': ' + found + ': boosted: ' + selectedBoost);
      const key = roundData.round + '-' + keyindex + '-' + link.linkTitle;
      keyindex = keyindex + 1;
      tags.push({
        value: link.linkTitle,
        count: selectedBoost,
        key: key,
      });
    });
    return tags;
  }
  render() {
    const tags = this.createTags();
    console.log('wordCloudContainer: round: ' + this.props.roundData.round + ' tagCount: ' + tags.length);
    console.dir(tags);
    return (
      <div className="aWordCloudContained">
        <h2> Round {this.props.roundData.round} </h2>
        <TagCloud
          tags={tags}
          minSize={1}
          maxSize={2}
          renderer={customRenderer}
        />
      </div>
    );
  }
}

WordCloudContainer.propTypes = {
  roundData: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
  toFetch: React.PropTypes.array,
};

export default WordCloudContainer;

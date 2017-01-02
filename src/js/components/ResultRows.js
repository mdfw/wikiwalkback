import React from 'react';
import { connect } from 'react-redux';
import WordCloudContainer from './WordCloudContainer';

class WordClouds extends React.Component {
  render() {
    const wordCloudContainers = [];
    const allRounds = this.props.rounds;
    allRounds.forEach(function needTags(round) {
      let nextRoundToFetch = [];
      const nextround = round.round + 1;
      if (nextround < allRounds.length) {
        nextRoundToFetch = allRounds[nextround].pagesToFetch;
      }
      if (round.pagesFetched.length > 0) {
        wordCloudContainers.push(
          <WordCloudContainer roundData={round} key={round.round} toFetch={nextRoundToFetch} />,
        );
      }
    });
    console.log('WordClouds built ' + wordCloudContainers.length + ' containers. Here it is: ');
    if (wordCloudContainers.length > 0) {
      console.dir(wordCloudContainers);
    }
    return (
      <div id="wordClouds">
        { wordCloudContainers }
      </div>
    );
  }
}

WordClouds.propTypes = {
  rounds: React.PropTypes.array,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    rounds: state.rounds,
  };
};


const Container = connect(mapStateToProps)(WordClouds);

export default Container;

import constants from '../constants';
import store from '../store';
import actions from '../actions/actions';
import Wiki from '../wikiClasses';

let previousState = null;

class Walking {
  constructor(rounds) {
    this.rounds = rounds;
  }
  nextAction() {
    const rLen = this.rounds.length;
    for (let i = 0; i < rLen; i++) {
      const round = this.rounds[i];
      console.log('Determining nextAction for round ' + round.round + '. Full object: ');
      console.dir(round);
      switch (round.status) {
        case constants.ROUND_STATUS_COMPLETE: {
          console.log('  Round ' + round.round + ' is complete - no work needed.');
          break;
        }
        case constants.ROUND_STATUS_FETCHING: {
          console.log('  Round ' + round.round + ' is fetching.');
          if (round.hasFetchedAll()) {
            console.log('    ...but is finished. Updating round to complete.');
            return actions.updateRound(round.round, constants.ROUND_STATUS_COMPLETE);
          }
          return null;
        }
        case constants.ROUND_STATUS_SETLINKS: {
          console.log('  Round ' + round.round + ' has set links. Starting fetch.');
          return actions.startFetch(round.round, round.pagesToFetch);
        }
        case constants.ROUND_STATUS_NONE: {
          console.log('  Round ' + round.round + ' has no status. We need to start it.');
          const previousRound = this.rounds[i - 1];
          if (!previousRound) {
            return actions.walkError('Round ' + round.round + ' could not find a previous round. This should not happen and is not user error.');
          }
          const links = previousRound.getFetchedLinks(constants.WALK_WIDTH);
          if (links.length === 0) {
            return actions.walkError('No links found to walk from round .' + previousRound.round);
          }
          if (links.length > constants.WALK_WIDTH) {
              return actions.walkError('Too many links returned from round ' + previousRound.round + '. Links: ' + JSON.stringify(links));
          }
          console.log('    ...with these links: ' + JSON.stringify(links));
          return actions.updateRound(round.round, constants.ROUND_STATUS_SETLINKS, links);
        }
        default: {
          break;
        }
      }
    }
    const lastLink = this.rounds[this.rounds.length - 1].getFetchedLinks(1);
    return actions.endWalk(lastLink);
  }
}

function handleChange() {
  const currentState = store.getState();
  if (!previousState) {
    previousState = currentState;
    return;
  }

  // start with the first search
  if (previousState.walkStatus !== currentState.walkStatus &&
      currentState.walkStatus === constants.WALK_STATUS_START) {
    console.log('::subscriber: trigger first search with store: ');
    console.dir(store);
    const linkFromInput = new Wiki.LinkIdentifier(null, currentState.currentInput);
    const pagesToFetch = [linkFromInput];
    store.dispatch(
      actions.updateWalkStatus(constants.WALK_STATUS_PREPARING),
    );
    store.dispatch(
      actions.updateRound(0, constants.ROUND_STATUS_SETLINKS, pagesToFetch),
    );
    store.dispatch(
      actions.updateWalkStatus(constants.WALK_STATUS_RUNNING),
    );
    return;
  }
  if (currentState.walkStatus === constants.WALK_STATUS_RUNNING) {
    const nextAction = new Walking(currentState.rounds).nextAction();
    if (nextAction) {
      store.dispatch(
        nextAction,
      );
    }
    return;
  }
  console.log('::subscriber: return without action');
}

store.subscribe(handleChange);

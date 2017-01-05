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
      switch (round.status) {
        case constants.ROUND_STATUS_COMPLETE: {
          break;
        }
        case constants.ROUND_STATUS_FETCHING: {
          if (round.hasFetchedAll()) {
            return actions.updateRound(round.round, constants.ROUND_STATUS_COMPLETE);
          }
          return null;
        }
        case constants.ROUND_STATUS_SETLINKS: {
          return actions.startFetch(round.round, round.pagesToFetch);
        }
        case constants.ROUND_STATUS_NONE: {
          const previousRound = this.rounds[i - 1];
          if (!previousRound) {
            return actions.walkError('Round ' + round.round + ' could not find a previous round. This should not happen and is not user error.');
          }
          const links = previousRound.getFetchedLinks(constants.WALK_WIDTH);
          if (links.length === 0) {
            let message = 'No links found to walk from round ' + previousRound.round + '.';
            if (previousRound.round === 0) {
              message += ' This is likely because your search did not return a page.';
            }
            return actions.walkError(message);
          }
          if (links.length > constants.WALK_WIDTH) {
            return actions.walkError('Too many links returned from round ' + previousRound.round + '.');
          }
          return actions.updateRound(round.round, constants.ROUND_STATUS_SETLINKS, links);
        }
        default: {
          break;
        }
      }
    }
    const lastLink = this.rounds[this.rounds.length - 1].getFetchedLinks(1)[0];
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
  }
}

store.subscribe(handleChange);

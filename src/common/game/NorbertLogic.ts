import { v4 } from 'uuid';
import { FallingFoodItem, GameState, INorbertLogic } from './GameTypes';
import ScoreProvider from './ScoreProvider';

const GENERATION_TIME_THERSHOLD = 2000;

export default function NorbertLogic(): INorbertLogic {
  const scoreProvider = ScoreProvider(6);
  const fallingItems: FallingFoodItem[] = [];

  let state: GameState = 'not-started';

  function start(): void {
    state = 'on-going';
  }

  let latestGenerationTime = 0;
  function checkAndGenerateItem(): void {
    if (Date.now() - latestGenerationTime > GENERATION_TIME_THERSHOLD) {
      let itemToDrop: FallingFoodItem | undefined;
      const random = Math.random();
      if (random < 0.33) {
        itemToDrop = { type: 'dairy', id: v4() };
      } else if (random < 0.66) {
        itemToDrop = { type: 'parve', id: v4() };
      } else {
        itemToDrop = { type: 'meat', id: v4() };
      }
      fallingItems.push(itemToDrop);
      latestGenerationTime = Date.now();
    }
  }

  function collectItem(itemId: string): void {
    const itemIdx = fallingItems.findIndex((i) => i.id === itemId);
    const item = fallingItems[itemIdx];
    if (!item) {
      return;
    }
    if (item.type === 'parve') {
      scoreProvider.successfullCatch();
    }
    if (item.type === 'meat') {
      scoreProvider.extenderCatch();
    }
    if (item.type === 'dairy') {
      if (scoreProvider.yetToCatch === 0) {
        state = 'completed';
      } else {
        state = 'failed';
      }
    }
    fallingItems.splice(itemIdx, 1);
  }

  return {
    get state() {
      return state;
    },
    start,
    get score() {
      return scoreProvider.yetToCatch;
    },
    get fallingItems() {
      checkAndGenerateItem();
      return fallingItems;
    },
    collectItem,
  };
}

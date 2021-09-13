import { Direction, IInputDevice } from '../InputTypes';

export default function KeyboardDevice(): IInputDevice {
  let hasSpaceClicked = false;
  let latestDirection: 'left' | 'right' = 'left';
  const keydownCallback = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === ' ') {
      hasSpaceClicked = true;
    }
    if (key === 'ArrowLeft') {
      latestDirection = 'left';
    }
    if (key === 'ArrowRight') {
      latestDirection = 'right';
    }
  };

  document.body.addEventListener('keydown', keydownCallback);

  function takeStartInput(): boolean {
    if (hasSpaceClicked) {
      hasSpaceClicked = false;
      return true;
    }
    return false;
  }

  function getDirection(): Direction {
    return [latestDirection, 0];
  }

  return {
    takeStartInput,
    getDirection,
  };
}

import { Point } from '../../types/Geometry';
import { Direction, IInputDevice } from '../InputTypes';

export default function TouchDevice(): IInputDevice {
  let waitingToAcceptTouch = false;
  let hasBeenTouched = false;
  let touchLocation: Point = { x: 0, y: 0 };
  document.body.addEventListener('touchstart', (e: TouchEvent) => {
    if (!hasBeenTouched && waitingToAcceptTouch) {
      hasBeenTouched = true;
    } else {
      touchLocation = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  document.body.addEventListener('touchmove', (e: TouchEvent) => {
    touchLocation = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });

  function acceptInputRecieved(): boolean {
    if (!waitingToAcceptTouch) {
      waitingToAcceptTouch = true;
      return false;
    }

    if (hasBeenTouched) {
      waitingToAcceptTouch = false;
      hasBeenTouched = false;
      return true;
    }
    return false;
  }

  function getDirection(): Direction {
    const direction =
      touchLocation.x > document.body.clientWidth / 2 ? 'right' : 'left';
    return [direction, 0];
  }

  return {
    takeStartInput: acceptInputRecieved,
    getDirection,
  };
}

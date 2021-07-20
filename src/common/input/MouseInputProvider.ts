import { Point, Rect } from '../types/Geometry';
import { IInputProvider } from './InputTypes';

export default function MouseInputProvider(
  canvas: HTMLCanvasElement,
): IInputProvider {
  let latestMousePosition: Point = { x: 0, y: 0 };
  canvas.addEventListener('mousemove', (e) => {
    latestMousePosition = { x: e.clientX, y: e.clientY };
  });

  function calcRelativeHorizontalPosition(
    rect: Rect,
  ): 'left' | 'right' | 'same' {
    if (rect.position.x > latestMousePosition.x) {
      return 'left';
    }
    if (rect.position.x + rect.size.width < latestMousePosition.x) {
      return 'right';
    }
    return 'same';
  }

  return {
    calcRelativeHorizontalPosition,
  };
}

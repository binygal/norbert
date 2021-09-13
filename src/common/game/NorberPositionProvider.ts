import { Size } from '../types/Geometry';
import { INorbertPositioning } from './GameTypes';

export default function NorbertPositionProvider(
  defaultViewport: Size,
): INorbertPositioning {
  let viewport = defaultViewport;
  return {
    get bottomCollision() {
      return {
        size: { width: viewport.width, height: 1 },
        position: { x: 0, y: viewport.height },
      };
    },
    get leftCollision() {
      return {
        size: { width: 1, height: viewport.height },
        position: { x: 0, y: 0 },
      };
    },
    get rightCollision() {
      return {
        size: { width: 1, height: viewport.height },
        position: { x: viewport.width, y: 0 },
      };
    },
    updateViewport(newViewport) {
      viewport = newViewport;
    },
    get currentViewport() {
      return viewport;
    },
  };
}

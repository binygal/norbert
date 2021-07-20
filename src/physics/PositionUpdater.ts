import { MoveableElement } from '../common/game/GameTypes';
import { Rect, Size } from '../common/types/Geometry';
import { IPhysicsCalculator, IPositionUpdater } from './PhysicsTypes';

export default function PositionUpdater(
  canvasSize: Size,
  physics: IPhysicsCalculator,
): IPositionUpdater {
  const leftCollisionObject: Rect = {
    size: { width: 1, height: canvasSize.height },
    position: { x: 0, y: 0 },
  };
  const rightCollisionObject: Rect = {
    size: { width: 1, height: canvasSize.height },
    position: { x: canvasSize.width, y: 0 },
  };
  function moveFromRightToLeft(element: MoveableElement): void {
    if (
      element.direction === 'right' &&
      physics.checkCollision(element.element, rightCollisionObject)
    ) {
      element.direction = 'left';
    }
    if (
      element.direction === 'left' &&
      physics.checkCollision(element.element, leftCollisionObject)
    ) {
      element.direction = 'right';
    }

    element.element.position.x += element.direction === 'right' ? 2 : -2;
  }
  return {
    moveHorziontally: moveFromRightToLeft,
  };
}

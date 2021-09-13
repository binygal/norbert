/* eslint-disable no-param-reassign */
import { INorbertPositioning, MoveableElement } from '../common/game/GameTypes';
import { IPhysicsCalculator, IPositionUpdater } from './PhysicsTypes';

export default function PositionUpdater(
  positionProvider: INorbertPositioning,
  physics: IPhysicsCalculator,
): IPositionUpdater {
  function moveFromRightToLeft(element: MoveableElement): void {
    if (
      element.direction === 'right' &&
      physics.checkCollision(element.element, positionProvider.rightCollision)
    ) {
      element.direction = 'left';
    }
    if (
      element.direction === 'left' &&
      physics.checkCollision(element.element, positionProvider.leftCollision)
    ) {
      element.direction = 'right';
    }

    element.element.position.x += element.direction === 'right' ? 2 : -2;
  }
  return {
    moveHorziontally: moveFromRightToLeft,
  };
}

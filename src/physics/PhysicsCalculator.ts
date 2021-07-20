import { Element } from '../common/game/GameTypes';
import { Rect } from '../common/types/Geometry';
import { IPhysicsCalculator } from './PhysicsTypes';

const config = {
  velocity: 1,
};

export default function PhysicsCalculator(): IPhysicsCalculator {
  function fall(element: Element): void {
    element.position.y += config.velocity;
  }

  function checkCollision(firstElement: Rect, secondElement: Rect): boolean {
    return (
      firstElement.position.x <
        secondElement.position.x + secondElement.size.width &&
      firstElement.position.x + firstElement.size.width >
        secondElement.position.x &&
      firstElement.position.y <
        secondElement.position.y + secondElement.size.height &&
      firstElement.position.y + firstElement.size.height >
        secondElement.position.y
    );
  }

  return {
    fall,
    checkCollision,
  };
}

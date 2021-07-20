import { Element, MoveableElement } from '../common/game/GameTypes';
import { Rect } from '../common/types/Geometry';

export interface IPhysicsCalculator {
  fall(element: Element): void;
  checkCollision(firstElement: Rect, secondElement: Rect): boolean;
}

export interface IPositionUpdater {
  moveHorziontally(element: MoveableElement): void;
}

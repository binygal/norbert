import {
  DropItemsType,
  DroppedElement,
  MoveableElement,
} from '../common/game/GameTypes';
import { Point } from '../common/types/Geometry';

export interface IElementGenerator {
  generatePlayer(position: Point): MoveableElement;
  generateDropingHands(position: Point): MoveableElement;
  generateDroppedItem(type: DropItemsType): DroppedElement;
}

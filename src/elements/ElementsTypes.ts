import {
  DropItemsType,
  DroppedElement,
  MoveableElement,
} from '../common/game/GameTypes';

export interface IElementGenerator {
  generatePlayer(): MoveableElement;
  generateDropingHands(): MoveableElement;
  generateDroppedItem(type: DropItemsType): DroppedElement;
}

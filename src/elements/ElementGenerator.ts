import {
  DropItemsType,
  DroppedElement,
  MoveableElement,
} from '../common/game/GameTypes';
import { Point, Size } from '../common/types/Geometry';
import { IElementGenerator } from './ElementsTypes';

type ElementTypes = 'player' | 'dropper' | DropItemsType;

type AvailableElements = Record<ElementTypes, string[]>;

function randomTake(array: string[]): string {
  const rand = Math.random();
  const index = Math.floor(rand * array.length);
  return array[index];
}

export default function ElementGenerator(
  availableElements: AvailableElements,
): IElementGenerator {
  function generatePlayer(position: Point): MoveableElement {
    return {
      direction: 'right',
      element: {
        image: randomTake(availableElements.player),
        position: { x: position.x, y: position.y },
        size: { width: 50, height: 50 },
        rotation: 0,
      },
    };
  }

  function generateDropingHands(position: Point): MoveableElement {
    return {
      direction: 'right',
      element: {
        image: randomTake(availableElements.dropper),
        size: { height: 50, width: 50 },
        position: { ...position },
        rotation: Math.PI,
      },
    };
  }

  function generateDroppedItem(type: DropItemsType): DroppedElement {
    return {
      type,
      element: {
        image: randomTake(availableElements[type]),
        size: { height: 50, width: 50 },
        position: { x: 0, y: 0 },
        rotation: 0,
      },
    };
  }

  return {
    generatePlayer,
    generateDropingHands,
    generateDroppedItem,
  };
}

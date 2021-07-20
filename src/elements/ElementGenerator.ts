import {
  DropItemsType,
  DroppedElement,
  Element,
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
  canvasSize: Size,
  availableElements: AvailableElements,
): IElementGenerator {
  function generatePlayer(): MoveableElement {
    return {
      direction: 'right',
      element: {
        image: randomTake(availableElements.player),
        position: { x: 0, y: canvasSize.height - 50 },
        size: { width: 50, height: 50 },
        rotation: 0,
      },
    };
  }

  function generateDropingHands(): MoveableElement {
    return {
      direction: 'right',
      element: {
        image: randomTake(availableElements.dropper),
        size: { height: 50, width: 50 },
        position: { x: 100, y: 0 },
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

import { Direction } from '../input/InputTypes';
import { Point, Size } from '../types/Geometry';

export type GameState =
  | 'not-started'
  | 'on-going'
  | 'failed'
  | 'failed-misses'
  | 'completed';

export type DropItemsType = 'dairy' | 'parve' | 'meat';

export type Element = {
  position: Point;
  size: Size;
  image: string;
  rotation: number;
};

export type MoveableElement = {
  direction: 'right' | 'left';
  element: Element;
};

export type DroppedElement = {
  type: DropItemsType;
  element: Element;
};

export type FallingFoodItem = {
  id: string;
  type: DropItemsType;
};

export interface IScoreProvider {
  yetToCatch: number;
  successfullCatch(): void;
  extenderCatch(): void;
}

export interface Rules {
  increaseCountTime(): void;
  shouldDropElement(): DropItemsType | undefined;
  catchItem(type: DropItemsType): boolean;
}

export interface INorbertLogic {
  state: GameState;
  start(): void;
  score: number;
  fallingItems: FallingFoodItem[];
  collectItem(itemId: string): void;
  missItem(itemId: string): void;
}

export interface INorbertVisualModel {
  renderableElements: Element[];
  updateInput(direction: Direction): void;
  updateSize(size: Size): void;
  newFrameUpdate(): void;
}

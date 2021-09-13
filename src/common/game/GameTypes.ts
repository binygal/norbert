import { Direction } from '../input/InputTypes';
import { Point, Rect, Size } from '../types/Geometry';

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
  reset(): void;
}

export interface INorbertPositioning {
  leftCollision: Rect;
  rightCollision: Rect;
  bottomCollision: Rect;
  currentViewport: Size;
  updateViewport(newViewport: Size): void;
}

export interface INorbertVisualModel {
  renderableElements: Element[];
  updateInput(direction: Direction): void;
  newFrameUpdate(staticFrame: boolean): void;
}

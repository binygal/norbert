import { Rect } from '../types/Geometry';

export type Direction = [direction: 'left' | 'right', delta: number];

export interface IInputProvider {
  calcRelativeHorizontalPosition(rect: Rect): 'left' | 'right' | 'same';
}

export interface IInputDevice {
  takeStartInput(): boolean;
  getDirection(): Direction;
}

export interface INorbertInput {
  takeStartInput(): boolean;
  getDirection(): Direction;
}

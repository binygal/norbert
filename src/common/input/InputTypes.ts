import { Rect } from '../types/Geometry';

export type Direction = [direction: 'left' | 'right', delta: number];

export interface IInputProvider {
  calcRelativeHorizontalPosition(rect: Rect): 'left' | 'right' | 'same';
}

export interface IInputDevice {
  acceptInputRecieved(): boolean;
  getDirection(): Direction;
}

export interface INorbertInput {
  didInputToStartReceived(): boolean;
  getDirection(): Direction;
}

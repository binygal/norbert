import detectMobileDevice from '../browser/detectMobileDevice';
import KeyboardDevice from './devices/KeyboardDevice';
import TouchDevice from './devices/TouchDevice';
import { Direction, IInputDevice, INorbertInput } from './InputTypes';

export default function NorbertInput(): INorbertInput {
  let inputDevice: IInputDevice;
  if (detectMobileDevice()) {
    inputDevice = TouchDevice();
  } else {
    inputDevice = KeyboardDevice();
  }
  function didInputToStartReceived(): boolean {
    return inputDevice.takeStartInput();
  }

  function getDirection(): Direction {
    return inputDevice.getDirection();
  }

  return {
    takeStartInput: didInputToStartReceived,
    getDirection,
  };
}

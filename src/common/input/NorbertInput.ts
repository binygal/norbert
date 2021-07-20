import KeyboardDevice from './devices/KeyboardDevice';
import { Direction, INorbertInput } from './InputTypes';

export default function NorbertInput(): INorbertInput {
  const inputDevice = KeyboardDevice();
  function didInputToStartReceived(): boolean {
    return inputDevice.acceptInputRecieved();
  }

  function getDirection(): Direction {
    return inputDevice.getDirection();
  }

  return {
    didInputToStartReceived,
    getDirection,
  };
}

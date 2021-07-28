import boy from 'bundle-text:../assets/boy.svg';
import coffee from 'bundle-text:../assets/coffee.svg';
import meat from 'bundle-text:../assets/meat.svg';
import pizza from 'bundle-text:../assets/pizza.svg';
import salad from 'bundle-text:../assets/salad.svg';
import steak from 'bundle-text:../assets/steak.svg';
import fries from 'bundle-text:../assets/fries.svg';
import hands from 'bundle-text:../assets/hands.svg';
import { ILoader } from './LoaderType';
import { VisualElement } from '../common/visualElements/VisualElementTypes';
import { Size } from '../common/types/Geometry';

export default function Loader(): ILoader {
  async function loadVisualElements(): Promise<Record<string, VisualElement>> {
    return {
      boy: {
        name: 'boy',
        data: new Blob([boy], { type: 'image/svg+xml;charset=utf-8' }),
      },
      coffee: {
        name: 'coffee',
        data: new Blob([coffee], { type: 'image/svg+xml;charset=utf-8' }),
      },
      meat: {
        name: 'meat',
        data: new Blob([meat], { type: 'image/svg+xml;charset=utf-8' }),
      },
      pizza: {
        name: 'pizza',
        data: new Blob([pizza], { type: 'image/svg+xml;charset=utf-8' }),
      },
      salad: {
        name: 'salad',
        data: new Blob([salad], { type: 'image/svg+xml;charset=utf-8' }),
      },
      steak: {
        name: 'steak',
        data: new Blob([steak], { type: 'image/svg+xml;charset=utf-8' }),
      },
      fries: {
        name: 'fries',
        data: new Blob([fries], { type: 'image/svg+xml;charset=utf-8' }),
      },
      hands: {
        name: 'hands',
        data: new Blob([hands], { type: 'image/svg+xml;charset=utf-8' }),
      },
    };
  }

  function createCanvas(size: Size): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    return canvas;
  }

  return {
    loadVisualElements,
    createCanvas,
  };
}

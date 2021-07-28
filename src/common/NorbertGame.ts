import Loader from '../loader/Loader';
import { INorbertGame } from './NorbertGameTypes';
import { INorbertVisualModel } from './game/GameTypes';
import NorbertLogic from './game/NorbertLogic';
import NorbertInput from './input/NorbertInput';
import NorbertVisualModel from './game/NorbertVisualModel';
import NorbertRenderer from './render/NorbertRenderer';
import { INorbertRenderer } from './render/RenderTypes';
import renderCanvasOverlay from '../ui/renderCanvasOverlay';

export default function NorbertGame(selector: string): INorbertGame {
  const parent = document.querySelector<HTMLElement>(selector);

  let canvas: HTMLCanvasElement;

  const norbertLogic = NorbertLogic();
  const input = NorbertInput();
  let visualModel: INorbertVisualModel;
  let renderer: INorbertRenderer;

  const canvasSize = { width: parent.clientWidth, height: parent.clientHeight };

  async function load(): Promise<void> {
    const loader = Loader();
    const visualBlobs = await loader.loadVisualElements();
    const loadImagesAsync = Object.entries(visualBlobs).map(([key, value]) => {
      const image = document.createElement('img');
      return new Promise<[name: string, element: HTMLImageElement]>(
        (resolve) => {
          image.onload = () => {
            resolve([key, image]);
          };
          image.src = URL.createObjectURL(value.data);
        },
      );
    });
    const loadedImages = await Promise.all(loadImagesAsync);
    const visualElements = loadedImages.reduce(
      (accu, [name, element]) => ({ ...accu, [name]: element }),
      {} as Record<string, HTMLImageElement>,
    );
    canvas = loader.createCanvas({
      width: parent.clientWidth,
      height: parent.clientHeight,
    });
    parent.appendChild(canvas);
    renderCanvasOverlay(canvas);
    visualModel = NorbertVisualModel(norbertLogic, canvasSize);
    renderer = NorbertRenderer(
      norbertLogic,
      visualModel,
      canvas,
      visualElements,
    );
  }

  function processUserInput(): void {
    if (
      norbertLogic.state === 'not-started' &&
      input.didInputToStartReceived()
    ) {
      norbertLogic.start();
    }

    if (norbertLogic.state === 'on-going') {
      const direction = input.getDirection();
      visualModel.updateInput(direction);
    }
  }

  function updateGameState(): void {
    if (norbertLogic.state === 'on-going') {
      visualModel.newFrameUpdate();
    }
  }

  function render(): void {
    renderer.renderFrame();
  }

  async function start(): Promise<void> {
    await load();

    const gameLoopCallback = () => {
      processUserInput();
      updateGameState();
      render();
      requestAnimationFrame(gameLoopCallback);
    };

    gameLoopCallback();
  }

  return {
    start,
  };
}

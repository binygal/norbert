/* eslint-disable no-param-reassign */

import { INorbertGame } from './NorbertGameTypes';
import { INorbertVisualModel } from './game/GameTypes';
import NorbertLogic from './game/NorbertLogic';
import NorbertInput from './input/NorbertInput';
import NorbertVisualModel from './game/NorbertVisualModel';
import NorbertRenderer from './render/NorbertRenderer';
import { INorbertRenderer } from './render/RenderTypes';
import renderCanvasOverlay from '../ui/renderCanvasOverlay';
import AssetsHolder from './visualElements/AssetsHolder';
import NorbertPositionProvider from './game/NorberPositionProvider';

export default function NorbertGame(selector: string): INorbertGame {
  const parent = document.querySelector<HTMLElement>(selector);
  let canvas: HTMLCanvasElement;

  async function start(): Promise<void> {
    let isRunning = true;

    function stop() {
      isRunning = false;
    }

    const norbertLogic = NorbertLogic();
    const input = NorbertInput();
    const assetsLoader = AssetsHolder();

    let visualModel: INorbertVisualModel;
    let renderer: INorbertRenderer;
    let isDirtyFrame = false;

    const positionProvider = NorbertPositionProvider({ height: 0, width: 0 });
    function resizeCanvas(canvasToResize: HTMLCanvasElement) {
      const canvasSize = {
        width: Math.min(window.screen.width, parent.clientWidth),
        height: Math.min(window.screen.height, parent.clientHeight),
      };

      canvasToResize.width = canvasSize.width;
      canvasToResize.height = canvasSize.height;
      positionProvider.updateViewport(canvasSize);
      isDirtyFrame = true;
    }

    async function load(): Promise<void> {
      await assetsLoader.fillAssets();
      if (canvas) {
        canvas.remove();
      }
      canvas = document.createElement('canvas');

      parent.appendChild(canvas);
      resizeCanvas(canvas);

      renderCanvasOverlay(canvas);
      visualModel = NorbertVisualModel(norbertLogic, positionProvider);
      renderer = NorbertRenderer(
        norbertLogic,
        visualModel,
        canvas,
        assetsLoader.assets,
      );
    }

    function processUserInput(): void {
      if (norbertLogic.state === 'not-started' && input.takeStartInput()) {
        norbertLogic.start();
      }

      if (norbertLogic.state === 'on-going') {
        const direction = input.getDirection();
        visualModel.updateInput(direction);
      }

      if (
        norbertLogic.state !== 'not-started' &&
        norbertLogic.state !== 'on-going' &&
        input.takeStartInput()
      ) {
        stop();
        start();
      }
    }

    function updateGameState(): void {
      if (norbertLogic.state === 'on-going' || isDirtyFrame) {
        visualModel.newFrameUpdate(isDirtyFrame);
      }
    }

    function render(): void {
      renderer.renderFrame();
      isDirtyFrame = false;
    }

    function registerCanvasSizeChange() {
      const resizeObserver = new ResizeObserver(() => {
        resizeCanvas(canvas);
      });
      resizeObserver.observe(parent);
    }

    await load();

    registerCanvasSizeChange();

    const gameLoopCallback = () => {
      processUserInput();
      updateGameState();
      render();
      if (isRunning) {
        requestAnimationFrame(gameLoopCallback);
      }
    };

    gameLoopCallback();
  }

  return {
    start,
  };
}

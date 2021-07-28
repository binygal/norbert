import detectMobileDevice from '../browser/detectMobileDevice';
import { INorbertLogic, INorbertVisualModel } from '../game/GameTypes';
import { center } from '../types/GeometryFunctions';
import {
  renderFailedOverlay,
  renderInsturctionsOverlay,
  renderSuccessfulOverlay,
  renderTooManyMisses,
} from './RenderOverlay';
import { INorbertRenderer } from './RenderTypes';

export default function NorbertRenderer(
  logic: INorbertLogic,
  visualModel: INorbertVisualModel,
  canvas: HTMLCanvasElement,
  visualElements: Record<string, HTMLImageElement>,
): INorbertRenderer {
  function renderFrame(): void {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#AED6F1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    visualModel.renderableElements.forEach((v) => {
      const elementCenter = center(v);
      ctx.translate(elementCenter.x, elementCenter.y);
      ctx.rotate(v.rotation);
      ctx.translate(-elementCenter.x, -elementCenter.y);
      ctx.drawImage(
        visualElements[v.image],
        v.position.x,
        v.position.y,
        v.size.width,
        v.size.height,
      );
      ctx.translate(elementCenter.x, elementCenter.y);
      ctx.rotate(-v.rotation);
      ctx.translate(-elementCenter.x, -elementCenter.y);
    });

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.fillText(`${logic.score}`, ctx.canvas.width - 50, 50);

    if (logic.state === 'not-started') {
      renderInsturctionsOverlay(ctx, detectMobileDevice());
    }

    if (logic.state === 'failed') {
      renderFailedOverlay(ctx);
    }

    if (logic.state === 'completed') {
      renderSuccessfulOverlay(ctx);
    }

    if (logic.state === 'failed-misses') {
      renderTooManyMisses(ctx);
    }
  }
  return {
    renderFrame,
  };
}

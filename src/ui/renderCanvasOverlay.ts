import { Size } from '../common/types/Geometry';

export default function renderCanvasOverlay(
  canvas: HTMLElement,
  changeSizeCallback: (size: Size) => void,
): void {
  const fullscreenButton = document.createElement('div');
  fullscreenButton.style.position = 'absolute';
  fullscreenButton.style.right = '10px';
  fullscreenButton.style.bottom = '10px';
  fullscreenButton.style.width = '20px';
  fullscreenButton.style.height = '10px';
  fullscreenButton.style.border = '2px solid white';
  fullscreenButton.addEventListener('click', async () => {
    await canvas.requestFullscreen();
    if (window.screen.orientation.lock) {
      try {
        await window.screen.orientation.lock('landscape-primary');
        changeSizeCallback({
          width: Math.min(window.screen.width, 800),
          height: Math.min(window.screen.height, 450),
        });
      } catch (e) {
        // This device is probably not a cellphone
      }
    }
  });

  if (canvas.parentElement) {
    canvas.parentElement.style.position = 'relative';
    canvas.parentElement.appendChild(fullscreenButton);
  }
}

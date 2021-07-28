export default function renderCanvasOverlay(canvas: HTMLElement): void {
  const fullscreenButton = document.createElement('div');
  fullscreenButton.style.position = 'absolute';
  fullscreenButton.style.right = '10px';
  fullscreenButton.style.bottom = '10px';
  fullscreenButton.style.width = '20px';
  fullscreenButton.style.height = '10px';
  fullscreenButton.style.border = '2px solid white';
  fullscreenButton.addEventListener('click', async () => {
    if (window.screen.orientation.lock) {
      try {
        await window.screen.orientation.lock('landscape');
      } catch {
        // This device is probably not a cellphone
      }
    }
    canvas.requestFullscreen();
  });

  if (canvas.parentElement) {
    canvas.parentElement.style.position = 'relative';
    canvas.parentElement.appendChild(fullscreenButton);
  }
}

export interface RenderableElement {
  render(canvas: HTMLCanvasElement): void;
}

export interface INorbertRenderer {
  renderFrame(): void;
}

export interface VisualElement {
  name: string;
  data: Blob;
}

export interface IAssetsHolder {
  fillAssets(): Promise<Record<string, HTMLImageElement>>;
  assets: Record<string, HTMLImageElement>;
}

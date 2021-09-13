import Loader from '../../loader/Loader';
import { IAssetsHolder } from './VisualElementTypes';

export default function AssetsHolder(): IAssetsHolder {
  let assets: Record<string, HTMLImageElement> = {};

  async function fillAssets(): Promise<Record<string, HTMLImageElement>> {
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
    assets = loadedImages.reduce(
      (accu, [name, element]) => ({ ...accu, [name]: element }),
      {} as Record<string, HTMLImageElement>,
    );
    return assets;
  }

  return {
    fillAssets,
    get assets() {
      return assets;
    },
  };
}

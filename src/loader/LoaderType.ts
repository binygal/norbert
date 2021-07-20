import { Size } from "../common/types/Geometry";
import { VisualElement } from "../common/visualElements/VisualElementTypes";

export interface ILoader {
  loadVisualElements(): Promise<Record<string, VisualElement>>;
  createCanvas(size: Size): HTMLCanvasElement
}
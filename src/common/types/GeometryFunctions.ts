import { Point, Size } from "./Geometry";

export function center(shape: {size: Size, position: Point}): Point {
  return {
    x: shape.position.x + (shape.size.width / 2),
    y: shape.position.y + (shape.size.height / 2)
  }
}
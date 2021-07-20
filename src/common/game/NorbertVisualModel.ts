import ElementGenerator from '../../elements/ElementGenerator';
import PhysicsCalculator from '../../physics/PhysicsCalculator';
import PositionUpdater from '../../physics/PositionUpdater';
import { Direction } from '../input/InputTypes';
import { Rect, Size } from '../types/Geometry';
import { Element, INorbertLogic, INorbertVisualModel } from './GameTypes';

export default function NorbertVisualModel(
  logic: INorbertLogic,
  canvasSize: Size,
): INorbertVisualModel {
  const elementGenerator = ElementGenerator(canvasSize, {
    player: ['boy'],
    dropper: ['hands'],
    dairy: ['pizza', 'coffee'],
    meat: ['steak', 'meat'],
    parve: ['salad', 'fries'],
  });

  const leftCollisionObject: Rect = {
    size: { width: 1, height: canvasSize.height },
    position: { x: 0, y: 0 },
  };
  const rightCollisionObject: Rect = {
    size: { width: 1, height: canvasSize.height },
    position: { x: canvasSize.width, y: 0 },
  };
  const bottomCollisionObject: Rect = {
    size: { width: canvasSize.width, height: 1 },
    position: { x: 0, y: canvasSize.height },
  };

  const physicsCalculator = PhysicsCalculator();
  const positionUpdater = PositionUpdater(canvasSize, physicsCalculator);

  const hands = elementGenerator.generateDropingHands();
  const player = elementGenerator.generatePlayer();
  const renderableElements = [hands.element, player.element];
  const fallingItemsMap = new Map<string, Element>();

  function updateInput(direction: Direction): void {
    player.element.position.x += direction[0] === 'right' ? 2 : -2;
    const collisionBorder =
      direction[0] === 'right' ? rightCollisionObject : leftCollisionObject;
    if (physicsCalculator.checkCollision(player.element, collisionBorder)) {
      player.element.position.x += direction[0] === 'right' ? -2 : 2;
    }
  }

  function newFrameUpdate(): void {
    positionUpdater.moveHorziontally(hands);
    const fallingItemsIds: Record<string, boolean> = {};
    logic.fallingItems.forEach((i) => {
      fallingItemsIds[i.id] = true;
      if (!fallingItemsMap.has(i.id)) {
        const droppedItem = elementGenerator.generateDroppedItem(i.type);
        droppedItem.element.position = { ...hands.element.position };
        fallingItemsMap.set(i.id, droppedItem.element);
      }
    });
    const fallingElements = Array.from(fallingItemsMap.entries());
    fallingElements.forEach(([id, e]) => {
      if (!fallingItemsIds[id]) {
        fallingItemsMap.delete(id);
      }
      physicsCalculator.fall(e);
      if (physicsCalculator.checkCollision(player.element, e)) {
        logic.collectItem(id);
      }
      if (physicsCalculator.checkCollision(e, bottomCollisionObject)) {
        logic.missItem(id);
      }
    });
  }

  return {
    get renderableElements() {
      return renderableElements.concat(Array.from(fallingItemsMap.values()));
    },
    updateInput,
    newFrameUpdate,
  };
}

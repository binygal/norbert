import ElementGenerator from '../../elements/ElementGenerator';
import PhysicsCalculator from '../../physics/PhysicsCalculator';
import PositionUpdater from '../../physics/PositionUpdater';
import { Direction } from '../input/InputTypes';
import {
  Element,
  INorbertLogic,
  INorbertPositioning,
  INorbertVisualModel,
} from './GameTypes';

export default function NorbertVisualModel(
  logic: INorbertLogic,
  positionProvider: INorbertPositioning,
): INorbertVisualModel {
  const elementGenerator = ElementGenerator({
    player: ['boy'],
    dropper: ['hands'],
    dairy: ['pizza', 'coffee'],
    meat: ['steak', 'meat'],
    parve: ['salad', 'fries'],
  });

  const physicsCalculator = PhysicsCalculator();
  const positionUpdater = PositionUpdater(positionProvider, physicsCalculator);

  const hands = elementGenerator.generateDropingHands({ x: 100, y: 0 });
  const player = elementGenerator.generatePlayer({
    x: 0,
    y: positionProvider.currentViewport.height - 50,
  });
  const renderableElements = [hands.element, player.element];
  const fallingItemsMap = new Map<string, Element>();

  function updateInput(direction: Direction): void {
    player.element.position.x += direction[0] === 'right' ? 2 : -2;
    const collisionBorder =
      direction[0] === 'right'
        ? positionProvider.rightCollision
        : positionProvider.leftCollision;
    if (physicsCalculator.checkCollision(player.element, collisionBorder)) {
      player.element.position.x += direction[0] === 'right' ? -2 : 2;
    }
  }

  function newFrameUpdate(staticFrame: boolean): void {
    player.element.position.y = positionProvider.currentViewport.height - 50;
    if (staticFrame) {
      return;
    }
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
      if (
        physicsCalculator.checkCollision(e, positionProvider.bottomCollision)
      ) {
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

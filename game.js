import { PlayerActions } from './actions.js';
import { Position } from './kinematics.js';
import { Ship } from './ship.js';

/**
 * @typedef {{position: Position}} Entity
 */

export class Game {
  worldWidth = 100;
  worldHeight = 100;
  ship = new Ship();
  actions = new PlayerActions();
  playerStrafeSpeed = 1;
  playerRotateSpeed = 5;
  playerThrust = .05;

  /**
   *
   */
  constructor() {
    this.ship.x = 50;
    this.ship.y = 50;
  }

  /**
   * @param {Entity} entity
   */
  wrapToroidal(entity) {
    if (entity.position.x > this.worldWidth) {
      entity.position.x = 0;
      entity.position.y = this.worldHeight - entity.position.y;
    } else if (entity.position.x < 0) {
      entity.position.x = this.worldWidth;
      entity.position.y = this.worldHeight - entity.position.y;
    }
    if (entity.position.y > this.worldHeight) {
      entity.position.y = 0;
      entity.position.x = this.worldWidth - entity.position.x;
    } else if (entity.position.y < 0) {
      entity.position.y = this.worldHeight;
      entity.position.x = this.worldWidth - entity.position.x;
    }
  }

  /**
   *
   */
  update() {
    if (this.actions.moveForward) {
      this.ship.thrust(this.playerThrust);
    } else {
      this.ship.thrust(0);
    }

    // if (this.actions.moveForward) {
    //   this.ship.moveForward(this.playerStrafeSpeed);
    // } else if (this.actions.moveBackward) {
    //   this.ship.moveForward(-this.playerStrafeSpeed);
    // }

    // if (this.actions.strafeLeft) {
    //   this.ship.strafeRight(-this.playerStrafeSpeed);
    // } else if (this.actions.strafeRight) {
    //   this.ship.strafeRight(this.playerStrafeSpeed);
    // }

    if (this.actions.rotateCCW) {
      this.ship.rotateCCW(this.playerRotateSpeed);
    } else if (this.actions.rotateCW) {
      this.ship.rotateCCW(-this.playerRotateSpeed);
    }

    this.ship.update();
    this.wrapToroidal(this.ship);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.clearRect(0, 0, this.worldWidth, this.worldHeight);
    this.ship.draw(ctx);
  }
}

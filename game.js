import { PlayerActions } from './actions.js';
import { BoundingBox } from './boundingbox.js';
import { Position } from './kinematics.js';
import { Ship } from './ship.js';

/**
 * @typedef {{position: Position}} Entity
 */

export class Game {
  ship = new Ship();
  actions = new PlayerActions();
  playerStrafeSpeed = 1;
  playerRotateSpeed = 5;
  playerThrust = .05;
  bounds = new BoundingBox(-50, -50, 50, 50);

  /**
   *
   */
  constructor() {
    this.ship.position.x = 0;
    this.ship.position.y = 0;
  }

  /**
   * @param {Entity} entity
   */
  wrap(entity) {
    if (entity.position.x > this.bounds.right) {
      entity.position.x = this.bounds.left;
    } else if (entity.position.x < this.bounds.left) {
      entity.position.x = this.bounds.right;
    }
    if (entity.position.y > this.bounds.top) {
      entity.position.y = this.bounds.bottom;
    } else if (entity.position.y < this.bounds.bottom) {
      entity.position.y = this.bounds.top;
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
    this.wrap(this.ship);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const {left, bottom, right, top, width, height} = this.bounds;
    ctx.clearRect(left, bottom, width, height);
    this.ship.draw(ctx);
  }
}

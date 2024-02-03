import { KeyDebounced, KeyPressed, PlayerActions } from './actions.js';
import { BoundingBox } from './boundingbox.js';
import { Bullet } from './bullet.js';
import { Position } from './kinematics.js';
import { DEG_TO_RAD } from './math.js';
import { Renderer } from './render.js'
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
  renderer;
  /**
   * @type {Bullet[]}
   */
  bullets = [];

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ship.position.x = 0;
    this.ship.position.y = 0;
    this.renderer = new Renderer(ctx, this.bounds);
    this.renderer.addEntity(this.ship);
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
    if (this.actions.thrust === KeyPressed) {
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

    if (this.actions.rotateCCW === KeyPressed) {
      this.ship.rotateCCW(this.playerRotateSpeed);
    } else if (this.actions.rotateCW === KeyPressed) {
      this.ship.rotateCCW(-this.playerRotateSpeed);
    }

    for (let b = 0; b < this.bullets.length; ++b) {
      const bullet = this.bullets[b];
      if (!bullet.isAlive) {
        this.bullets.splice(b, 1);
        --b;
        continue;
      }
      bullet.update();
      this.wrap(bullet);
    }

    if (this.actions.fire === KeyPressed) {
      this.actions.fire = KeyDebounced;
      const position = this.ship.position.clone();
      const angle = this.ship.angle;
      const cosA = Math.cos(angle * DEG_TO_RAD);
      const sinA = Math.sin(angle * DEG_TO_RAD);
      const posOffset = 2;
      position.addScalars(posOffset * cosA, posOffset * sinA);
      const velocity = this.ship.velocity.clone();
      const firepower = 1;
      velocity.addScalars(firepower * cosA, firepower * sinA);
      const bullet = new Bullet(position, velocity);
      this.bullets.push(bullet);
      this.renderer.addEntity(bullet);
    }

    this.ship.update();
    this.wrap(this.ship);

    this.renderer.render();
  }
}

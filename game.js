import { KeyDebounced, KeyPressed, PlayerActions } from './actions.js';
import { BoundingBox } from './boundingbox.js';
import { Bullet } from './bullet.js';
import { Entity } from "./entity.js";
import { Renderer } from './render.js'
import { Ship } from './ship.js';

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
    this.ship.maxSpeed = 1;
    this.renderer = new Renderer(ctx, this.bounds);
    this.renderer.addEntity(this.ship);
  }

  /**
   * @param {Entity} entity
   */
  wrapAroundBoundary(entity) {
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
      this.wrapAroundBoundary(bullet);
    }

    if (this.actions.fire === KeyPressed) {
      this.actions.fire = KeyDebounced;
      const bullet = this.ship.fireBullet();
      this.wrapAroundBoundary(bullet);
      this.bullets.push(bullet);
      this.renderer.addEntity(bullet);
    }

    this.ship.update();
    this.wrapAroundBoundary(this.ship);

    this.renderer.render();
  }
}

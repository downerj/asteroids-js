import { Asteroid } from "./asteroid.js";
import { BoundingBox } from "./boundingbox.js";
import { Bullet } from "./bullet.js";
import { Entity } from "./entity.js";
import { DEG_TO_RAD } from "./math.js";
import { Ship } from "./ship.js";

export class Renderer {
  /**
   * @type {Entity[]}
   */
  #entities = [];
  #ctx;
  #bounds;

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {BoundingBox} bounds
   */
  constructor(ctx, bounds) {
    this.#ctx = ctx;
    this.#bounds = bounds;
  }

  /**
   * @param {Entity} entity
   */
  addEntity(entity) {
    this.#entities.push(entity);
  }

  /**
   *
   */
  render() {
    const ctx = this.#ctx;
    const {left, bottom, width, height} = this.#bounds;
    ctx.clearRect(left, bottom, width, height);
    for (let e = 0; e < this.#entities.length; ++e) {
      const entity = this.#entities[e];
      if (!entity.isAlive) {
        this.#entities.splice(e, 1);
        --e;
        continue;
      }
      const oldTransform = ctx.getTransform();
      ctx.translate(entity.position.x, entity.position.y);
      ctx.rotate(entity.angle * DEG_TO_RAD);
      if (entity instanceof Ship) {
        this.#drawShip();
      } else if (entity instanceof Bullet) {
        this.#drawBullet();
      } else if (entity instanceof Asteroid) {
        this.#drawAsteroid();
      }
      ctx.setTransform(oldTransform);
    }
  }

  /**
   *
   */
  #drawShip() {
    const ctx = this.#ctx;
    ctx.beginPath();
    {
      ctx.moveTo(-1, 1);
      ctx.lineTo(1, 0);
      ctx.lineTo(-1, -1);
      ctx.lineTo(-.5, 0);
      ctx.closePath();
    }
    ctx.strokeStyle = 'red';
    ctx.lineWidth = .25;
    ctx.stroke();
  }

  /**
   *
   */
  #drawBullet() {
    const ctx = this.#ctx;
    ctx.beginPath();
    {
      ctx.arc(0, 0, .5, 0, Math.PI * 2);
    }
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = .25;
    ctx.stroke();
  }

  /**
   *
   */
  #drawAsteroid() {
    const ctx = this.#ctx;
    ctx.beginPath();
    {
      ctx.moveTo(5, 0);
      ctx.lineTo(.5, -2.5);
      ctx.lineTo(0, -5);
      ctx.lineTo(-2, -2.5);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-2, 2);
      ctx.lineTo(0, 5);
      ctx.lineTo(5, 2.5);
      ctx.closePath();
    }
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = .25;
    ctx.stroke();
  }
}

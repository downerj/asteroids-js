import { KeyDebounced, KeyPressed, PlayerActions } from './actions.js';
import { Asteroid } from './asteroid.js';
import { BoundingBox } from './boundingbox.js';
import { Bullet } from './bullet.js';
import { Entity } from "./entity.js";
import { randomInteger } from './math.js';
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
   * @type {Asteroid[]}
   */
  asteroids = [];
  static #MaxTimeToRespawn = 100;
  timeToRespawn = -1;

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.#initializeShip();
    this.renderer = new Renderer(ctx, this.bounds);
    this.renderer.addEntity(this.ship);
    for (let a = 0; a < 7; ++a) {
      const asteroid = this.spawnAsteroid();
      this.asteroids.push(asteroid);
      this.renderer.addEntity(asteroid);
    }
  }

  /**
   *
   */
  #initializeShip() {
    this.ship.maxSpeed = 1;
    this.ship.position.set(0, 0);
    this.ship.velocity.set(0, 0);
    this.ship.acceleration.set(0, 0);
    this.ship.angle = 90;
  }

  /**
   * @returns {Asteroid}
   */
  spawnAsteroid() {
    // Edge 1: Left
    // Edge 2: Bottom
    // Edge 3: Right
    // Edge 4: Top
    const edge = randomInteger(1, 4);
    const x = edge === 1 ? this.bounds.left
      : edge === 3 ? this.bounds.right
      : randomInteger(this.bounds.left, this.bounds.right);
    const y = edge === 2 ? this.bounds.bottom
      : edge === 4 ? this.bounds.top
      : randomInteger(this.bounds.bottom, this.bounds.top);
    const dxDir = randomInteger(0, 1);
    const dyDir = randomInteger(0, 1);
    const dx = (dxDir ? 1 : -1) * randomInteger(1, 2) / 10;
    const dy = (dyDir ? 1 : -1) * randomInteger(1, 2) / 10;
    const da = randomInteger(-5, 5);
    const asteroid = new Asteroid();
    asteroid.position.set(x, y);
    asteroid.velocity.set(dx, dy);
    asteroid.angularSpeed = da;
    return asteroid;
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
    if (this.timeToRespawn > 0) {
      --this.timeToRespawn;
    } else if (this.timeToRespawn === 0) {
      this.ship.respawn();
      this.#initializeShip();
      this.renderer.addEntity(this.ship);
      --this.timeToRespawn;
    }

    if (this.actions.thrust === KeyPressed) {
      this.ship.thrust(this.playerThrust);
    } else {
      this.ship.thrust(0);
    }

    this.ship.update();
    this.wrapAroundBoundary(this.ship);

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

    for (let a = 0; a < this.asteroids.length; ++a) {
      const asteroid = this.asteroids[a];
      if (!asteroid.isAlive) {
        this.asteroids.splice(a, 1);
        --a;
        continue;
      }
      asteroid.update();
      this.wrapAroundBoundary(asteroid);

      if (this.ship.isAlive && this.ship.detectCollision(asteroid)) {
        console.log('Collision with asteroid!');
        this.ship.destroy();
        this.timeToRespawn = Game.#MaxTimeToRespawn;
      }

      for (let b = 0; b < this.bullets.length; ++b) {
        const bullet = this.bullets[b];
        if (bullet.isAlive && bullet.detectCollision(asteroid)) {
          asteroid.destroy();
          bullet.destroy();
          break;
        }
      }
    }

    this.renderer.render();
  }
}

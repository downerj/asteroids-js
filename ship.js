import { Bullet } from './bullet.js';
import { Entity } from './entity.js';
import { DEG_TO_RAD } from './math.js';

export class Ship extends Entity {
  angle = 90;
  #isAlive = true;

  /**
   *
   */
  constructor() {
    super();
    this.boundingBox.set(-1, -1, 1, 1);
  }

  /**
   * @returns {boolean}
   */
  get isAlive() {
    return this.#isAlive;
  }

  /**
   *
   */
  destroy() {
    this.#isAlive = false;
  }
  
  /**
   *
   */
  respawn() {
    this.#isAlive = true;
  }

  /**
   * @param {number} ddr
   */
  thrust(ddr) {
    const cosA = Math.cos(this.angle * DEG_TO_RAD);
    const sinA = Math.sin(this.angle * DEG_TO_RAD);
    this.acceleration.set(ddr * cosA, ddr * sinA);
  }

  /**
   * @param {number} da
   */
  rotateCCW(da) {
    this.angle += da;
  }

  /**
   * @returns {Bullet}
   */
  fireBullet() {
    const position = this.position.clone();
    const angle = this.angle;
    const cosA = Math.cos(angle * DEG_TO_RAD);
    const sinA = Math.sin(angle * DEG_TO_RAD);
    const posOffset = 2;
    position.addScalars(posOffset * cosA, posOffset * sinA);
    const velocity = this.velocity.clone();
    const firepower = 1;
    velocity.addScalars(firepower * cosA, firepower * sinA);
    const bullet = new Bullet();
    bullet.position = position;
    bullet.velocity = velocity;
    return bullet;
  }
}

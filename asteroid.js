import { Entity } from "./entity.js";

export class Asteroid extends Entity {
  angularSpeed = 20;
  angle = 0;
  #isAlive = true;

  constructor() {
    super();
    this.boundingBox.set(-5, -5, 5, 5);
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
  update() {
    super.update();
    this.angle += this.angularSpeed;
  }
}

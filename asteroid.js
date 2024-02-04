import { Entity } from "./entity.js";

export class Asteroid extends Entity {
  angularSpeed = 20;
  angle = 0;
  #isAlive = true;

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

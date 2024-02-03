import { Entity } from "./entity.js";
import { Position, Velocity } from "./kinematics.js";

export class Bullet extends Entity {
  static MaxLife = 100;
  #life = Bullet.MaxLife;

  /**
   * @returns {boolean}
   */
  get isAlive() {
    return this.#life > 0;
  }

  /**
   *
   */
  update() {
    super.update();
    if (this.isAlive) {
      --this.#life;
    }
  }
}

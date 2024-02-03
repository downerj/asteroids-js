import { Position, Velocity } from "./kinematics.js";

export class Bullet {
  #position;
  #velocity;
  static MaxLife = 100;
  #life = Bullet.MaxLife;

  /**
   * @param {Position} position
   * @param {Velocity} velocity
   */
  constructor(position, velocity) {
    this.#position = position;
    this.#velocity = velocity;
  }

  get position() {
    return this.#position;
  }

  set position([x, y]) {
    this.#position.x = x;
    this.#position.y = y;
  }

  get isAlive() {
    return this.#life > 0;
  }

  /**
   *
   */
  update() {
    if (this.isAlive) {
      this.#position.applyVelocity(this.#velocity);
      --this.#life;
    }
  }
}

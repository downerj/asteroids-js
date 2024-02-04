import { BoundingBox } from "./boundingbox.js";
import { Acceleration, Position, Velocity } from "./kinematics.js"

export class Entity {
  position = new Position();
  velocity = new Velocity();
  acceleration = new Acceleration();
  maxSpeed = Infinity;
  #boundingBoxRelative = new BoundingBox();
  #boundingBoxAbsolute = new BoundingBox();

  /**
   * @returns {boolean}
   */
  get isAlive() { /* abstract */ }

  /**
   * @returns {BoundingBox}
   */
  get boundingBox() {
    return this.#boundingBoxRelative;
  }

  /**
   * @param {BoundingBox} value
   */
  set boundingBox(value) {
    this.#boundingBoxRelative = value;
  }

  /**
   *
   */
  #updateAbsoluteBoundingBox() {
    const boxR = this.#boundingBoxRelative;
    const boxA = this.#boundingBoxAbsolute;
    const {x, y} = this.position;
    boxA.left = x + boxR.left;
    boxA.right = x + boxR.right;
    boxA.bottom = y + boxR.bottom;
    boxA.top = y + boxR.top;
  }

  /**
   *
   */
  update() {
    this.velocity.applyAcceleration(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.applyVelocity(this.velocity);
    this.#updateAbsoluteBoundingBox();
  }

  /**
   * @param {Entity} that
   * @returns {boolean}
   */
  detectCollision(that) {
    return this.#boundingBoxAbsolute.detectCollision(that.#boundingBoxAbsolute);
  }
}

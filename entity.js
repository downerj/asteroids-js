import { Acceleration, Position, Velocity } from "./kinematics.js"

export class Entity {
  position = new Position();
  velocity = new Velocity();
  acceleration = new Acceleration();
  maxSpeed = Infinity;

  /**
   * @returns {boolean}
   */
  get isAlive() { /* abstract */ }

  update() {
    this.velocity.applyAcceleration(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.applyVelocity(this.velocity);
  }
}

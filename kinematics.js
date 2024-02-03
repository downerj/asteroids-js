export class Position {
  x;
  y;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Velocity} velocity
   */
  applyVelocity(velocity) {
    this.x += velocity.dx;
    this.y += velocity.dy;
  }
}

export class Velocity {
  dx;
  dy;

  /**
   * @param {number} dx
   * @param {number} dy
   */
  constructor(dx = 0, dy = 0) {
    this.dx = dx;
    this.dy = dy;
  }

  /**
   * @param {Acceleration} acceleration
   */
  applyAcceleration(acceleration) {
    this.dx += acceleration.ddx;
    this.dy += acceleration.ddy;
  }

  /**
   * @param {number} amount
   */
  limit(amount) {
    const angle = Math.atan2(this.dy, this.dx);
    if (this.dx*this.dx + this.dy*this.dy > amount*amount) {
      const newDx = amount*Math.cos(angle);
      const newDy = amount*Math.sin(angle);
      this.dx = newDx;
      this.dy = newDy;
    }
  }
}

export class Acceleration {
  ddx;
  ddy;

  /**
   * @param {number} ddx
   * @param {number} ddy
   */
  constructor(ddx = 0, ddy = 0) {
    this.ddx = ddx;
    this.ddy = ddy;
  }
}

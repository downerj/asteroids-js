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
   * @param {number} x
   * @param {number} y
   */
  set(x, y) {
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

  /**
   * @param {number} x
   * @param {number} y
   */
  addScalars(x, y) {
    this.x += x;
    this.y += y;
  }

  /**
   * @param {Position} position
   */
  addVector(position) {
    this.x += position.x;
    this.y += position.y;
  }
  
  /**
   * @returns {Position}
   */
  clone() {
    return new Position(this.x, this.y);
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
   * @param {number} dx
   * @param {number} dy
   */
  set(dx, dy) {
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
   * @param {number} dx
   * @param {number} dy
   */
  addScalars(dx, dy) {
    this.dx += dx;
    this.dy += dy;
  }

  /**
   * @param {Velocity} velocity
   */
  addVector(velocity) {
    this.dx += velocity.dx;
    this.dy += velocity.dy;
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
  
  /**
   * @returns {Velocity}
   */
  clone() {
    return new Velocity(this.dx, this.dy);
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

  /**
   * @param {number} ddx
   * @param {number} ddy
   */
  set(ddx, ddy) {
    this.ddx = ddx;
    this.ddy = ddy;
  }

  /**
   * @param {number} ddx
   * @param {number} ddy
   */
  addScalars(ddx, ddy) {
    this.ddx += ddx;
    this.ddy += ddy;
  }

  /**
   * @param {Acceleration} acceleration
   */
  addVector(acceleration) {
    this.ddx += acceleration.ddx;
    this.ddy += acceleration.ddy;
  }

  /**
   * @returns {Acceleration}
   */
  clone() {
    return new Acceleration(this.ddx, this.ddy);
  }
}

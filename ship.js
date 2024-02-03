import { Position, Velocity, Acceleration } from './kinematics.js';

const DEG_TO_RAD = Math.PI / 180;

export class Ship {
  #position = new Position(50, 50);
  #velocity = new Velocity();
  #maxSpeed = 1;
  #acceleration = new Acceleration();
  angle = 90;

  get position() {
    return this.#position;
  }

  set position([x, y]) {
    this.#position.x = x;
    this.#position.y = y;
  }

  get velocity() {
    return this.#velocity;
  }

  /**
   * @param {number} ddr
   */
  thrust(ddr) {
    const cosA = Math.cos(this.angle * DEG_TO_RAD);
    const sinA = Math.sin(this.angle * DEG_TO_RAD);
    this.#acceleration.ddx = ddr * cosA;
    this.#acceleration.ddy = ddr * sinA;
  }

  /**
   * @param {number} dr
   */
  // moveForward(dr) {
  //   const rad = this.angle * DEG_TO_RAD;
  //   const cosA = Math.cos(rad);
  //   const sinA = Math.sin(rad);
  //   const dx = dr * cosA;
  //   const dy = dr * sinA;
  //   this.position.x += dx;
  //   this.position.y += dy;
  // }

  /**
   * @param {number} dr
   */
  // strafeRight(dr) {
  //   const rad = (this.angle - 90) * DEG_TO_RAD;
  //   const cosA = Math.cos(rad);
  //   const sinA = Math.sin(rad);
  //   const dx = dr * cosA;
  //   const dy = dr * sinA;
  //   this.position.x += dx;
  //   this.position.y += dy;
  // }

  /**
   * @param {number} da
   */
  rotateCCW(da) {
    this.angle += da;
  }

  /**
   *
   */
  update() {
    this.#velocity.applyAcceleration(this.#acceleration);
    this.#velocity.limit(this.#maxSpeed);
    this.#position.applyVelocity(this.#velocity);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = .25;
    const oldTransform = ctx.getTransform();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle * DEG_TO_RAD);
    ctx.beginPath();
    {
      ctx.moveTo(-1, 1);
      ctx.lineTo(1, 0);
      ctx.lineTo(-1, -1);
      ctx.lineTo(-.5, 0);
      ctx.closePath();
    }
    ctx.stroke();
    ctx.setTransform(oldTransform);
  }
}
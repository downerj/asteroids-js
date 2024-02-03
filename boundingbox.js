export class BoundingBox {
  left;
  right;
  top;
  bottom;

  /**
   * @param {number} left
   * @param {number} bottom
   * @param {number} right
   * @param {number} top
   */
  constructor(left = 0, bottom = 0, right = 0, top = 0) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  /**
   * @returns {number}
   */
  get width() {
    return this.right - this.left;
  }

  /**
   * @returns {number}
   */
  get height() {
    return this.top - this.bottom;
  }
}

export class BoundingBox {
  left;
  right;
  top;
  bottom;

  constructor(left = 0, bottom = 0, right = 0, top = 0) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  get width() {
    return this.right - this.left;
  }

  get height() {
    return this.top - this.bottom;
  }
}

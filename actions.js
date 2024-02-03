export class PlayerActions {
  moveForward = false;
  moveBackward = false;
  strafeLeft = false;
  strafeRight = false;
  rotateCCW = false;
  rotateCW = false;

  /**
   * @param {string} key
   */
  pressKey(key) {
    if (key == 'w') {
      this.moveForward = true;
    } else if (key == 's') {
      this.moveBackward = true;
    } else if (key == 'a') {
      this.strafeLeft = true;
    } else if (key == 'd') {
      this.strafeRight = true;
    } else if (key == 'q') {
      this.rotateCCW = true;
    } else if (key == 'e') {
      this.rotateCW = true;
    }
  }

  /**
   * @param {string} key
   */
  releaseKey(key) {
    if (key == 'w') {
      this.moveForward = false;
    } else if (key == 's') {
      this.moveBackward = false;
    } else if (key == 'a') {
      this.strafeLeft = false;
    } else if (key == 'd') {
      this.strafeRight = false;
    } else if (key == 'q') {
      this.rotateCCW = false;
    } else if (key == 'e') {
      this.rotateCW = false;
    }
  }
}

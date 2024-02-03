export const KeyReleased = Symbol('KeyReleased');
export const KeyPressed = Symbol('KeyPressed');
export const KeyDebounced = Symbol('KeyDebounced'); 

export class PlayerActions {
  thrust = KeyReleased;
  // moveForward = KeyReleased;
  // moveBackward = KeyReleased;
  // strafeLeft = KeyReleased;
  // strafeRight = KeyReleased;
  rotateCCW = KeyReleased;
  rotateCW = KeyReleased;
  fire = KeyReleased;

  /**
   * @param {string} key
   */
  pressKey(key) {
    // if (key == 'w') {
    //   this.moveForward = KeyPressed;
    // } else if (key == 's') {
    //   this.moveBackward = KeyPressed;
    // } else if (key == 'a') {
    //   this.strafeLeft = KeyPressed;
    // } else if (key == 'd') {
    //   this.strafeRight = KeyPressed;
    // }
    if (key == 'w') {
      this.thrust = KeyPressed;
    } else if (key == 'q') {
      this.rotateCCW = KeyPressed;
    } else if (key == 'e') {
      this.rotateCW = KeyPressed;
    } else if (key == ' ') {
      this.fire = (this.fire === KeyReleased) ? KeyPressed : KeyDebounced;
    }
  }

  /**
   * @param {string} key
   */
  releaseKey(key) {
    // if (key == 'w') {
    //   this.moveForward = KeyReleased;
    // } else if (key == 's') {
    //   this.moveBackward = KeyReleased;
    // } else if (key == 'a') {
    //   this.strafeLeft = KeyReleased;
    // } else if (key == 'd') {
    //   this.strafeRight = KeyReleased;
    // }
    if (key == 'w') {
      this.thrust = KeyReleased;
    } else if (key == 'q') {
      this.rotateCCW = KeyReleased;
    } else if (key == 'e') {
      this.rotateCW = KeyReleased;
    } else if (key == ' ') {
      this.fire = KeyReleased;
    }
  }
}

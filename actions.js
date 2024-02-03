export const KeyReleased = Symbol('KeyReleased');
export const KeyPressed = Symbol('KeyPressed');
export const KeyDebounced = Symbol('KeyDebounced'); 

export class PlayerActions {
  thrust = KeyReleased;
  rotateCCW = KeyReleased;
  rotateCW = KeyReleased;
  fire = KeyReleased;

  /**
   * @param {string} key
   */
  pressKey(key) {
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

import { Game } from './game.js';

/**
 * @param {() => void} callback
 * @param {number} interval
 */
const loopOnInterval = (callback, interval) => {
  let previous = 0;
  const onTick = (timestamp) => {
    if (timestamp - previous >= interval) {
      previous = timestamp;
      callback();
    }
    requestAnimationFrame(onTick);
  };
  requestAnimationFrame(onTick);
};

window.addEventListener('load', () => {
  /**
   * @type {HTMLCanvasElement}
   */
  const cvs = document.getElementById('cvs');
  /**
   * @type {CanvasRenderingContext2D}
   */
  const ctx = cvs.getContext('2d');
  const game = new Game();
  /**
   *
   */
  const resize = () => {
    cvs.width = cvs.parentElement.clientWidth;
    cvs.height = cvs.parentElement.clientHeight;
    const {left, bottom, right, top} = game.bounds;
    const worldWidth = right - left;
    const worldHeight = top - bottom;
    // x' = a*x + c*y + e
    // y' = b*x + d*y + f
    // [ a c e
    //   b d f
    //   0 0 1 ]
    const a = cvs.width/worldWidth;
    const b = 0;
    const c = 0;
    const d = -cvs.height/worldHeight;
    const e = -cvs.width * left / worldWidth;
    const f = cvs.height * right / worldHeight;
    ctx.transform(a, b, c, d, e, f);
  };
  resize();
  window.addEventListener('resize', () => {
    resize();
  });
  window.addEventListener('keydown', (event) => {
    game.actions.pressKey(event.key);
  });
  window.addEventListener('keyup', (event) => {
    game.actions.releaseKey(event.key);
  });
  loopOnInterval(() => {
    game.update();
    game.draw(ctx);
  }, 10);
});

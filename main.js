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
    ctx.transform(cvs.width/game.worldWidth, 0, 0, -cvs.height/game.worldHeight, 0, cvs.height);
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

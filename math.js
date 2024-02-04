export const DEG_TO_RAD = Math.PI / 180;

export const randomInteger = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

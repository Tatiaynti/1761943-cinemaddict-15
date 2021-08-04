const FILM_CARDS_COUNT = 18;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max, decimalPoints = 1) => {
  if (max > min && min >= 0) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    return randomNumber.toFixed(decimalPoints);
  }
  return undefined;
};

export {FILM_CARDS_COUNT, getRandomInteger, getRandomFloat};

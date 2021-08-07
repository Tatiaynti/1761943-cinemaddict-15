import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';

const generateText = () => {
  const texts = [
    'Super film!',
    'Cast is adorable',
    'Adore this film!',
    'It\'s a magic',
    'They killed my favorite actor',
    'total bullshit!!!',
    'Where\'s Emma Watson?',
    'netflix&chill',
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];
  const randomIndex = getRandomInteger(0, texts.length - 1);

  return texts[randomIndex];
};

const generateEmoji = () => {
  const emojis = [
    './images/emoji/angry.png',
    './images/emoji/puke.png',
    './images/emoji/sleeping.png',
    './images/emoji/smile.png',
  ];

  const randomIndex = getRandomInteger(0, emojis.length - 1);

  return emojis[randomIndex];
};

const generateAuthor = () => {
  const authors = [
    'Noname User',
    'Ilove Jhonny',
    'Black Jack',
    'Winston',
    'Mark Forever',
    'Princess Dumbledor',
    'Anonym Critics',
    'Kris Andersonne',
  ];
  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateCommentDate = () => {
  const day = dayjs().date((getRandomInteger(-1095, dayjs().date())));
  return dayjs(day).format('YYYY/MM/DD');
};

const generateComments = () => {
  const comments = [];
  const commentsNumber = getRandomInteger(1, 5);
  for (let i = 0; i < commentsNumber; i++) {
    comments.push({
      id: getRandomInteger(1, 10000),
      text: generateText(),
      emoji: generateEmoji(),
      author: generateAuthor(),
      date: generateCommentDate(),
    });
  }
  return comments;
};

export {generateComments};

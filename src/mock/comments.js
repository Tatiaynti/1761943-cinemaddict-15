// import dayjs from 'dayjs';
// import {nanoid} from 'nanoid';
// import {getRandomInteger} from '../utils/utils-for-mock.js';
// import {changeDateFormatForComments} from '../utils/utils-common.js';

// const generateText = () => {
//   const texts = [
//     'Super film!',
//     'Cast is adorable',
//     'Adore this film!',
//     'It\'s a magic',
//     'They killed my favorite actor',
//     'total bullshit!!!',
//     'Where\'s Emma Watson?',
//     'netflix&chill',
//     'Interesting setting and a good cast',
//     'Booooooooooring',
//     'Very very old. Meh',
//     'Almost two hours? Seriously?',
//   ];
//   const randomIndex = getRandomInteger(0, texts.length - 1);

//   return texts[randomIndex];
// };

// const generateEmoji = () => {
//   const emojis = [
//     'angry',
//     'puke',
//     'sleeping',
//     'smile',
//   ];

//   const randomIndex = getRandomInteger(0, emojis.length - 1);

//   return emojis[randomIndex];
// };

// const generateAuthor = () => {
//   const authors = [
//     'Noname User',
//     'Ilove Jhonny',
//     'Black Jack',
//     'Winston',
//     'Mark Forever',
//     'Princess Dumbledor',
//     'Anonym Critics',
//     'Kris Andersonne',
//   ];
//   const randomIndex = getRandomInteger(0, authors.length - 1);

//   return authors[randomIndex];
// };

// export const generateCommentDate = () => {
//   const day = dayjs().date((getRandomInteger(-1095, dayjs().date())));
//   return changeDateFormatForComments(dayjs(day));
// };

// const generateComments = () => {
//   const comments = [];
//   const commentsNumber = getRandomInteger(1, 5);
//   for (let i = 0; i < commentsNumber; i++) {
//     comments.push({
//       id: nanoid(),
//       text: generateText(),
//       emoji: generateEmoji(),
//       author: generateAuthor(),
//       date: generateCommentDate(),
//     });
//   }
//   return comments;
// };

// export {generateComments};

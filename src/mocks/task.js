import {getRandomArrayItem, getRandomDate} from "../utils";
import {COLORS, DAYS} from "../const";

const DESCRIPTION = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

const TAGS = [
  `homework`, `theory`, `practice`, `intensive`, `keks`
];

const generateTags = (tags) => {
  return tags
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generateRepeatingDays = () => Object.assign({}, REPEATING_DAYS, {
  [getRandomArrayItem(DAYS)]: Math.random() > 0.5,
});

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? getRandomDate() : null;

  return {
    description: getRandomArrayItem(DESCRIPTION),
    dueDate,
    repeatingDays: dueDate ? REPEATING_DAYS : generateRepeatingDays(),
    tags: new Set(generateTags(TAGS)),
    color: getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    inArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};

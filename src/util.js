const RANGE = {
  DAYS: 7,
  HOURS: 24,
  MINUTES: 60
};

const RENDER_POSITION = {
  BEFOREEND: `beforeend`
};

const targetDate = new Date();

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
}

const  formatTime = (date) => {
  const hours = this.castTimeFormat(date.getHours() % 12);
  const minutes = this.castTimeFormat(date.getMinutes());
  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
}

const getRandomArrayItem = (array) => {
  const randomIndex = this.getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
}

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
}

const getDiffTimeValue = (range) => {
  const sign = Math.random() > 0.5 ? 1 : -1;
  return sign * getRandomIntegerNumber(0, range);
}

const getRandomTime = (timeRange) => {
  return targetDate.getDate() + getDiffTimeValue(timeRange);
}

const getRandomDate = () => {
  const days = this.getRandomTime(RANGE.DAYS);
  const hours = this.getRandomTime(RANGE.HOURS);
  const minutes = this.getRandomTime(RANGE.MINUTES);

  targetDate.setDate(days);
  targetDate.setHours(hours);
  targetDate.setMinutes(minutes);

  return targetDate;
}

const createElement = (markup) => {
  const div = document.createElement(`div`);
  div.innerHTML = markup;

  const element = div.firstChild;
  return element;
}

const render = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
  }
}

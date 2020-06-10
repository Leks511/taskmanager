export default class Util {
  constructor() {
    this.RANGE = {
      DAYS: 7,
      HOURS: 24,
      MINUTES: 60
    };

    this.RENDER_POSITION = {
      BEFOREEND: `beforeend`
    };

    this.targetDate = new Date();
  }

  castTimeFormat(value) {
    return value < 10 ? `0${value}` : String(value);
  }

  formatTime(date) {
    const hours = this.castTimeFormat(date.getHours() % 12);
    const minutes = this.castTimeFormat(date.getMinutes());
    const interval = date.getHours() > 11 ? `pm` : `am`;

    return `${hours}:${minutes} ${interval}`;
  }

  getRandomArrayItem(array) {
    const randomIndex = this.getRandomIntegerNumber(0, array.length);

    return array[randomIndex];
  }

  getRandomIntegerNumber(min, max) {
    return min + Math.floor(max * Math.random());
  }

  getDiffTimeValue(range) {
    const sign = Math.random() > 0.5 ? 1 : -1;
    return sign * this.getRandomIntegerNumber(0, range);
  }

  getRandomTime(timeRange) {
    return this.targetDate.getDate() + this.getDiffTimeValue(timeRange);
  }

  getRandomDate() {
    const days = this.getRandomTime(this.RANGE.DAYS);
    const hours = this.getRandomTime(this.RANGE.HOURS);
    const minutes = this.getRandomTime(this.RANGE.MINUTES);

    this.targetDate.setDate(days);
    this.targetDate.setHours(hours);
    this.targetDate.setMinutes(minutes);

    return this.targetDate;
  }

  createElement(markup) {
    const div = document.createElement(`div`);
    div.innerHTML = markup;

    const element = div.firstChild;
    return element;
  }

  render(container, element, place) {
    switch (place) {
      case this.RENDER_POSITION.BEFOREEND:
        container.append(element);
        break;
    }
  }
}

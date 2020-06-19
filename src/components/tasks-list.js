import Util from "../util";
const util = new Util();

const createTasksListTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class TasksListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

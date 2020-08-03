import AbstractView from "./abstract.js";

const createTasksListTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class TasksListComponent extends AbstractView {
  getTemplate() {
    return createTasksListTemplate();
  }
}

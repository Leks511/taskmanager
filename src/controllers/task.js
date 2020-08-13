import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const replaceTaskToEdit = () => {
      replace(taskEditComponent, taskComponent);
    };
  
    const replaceEditToTask = () => {
      replace(taskComponent, taskEditComponent);
    };
  
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
  
      if (isEscKey) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  
    const taskComponent = new TaskComponent(task);
    const taskEditComponent = new TaskEditComponent(task);
  
    taskComponent.setEditButtonClickHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  
    taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  
    render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
  }
}
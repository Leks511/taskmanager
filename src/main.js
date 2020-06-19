import MenuComponent from "./components/menu";
import FiltersComponent from "./components/filters";
import BoardComponent from "./components/board";
import NoTasksComponent from "./components/no-tasks";
import SortComponent from "./components/sort";
import TasksListComponent from "./components/tasks-list";
import LoadMoreButtonComponent from "./components/load-more-button";

import TaskEditComponent from "./components/task-edit";
import TaskComponent from "./components/task";

import {generateTasks} from "./mocks/task";

import Util from "./util";
const util = new Util();

const TASKS_COUNT = 25;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASKS_COUNT);

const isNoTasks = !tasks.every((task) => task.inArchive);

const mainElement = document.querySelector(`main`);

const MenuComponentContainer = mainElement.querySelector(`.control`);
util.render(MenuComponentContainer, new MenuComponent().getElement(), util.RENDER_POSITION.BEFOREEND);

util.render(mainElement, new FiltersComponent(tasks).getElement(), util.RENDER_POSITION.BEFOREEND);
util.render(mainElement, new BoardComponent().getElement(), util.RENDER_POSITION.BEFOREEND);

const boardElement = mainElement.querySelector(`.board`);

// Если все элементы в архиве === Если хотя бы один не в архиве
if (isNoTasks) {
  // Функция рендеринга тасков
  const renderTask = (taskData) => {
    const taskCard = new TaskComponent(taskData).getElement();
    const taskEdit = new TaskEditComponent(taskData).getElement();

    const onEscKeydown = (evt) => {
      evt.preventDefault();
      if (evt.key === `Escape` || evt.key === `Esc`) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeydown);
      }
    };

    const replaceTaskToEdit = () => {
      tasksListElement.replaceChild(taskEdit, taskCard);

      document.addEventListener(`keydown`, onEscKeydown);
    };

    const replaceEditToTask = () => {
      tasksListElement.replaceChild(taskCard, taskEdit);
    };

    taskCard.querySelector(`.card__btn--edit`).addEventListener(`click`, replaceTaskToEdit);
    taskEdit.querySelector(`form`).addEventListener(`submit`, replaceEditToTask);

    util.render(tasksListElement, taskCard, util.RENDER_POSITION.BEFOREEND);
  };

  util.render(boardElement, new SortComponent().getElement(), util.RENDER_POSITION.BEFOREEND);
  util.render(boardElement, new TasksListComponent().getElement(), util.RENDER_POSITION.BEFOREEND);

  const tasksListElement = boardElement.querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => renderTask(task));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  util.render(boardElement, loadMoreButtonComponent.getElement(), util.RENDER_POSITION.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
} else {
  util.render(boardElement, new NoTasksComponent().getElement(), util.RENDER_POSITION.BEFOREEND);
}

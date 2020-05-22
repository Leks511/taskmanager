import {createMenuTemplate} from "./components/menu";
import {createFiltersTemplate} from "./components/filters";
import {createBoardTemplate} from "./components/board";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";

import {createTaskEditTemplate} from "./components/task-edit";
import {createTaskTemplate} from "./components/task";

import {generateFilters} from "./mocks/filter";
import {generateTasks} from "./mocks/task";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const TASKS_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const mainElement = document.querySelector(`main`);

const menuContainer = mainElement.querySelector(`.control`);

render(menuContainer, createMenuTemplate(), `beforeend`);

const filters = generateFilters();
render(mainElement, createFiltersTemplate(filters), `beforeend`);
render(mainElement, createBoardTemplate(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);

const tasksListElement = boardElement.querySelector(`.board__tasks`);

const tasks = generateTasks(TASKS_COUNT);
render(tasksListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(tasksListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButtonElement = boardElement.querySelector(`.load-more`);
loadMoreButtonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(tasksListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonElement.remove();
  }
});

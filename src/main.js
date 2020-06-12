import Menu from "./components/menu";
import Filters from "./components/filters";
import Board from "./components/board";
import LoadMoreButton from "./components/load-more-button";

import TaskEdit from "./components/task-edit";
import Task from "./components/task";

import {generateTasks} from "./mocks/task";

import Util from "./util";
const util = new Util();

const TASKS_COUNT = 50;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASKS_COUNT);

const mainElement = document.querySelector(`main`);

const menuContainer = mainElement.querySelector(`.control`);
util.render(menuContainer, new Menu().getElement(), util.RENDER_POSITION.BEFOREEND);

util.render(mainElement, new Filters(tasks).getElement(), `beforeend`);
util.render(mainElement, new Board().getElement(), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);

const tasksListElement = boardElement.querySelector(`.board__tasks`);

util.render(tasksListElement, new TaskEdit(tasks[0]).getElement(), util.RENDER_POSITION.BEFOREEND);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => util.render(tasksListElement, new Task(task).getElement(), util.RENDER_POSITION.BEFOREEND));

const loadMoreButton = new LoadMoreButton();
util.render(boardElement, loadMoreButton.getElement(), util.RENDER_POSITION.BEFOREEND);

loadMoreButton.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => util.render(tasksListElement, new Task(task).getElement(), util.RENDER_POSITION.BEFOREEND));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.getElement().remove();
    loadMoreButton.removeElement();
  }
});

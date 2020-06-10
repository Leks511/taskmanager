import Menu from "./components/menu";
// import {createFiltersTemplate} from "./components/filters";
// import {createBoardTemplate} from "./components/board";
// import {createLoadMoreButtonTemplate} from "./components/load-more-button";

// import {createTaskEditTemplate} from "./components/task-edit";
// import {createTaskTemplate} from "./components/task";

// import {generateTasks} from "./mocks/task";

import Util from "./util";
const util = new Util();

// const TASKS_COUNT = 50;
// const SHOWING_TASKS_COUNT_ON_START = 8;
// const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// const tasks = generateTasks(TASKS_COUNT);

const mainElement = document.querySelector(`main`);

const menuContainer = mainElement.querySelector(`.control`);
util.render(menuContainer, new Menu().getElement(), util.RENDER_POSITION.BEFOREEND);

// render(mainElement, createFiltersTemplate(tasks), `beforeend`);
// render(mainElement, createBoardTemplate(), `beforeend`);

// const boardElement = mainElement.querySelector(`.board`);

// const tasksListElement = boardElement.querySelector(`.board__tasks`);

// render(tasksListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

// let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
// tasks.slice(1, showingTasksCount).forEach((task) => render(tasksListElement, createTaskTemplate(task), `beforeend`));

// render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

// const loadMoreButtonElement = boardElement.querySelector(`.load-more`);
// loadMoreButtonElement.addEventListener(`click`, () => {
//   const prevTasksCount = showingTasksCount;
//   showingTasksCount = prevTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

//   tasks.slice(prevTasksCount, showingTasksCount)
//     .forEach((task) => render(tasksListElement, createTaskTemplate(task), `beforeend`));

//   if (showingTasksCount >= tasks.length) {
//     loadMoreButtonElement.remove();
//   }
// });

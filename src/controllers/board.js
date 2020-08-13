import LoadMoreButtonComponent from "../components/load-more-button.js";
import TasksComponent from "../components/tasks.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent, {SortType} from "../components/sort.js";
import TaskController from "../controllers/task.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// Функция сортировки тасков по определённому типу для последующего рендеринга
const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => renderTask(taskListElement, task));
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._noTasksComponent = new NoTasksComponent();
  }

  // Метод, рендерящий доску с тасками
  render(tasks) {

    // Функция, рендерящая кнопку подзагрузки на основе переданных тасков
    const renderLoadMoreButton = () => {
      // Если число тасков для показа больше или равно таскам, то не кнопка не рендерится
      if (showingTasksCount >= tasks.length) {
        return;
      }
      // Рендерим кнопку
      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      // Вешаем обработчик (handler) на кнопку
      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        // Берём таски на основании сортировки
        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
  
        // Рендерим их в таскЛист
        renderTasks(taskListElement, sortedTasks);
  
        // Если по итогу кол-во тасков для показа больше, чем общее кол-во или равно, то убираем кнопку
        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    }

    // Сразу получаем контейнер для рендеринга тасков и проверяем заархивированные
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    // Если все заархивированы, то рендерим NoTasks и завершаем метод
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    } // Иначе:

    // Если есть таски, то рендерим компонент сортировки и таскЛист
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    // Отрендерив, поместим элемент таскЛиста в константу
    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    // Вызовем функцию рендеринга тасков и кнопки
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    // Вызовем метод sortComponent для подписки на обработчик: повесим обработчик
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      // Поместим в константу отсортированные таски по значению. взятому из data-атрибута
      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      // Перед рендерингом тасков очистим таскЛист
      taskListElement.innerHTML = ``;

      // Вызовем функцию рендеринга тасков и кнопки
      renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
  }
}
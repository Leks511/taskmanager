import {getTasksByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class Tasks {
  constructor() {
    // Создаём массив под таски, который заполняется при методе setTasks и сразу зададим фильтр по умолчанию - ALL
    this._tasks = [];
    this._activeFilterType = FilterType.ALL;

    // Что это за обработчики?
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  // Метод для возвращения тасков по активному фильтру
  getTasks() {
    return getTasksByFilter(this._tasks, this._activeFilterType);
  }

  // Метод для возвращения всех тасков
  getTasksAll() {
    return this._tasks;
  }

  // Метод добавления задач в модель
  setTasks(tasks) {
    // Добавлям в массив тасков таски, переданные в метод
    this._tasks = Array.from(tasks);
    // и тут же вызываем обработчики (?), передав их массив в специальный метод callHandlers
    this._callHandlers(this._dataChangeHandlers);
  }

  // Метод, устанавливающий в модели активный фильтр и вызывающий обработчики (?)
  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  updateTask(id, task) {
    // Ищем индекс таска по ид, который обновить хотим
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    // Обновляем
    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));
    
    // Тут же вызывем обработчики
    this._callHandlers(this._dataChangeHandlers);
    
    return true;
  }

  // Этот метод добавляет обработчик в массив обработчиков
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  // Метод, вызывающий каждый обработчик из переданного массива обработчиков
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler())
  }
}

export default class Tasks {
  constructor() {
    this._tasks = [];

    // Что это за обработчики?
    this._dataChangeHandlers = [];
  }

  // Метод для возвращения тасков
  getTasks() {
    return this._tasks;
  }

  // Метод добавления задач в модель
  setTasks(tasks) {
    // Добавлям в массив тасков таски, переданные в метод
    this._tasks = Array.from(tasks);
    // и тут же вызываем обработчики (?), передав их массив в специальный метод callHandlers
    this._callHandlers(this._dataChangeHandlers);
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

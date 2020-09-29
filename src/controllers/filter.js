import FilterComponent from "../components/filter.js";

import {FilterType} from "../const.js";
import {replace, render, RenderPosition} from "../utils/render.js";
import {getTasksByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tasksModel.setDataChangeHandler(this._onDataChange);
  }

  // Главный метод рендер
  render() {
    // Находит контейнер, в который будет рендериться вьюха
    const container = this._container;
    // Находит все таски, которые в модели
    const allTasks = this._tasksModel.getTasksAll();
    // Каждое название фильтра прогоняется по map'у и в count делается подсчёт тасков по прогоняемому названию и сравнивается со значением активного фильтра в конструкторе
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getTasksByFilter(allTasks, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    // Текущее значение компонента кладётся в константу старого компонента
    const oldComponent = this._filterComponent;

    // Текущее значение компонента тут же обновляется, т.е. создаётся новая вьюха
    this._filterComponent = new FilterComponent(filters);
    // тут же вешается обработчик на только что созданную вьюху
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    // И если был старый компонент, то перерендерить, иначе просто отрендерить впервые
    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  // Обработчик, спускаемый во вьюху: принимает тип фильтра и отдаёт его в модель и во флаг активного фильтра у контроллера
  _onFilterChange(filterType) {
    this._tasksModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  // Метод, запускающий рендер 
  _onDataChange() {
    this.render();
  }
}

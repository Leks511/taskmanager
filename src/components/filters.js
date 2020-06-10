const FILTERS = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const getFilterCount = (filter, tasks) => {
  let count;

  if (filter === `all`) {
    count = tasks.length;
  }

  if (filter === `overdue`) {
    count = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < Date.now()).length;
  }

  // Временно
  if (filter === `today`) {
    count = tasks.filter((task) => Math.random() > 0.5).length;
  }

  if (filter === `favorites`) {
    count = tasks.filter((task) => task.isFavorite).length;
  }

  if (filter === `repeating`) {
    count = tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
  }

  if (filter === `tags`) {
    count = tasks.filter((task) => Array.from(task.tags).length).length;
  }

  if (filter === `archive`) {
    count = tasks.filter((task) => task.inArchive).length;
  }

  return count;
};

const createFilterMarkup = (filter, tasks) => {
  const filterCount = getFilterCount(filter, tasks);

  return (
    `<input
      type="radio"
      id="filter__${filter}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${filter}" class="filter__label">
      ${filter} <span class="filter__${filter}-count">${filterCount}</span></label
    >`
  );
};

export const createFiltersTemplate = (tasks) => {
  return  (
    `<section class="main__filter filter container">
      ${FILTERS.map((filter) => createFilterMarkup(filter, tasks)).join(`\n`)}
    </section>`
  );
};

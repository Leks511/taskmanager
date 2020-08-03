import AbstractView from "./abstract.js";

const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class BoardComponent extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}

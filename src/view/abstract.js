import {createElement} from "../util.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Нельзя создавать экземпляр абстрактного класса`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
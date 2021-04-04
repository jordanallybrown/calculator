import View from "./view.mjs";
import Calculator from "./model/calculator.mjs";

export default class Controller {

  constructor(model, view) {
    this._model = model;
    this._view = view;
  }

  handleEqual = (expression) => {
    this._model.calculate(expression);
  }



      
}
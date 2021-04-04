import View from "./view.mjs";
import Calculator from "./model/calculator.mjs";

export default class Controller {

        constructor(model, view) {
          this.model = model
          this.view = view
        }
      
}
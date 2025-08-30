import {
  Validator
} from "./chunk-Y5USKZKS.js";

// node_modules/@material/web/labs/behaviors/validators/checkbox-validator.js
var CheckboxValidator = class extends Validator {
  computeValidity(state) {
    if (!this.checkboxControl) {
      this.checkboxControl = document.createElement("input");
      this.checkboxControl.type = "checkbox";
    }
    this.checkboxControl.checked = state.checked;
    this.checkboxControl.required = state.required;
    return {
      validity: this.checkboxControl.validity,
      validationMessage: this.checkboxControl.validationMessage
    };
  }
  equals(prev, next) {
    return prev.checked === next.checked && prev.required === next.required;
  }
  copy({ checked, required }) {
    return { checked, required };
  }
};

export {
  CheckboxValidator
};
/*! Bundled license information:

@material/web/labs/behaviors/validators/checkbox-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=chunk-OIQ5LHF4.js.map

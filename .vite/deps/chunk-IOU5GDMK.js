import {
  styleMap
} from "./chunk-HJMO4AJE.js";
import {
  html as html2
} from "./chunk-EHNEH3OL.js";
import {
  Validator,
  createValidator,
  getFormValue,
  getValidityAnchor,
  mixinConstraintValidation,
  mixinFormAssociated
} from "./chunk-Y5USKZKS.js";
import {
  redispatchEvent
} from "./chunk-I2NKYIK3.js";
import {
  internals,
  mixinElementInternals
} from "./chunk-THR3AX43.js";
import {
  mixinDelegatesAria
} from "./chunk-YLMQR52S.js";
import {
  Directive,
  EASING,
  PartType,
  classMap,
  directive
} from "./chunk-2LM4DU2J.js";
import {
  LitElement,
  _$LH,
  __decorate,
  css,
  html,
  isServer,
  noChange,
  nothing,
  property,
  query,
  queryAssignedElements,
  render,
  state
} from "./chunk-3EMLS5FJ.js";

// node_modules/@material/web/textfield/internal/shared-styles.js
var styles = css`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;

// node_modules/@material/web/field/internal/shared-styles.js
var styles2 = css`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;

// node_modules/lit-html/development/directive-helpers.js
var { _ChildPart: ChildPart } = _$LH;
var ENABLE_SHADYDOM_NOPATCH = true;
var wrap = ENABLE_SHADYDOM_NOPATCH && window.ShadyDOM?.inUse && window.ShadyDOM?.noPatch === true ? window.ShadyDOM.wrap : (node) => node;
var isSingleExpression = (part) => part.strings === void 0;
var RESET_VALUE = {};
var setCommittedValue = (part, value = RESET_VALUE) => part._$committedValue = value;

// node_modules/lit-html/development/directives/live.js
var LiveDirective = class extends Directive {
  constructor(partInfo) {
    super(partInfo);
    if (!(partInfo.type === PartType.PROPERTY || partInfo.type === PartType.ATTRIBUTE || partInfo.type === PartType.BOOLEAN_ATTRIBUTE)) {
      throw new Error("The `live` directive is not allowed on child or event bindings");
    }
    if (!isSingleExpression(partInfo)) {
      throw new Error("`live` bindings can only contain a single expression");
    }
  }
  render(value) {
    return value;
  }
  update(part, [value]) {
    if (value === noChange || value === nothing) {
      return value;
    }
    const element = part.element;
    const name = part.name;
    if (part.type === PartType.PROPERTY) {
      if (value === element[name]) {
        return noChange;
      }
    } else if (part.type === PartType.BOOLEAN_ATTRIBUTE) {
      if (!!value === element.hasAttribute(name)) {
        return noChange;
      }
    } else if (part.type === PartType.ATTRIBUTE) {
      if (element.getAttribute(name) === String(value)) {
        return noChange;
      }
    }
    setCommittedValue(part);
    return value;
  }
};
var live = directive(LiveDirective);

// node_modules/@material/web/internal/controller/string-converter.js
var stringConverter = {
  fromAttribute(value) {
    return value ?? "";
  },
  toAttribute(value) {
    return value || null;
  }
};

// node_modules/@material/web/labs/behaviors/on-report-validity.js
var onReportValidity = Symbol("onReportValidity");
var privateCleanupFormListeners = Symbol("privateCleanupFormListeners");
var privateDoNotReportInvalid = Symbol("privateDoNotReportInvalid");
var privateIsSelfReportingValidity = Symbol("privateIsSelfReportingValidity");
var privateCallOnReportValidity = Symbol("privateCallOnReportValidity");
function mixinOnReportValidity(base) {
  var _a, _b, _c;
  class OnReportValidityElement extends base {
    // Mixins must have a constructor with `...args: any[]`
    // tslint:disable-next-line:no-any
    constructor(...args) {
      super(...args);
      this[_a] = new AbortController();
      this[_b] = false;
      this[_c] = false;
      if (isServer) {
        return;
      }
      this.addEventListener("invalid", (invalidEvent) => {
        if (this[privateDoNotReportInvalid] || !invalidEvent.isTrusted) {
          return;
        }
        this.addEventListener("invalid", () => {
          this[privateCallOnReportValidity](invalidEvent);
        }, { once: true });
      }, {
        // Listen during the capture phase, which will happen before the
        // bubbling phase. That way, we can add a final event listener that
        // will run after other event listeners, and we can check if it was
        // default prevented. This works because invalid does not bubble.
        capture: true
      });
    }
    checkValidity() {
      this[privateDoNotReportInvalid] = true;
      const valid = super.checkValidity();
      this[privateDoNotReportInvalid] = false;
      return valid;
    }
    reportValidity() {
      this[privateIsSelfReportingValidity] = true;
      const valid = super.reportValidity();
      if (valid) {
        this[privateCallOnReportValidity](null);
      }
      this[privateIsSelfReportingValidity] = false;
      return valid;
    }
    [(_a = privateCleanupFormListeners, _b = privateDoNotReportInvalid, _c = privateIsSelfReportingValidity, privateCallOnReportValidity)](invalidEvent) {
      const wasCanceled = invalidEvent?.defaultPrevented;
      if (wasCanceled) {
        return;
      }
      this[onReportValidity](invalidEvent);
      const implementationCanceledFocus = !wasCanceled && invalidEvent?.defaultPrevented;
      if (!implementationCanceledFocus) {
        return;
      }
      if (this[privateIsSelfReportingValidity] || isFirstInvalidControlInForm(this[internals].form, this)) {
        this.focus();
      }
    }
    [onReportValidity](invalidEvent) {
      throw new Error("Implement [onReportValidity]");
    }
    formAssociatedCallback(form) {
      if (super.formAssociatedCallback) {
        super.formAssociatedCallback(form);
      }
      this[privateCleanupFormListeners].abort();
      if (!form) {
        return;
      }
      this[privateCleanupFormListeners] = new AbortController();
      addFormReportValidListener(this, form, () => {
        this[privateCallOnReportValidity](null);
      }, this[privateCleanupFormListeners].signal);
    }
  }
  return OnReportValidityElement;
}
function addFormReportValidListener(control, form, onControlValid, cleanup) {
  const validateHooks = getFormValidateHooks(form);
  let controlFiredInvalid = false;
  let cleanupInvalidListener;
  let isNextSubmitFromHook = false;
  validateHooks.addEventListener("before", () => {
    isNextSubmitFromHook = true;
    cleanupInvalidListener = new AbortController();
    controlFiredInvalid = false;
    control.addEventListener("invalid", () => {
      controlFiredInvalid = true;
    }, {
      signal: cleanupInvalidListener.signal
    });
  }, { signal: cleanup });
  validateHooks.addEventListener("after", () => {
    isNextSubmitFromHook = false;
    cleanupInvalidListener?.abort();
    if (controlFiredInvalid) {
      return;
    }
    onControlValid();
  }, { signal: cleanup });
  form.addEventListener("submit", () => {
    if (isNextSubmitFromHook) {
      return;
    }
    onControlValid();
  }, {
    signal: cleanup
  });
}
var FORM_VALIDATE_HOOKS = /* @__PURE__ */ new WeakMap();
function getFormValidateHooks(form) {
  if (!FORM_VALIDATE_HOOKS.has(form)) {
    const hooks = new EventTarget();
    FORM_VALIDATE_HOOKS.set(form, hooks);
    for (const methodName of ["reportValidity", "requestSubmit"]) {
      const superMethod = form[methodName];
      form[methodName] = function() {
        hooks.dispatchEvent(new Event("before"));
        const result = Reflect.apply(superMethod, this, arguments);
        hooks.dispatchEvent(new Event("after"));
        return result;
      };
    }
  }
  return FORM_VALIDATE_HOOKS.get(form);
}
function isFirstInvalidControlInForm(form, control) {
  if (!form) {
    return true;
  }
  let firstInvalidControl;
  for (const element of form.elements) {
    if (element.matches(":invalid")) {
      firstInvalidControl = element;
      break;
    }
  }
  return firstInvalidControl === control;
}

// node_modules/@material/web/labs/behaviors/validators/text-field-validator.js
var TextFieldValidator = class extends Validator {
  computeValidity({ state: state2, renderedControl }) {
    let inputOrTextArea = renderedControl;
    if (isInputState(state2) && !inputOrTextArea) {
      inputOrTextArea = this.inputControl || document.createElement("input");
      this.inputControl = inputOrTextArea;
    } else if (!inputOrTextArea) {
      inputOrTextArea = this.textAreaControl || document.createElement("textarea");
      this.textAreaControl = inputOrTextArea;
    }
    const input = isInputState(state2) ? inputOrTextArea : null;
    if (input) {
      input.type = state2.type;
    }
    if (inputOrTextArea.value !== state2.value) {
      inputOrTextArea.value = state2.value;
    }
    inputOrTextArea.required = state2.required;
    if (input) {
      const inputState = state2;
      if (inputState.pattern) {
        input.pattern = inputState.pattern;
      } else {
        input.removeAttribute("pattern");
      }
      if (inputState.min) {
        input.min = inputState.min;
      } else {
        input.removeAttribute("min");
      }
      if (inputState.max) {
        input.max = inputState.max;
      } else {
        input.removeAttribute("max");
      }
      if (inputState.step) {
        input.step = inputState.step;
      } else {
        input.removeAttribute("step");
      }
    }
    if ((state2.minLength ?? -1) > -1) {
      inputOrTextArea.setAttribute("minlength", String(state2.minLength));
    } else {
      inputOrTextArea.removeAttribute("minlength");
    }
    if ((state2.maxLength ?? -1) > -1) {
      inputOrTextArea.setAttribute("maxlength", String(state2.maxLength));
    } else {
      inputOrTextArea.removeAttribute("maxlength");
    }
    return {
      validity: inputOrTextArea.validity,
      validationMessage: inputOrTextArea.validationMessage
    };
  }
  equals({ state: prev }, { state: next }) {
    const inputOrTextAreaEqual = prev.type === next.type && prev.value === next.value && prev.required === next.required && prev.minLength === next.minLength && prev.maxLength === next.maxLength;
    if (!isInputState(prev) || !isInputState(next)) {
      return inputOrTextAreaEqual;
    }
    return inputOrTextAreaEqual && prev.pattern === next.pattern && prev.min === next.min && prev.max === next.max && prev.step === next.step;
  }
  copy({ state: state2 }) {
    return {
      state: isInputState(state2) ? this.copyInput(state2) : this.copyTextArea(state2),
      renderedControl: null
    };
  }
  copyInput(state2) {
    const { type, pattern, min, max, step } = state2;
    return {
      ...this.copySharedState(state2),
      type,
      pattern,
      min,
      max,
      step
    };
  }
  copyTextArea(state2) {
    return {
      ...this.copySharedState(state2),
      type: state2.type
    };
  }
  copySharedState({ value, required, minLength, maxLength }) {
    return { value, required, minLength, maxLength };
  }
};
function isInputState(state2) {
  return state2.type !== "textarea";
}

// node_modules/@material/web/textfield/internal/text-field.js
var textFieldBaseClass = mixinDelegatesAria(mixinOnReportValidity(mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(LitElement)))));
var TextField = class extends textFieldBaseClass {
  constructor() {
    super(...arguments);
    this.error = false;
    this.errorText = "";
    this.label = "";
    this.noAsterisk = false;
    this.required = false;
    this.value = "";
    this.prefixText = "";
    this.suffixText = "";
    this.hasLeadingIcon = false;
    this.hasTrailingIcon = false;
    this.supportingText = "";
    this.textDirection = "";
    this.rows = 2;
    this.cols = 20;
    this.inputMode = "";
    this.max = "";
    this.maxLength = -1;
    this.min = "";
    this.minLength = -1;
    this.noSpinner = false;
    this.pattern = "";
    this.placeholder = "";
    this.readOnly = false;
    this.multiple = false;
    this.step = "";
    this.type = "text";
    this.autocomplete = "";
    this.dirty = false;
    this.focused = false;
    this.nativeError = false;
    this.nativeErrorText = "";
  }
  /**
   * Gets or sets the direction in which selection occurred.
   */
  get selectionDirection() {
    return this.getInputOrTextarea().selectionDirection;
  }
  set selectionDirection(value) {
    this.getInputOrTextarea().selectionDirection = value;
  }
  /**
   * Gets or sets the end position or offset of a text selection.
   */
  get selectionEnd() {
    return this.getInputOrTextarea().selectionEnd;
  }
  set selectionEnd(value) {
    this.getInputOrTextarea().selectionEnd = value;
  }
  /**
   * Gets or sets the starting position or offset of a text selection.
   */
  get selectionStart() {
    return this.getInputOrTextarea().selectionStart;
  }
  set selectionStart(value) {
    this.getInputOrTextarea().selectionStart = value;
  }
  /**
   * The text field's value as a number.
   */
  get valueAsNumber() {
    const input = this.getInput();
    if (!input) {
      return NaN;
    }
    return input.valueAsNumber;
  }
  set valueAsNumber(value) {
    const input = this.getInput();
    if (!input) {
      return;
    }
    input.valueAsNumber = value;
    this.value = input.value;
  }
  /**
   * The text field's value as a Date.
   */
  get valueAsDate() {
    const input = this.getInput();
    if (!input) {
      return null;
    }
    return input.valueAsDate;
  }
  set valueAsDate(value) {
    const input = this.getInput();
    if (!input) {
      return;
    }
    input.valueAsDate = value;
    this.value = input.value;
  }
  get hasError() {
    return this.error || this.nativeError;
  }
  /**
   * Selects all the text in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
   */
  select() {
    this.getInputOrTextarea().select();
  }
  setRangeText(...args) {
    this.getInputOrTextarea().setRangeText(...args);
    this.value = this.getInputOrTextarea().value;
  }
  /**
   * Sets the start and end positions of a selection in the text field.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
   *
   * @param start The offset into the text field for the start of the selection.
   * @param end The offset into the text field for the end of the selection.
   * @param direction The direction in which the selection is performed.
   */
  setSelectionRange(start, end, direction) {
    this.getInputOrTextarea().setSelectionRange(start, end, direction);
  }
  /**
   * Shows the browser picker for an input element of type "date", "time", etc.
   *
   * For a full list of supported types, see:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker#browser_compatibility
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
   */
  showPicker() {
    const input = this.getInput();
    if (!input) {
      return;
    }
    input.showPicker();
  }
  /**
   * Decrements the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
   *
   * @param stepDecrement The number of steps to decrement, defaults to 1.
   */
  stepDown(stepDecrement) {
    const input = this.getInput();
    if (!input) {
      return;
    }
    input.stepDown(stepDecrement);
    this.value = input.value;
  }
  /**
   * Increments the value of a numeric type text field by `step` or `n` `step`
   * number of times.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
   *
   * @param stepIncrement The number of steps to increment, defaults to 1.
   */
  stepUp(stepIncrement) {
    const input = this.getInput();
    if (!input) {
      return;
    }
    input.stepUp(stepIncrement);
    this.value = input.value;
  }
  /**
   * Reset the text field to its default value.
   */
  reset() {
    this.dirty = false;
    this.value = this.getAttribute("value") ?? "";
    this.nativeError = false;
    this.nativeErrorText = "";
  }
  attributeChangedCallback(attribute, newValue, oldValue) {
    if (attribute === "value" && this.dirty) {
      return;
    }
    super.attributeChangedCallback(attribute, newValue, oldValue);
  }
  render() {
    const classes = {
      "disabled": this.disabled,
      "error": !this.disabled && this.hasError,
      "textarea": this.type === "textarea",
      "no-spinner": this.noSpinner
    };
    return html`
      <span class="text-field ${classMap(classes)}">
        ${this.renderField()}
      </span>
    `;
  }
  updated(changedProperties) {
    const value = this.getInputOrTextarea().value;
    if (this.value !== value) {
      this.value = value;
    }
  }
  renderField() {
    return html2`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type === "textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`;
  }
  renderLeadingIcon() {
    return html`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderTrailingIcon() {
    return html`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `;
  }
  renderInputOrTextarea() {
    const style = { "direction": this.textDirection };
    const ariaLabel = this.ariaLabel || this.label || nothing;
    const autocomplete = this.autocomplete;
    const hasMaxLength = (this.maxLength ?? -1) > -1;
    const hasMinLength = (this.minLength ?? -1) > -1;
    if (this.type === "textarea") {
      return html`
        <textarea
          class="input"
          style=${styleMap(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || nothing}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          maxlength=${hasMaxLength ? this.maxLength : nothing}
          minlength=${hasMinLength ? this.minLength : nothing}
          placeholder=${this.placeholder || nothing}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${live(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;
    }
    const prefix = this.renderPrefix();
    const suffix = this.renderSuffix();
    const inputMode = this.inputMode;
    return html`
      <div class="input-wrapper">
        ${prefix}
        <input
          class="input"
          style=${styleMap(style)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${ariaLabel}
          autocomplete=${autocomplete || nothing}
          name=${this.name || nothing}
          ?disabled=${this.disabled}
          inputmode=${inputMode || nothing}
          max=${this.max || nothing}
          maxlength=${hasMaxLength ? this.maxLength : nothing}
          min=${this.min || nothing}
          minlength=${hasMinLength ? this.minLength : nothing}
          pattern=${this.pattern || nothing}
          placeholder=${this.placeholder || nothing}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step || nothing}
          type=${this.type}
          .value=${live(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${suffix}
      </div>
    `;
  }
  renderPrefix() {
    return this.renderAffix(
      this.prefixText,
      /* isSuffix */
      false
    );
  }
  renderSuffix() {
    return this.renderAffix(
      this.suffixText,
      /* isSuffix */
      true
    );
  }
  renderAffix(text, isSuffix) {
    if (!text) {
      return nothing;
    }
    const classes = {
      "suffix": isSuffix,
      "prefix": !isSuffix
    };
    return html`<span class="${classMap(classes)}">${text}</span>`;
  }
  getErrorText() {
    return this.error ? this.errorText : this.nativeErrorText;
  }
  handleFocusChange() {
    this.focused = this.inputOrTextarea?.matches(":focus") ?? false;
  }
  handleInput(event) {
    this.dirty = true;
    this.value = event.target.value;
  }
  redispatchEvent(event) {
    redispatchEvent(this, event);
  }
  getInputOrTextarea() {
    if (!this.inputOrTextarea) {
      this.connectedCallback();
      this.scheduleUpdate();
    }
    if (this.isUpdatePending) {
      this.scheduleUpdate();
    }
    return this.inputOrTextarea;
  }
  getInput() {
    if (this.type === "textarea") {
      return null;
    }
    return this.getInputOrTextarea();
  }
  handleIconChange() {
    this.hasLeadingIcon = this.leadingIcons.length > 0;
    this.hasTrailingIcon = this.trailingIcons.length > 0;
  }
  [getFormValue]() {
    return this.value;
  }
  formResetCallback() {
    this.reset();
  }
  formStateRestoreCallback(state2) {
    this.value = state2;
  }
  focus() {
    this.getInputOrTextarea().focus();
  }
  [createValidator]() {
    return new TextFieldValidator(() => ({
      state: this,
      renderedControl: this.inputOrTextarea
    }));
  }
  [getValidityAnchor]() {
    return this.inputOrTextarea;
  }
  [onReportValidity](invalidEvent) {
    invalidEvent?.preventDefault();
    const prevMessage = this.getErrorText();
    this.nativeError = !!invalidEvent;
    this.nativeErrorText = this.validationMessage;
    if (prevMessage === this.getErrorText()) {
      this.field?.reannounceError();
    }
  }
};
TextField.shadowRootOptions = {
  ...LitElement.shadowRootOptions,
  delegatesFocus: true
};
__decorate([
  property({ type: Boolean, reflect: true })
], TextField.prototype, "error", void 0);
__decorate([
  property({ attribute: "error-text" })
], TextField.prototype, "errorText", void 0);
__decorate([
  property()
], TextField.prototype, "label", void 0);
__decorate([
  property({ type: Boolean, attribute: "no-asterisk" })
], TextField.prototype, "noAsterisk", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], TextField.prototype, "required", void 0);
__decorate([
  property()
], TextField.prototype, "value", void 0);
__decorate([
  property({ attribute: "prefix-text" })
], TextField.prototype, "prefixText", void 0);
__decorate([
  property({ attribute: "suffix-text" })
], TextField.prototype, "suffixText", void 0);
__decorate([
  property({ type: Boolean, attribute: "has-leading-icon" })
], TextField.prototype, "hasLeadingIcon", void 0);
__decorate([
  property({ type: Boolean, attribute: "has-trailing-icon" })
], TextField.prototype, "hasTrailingIcon", void 0);
__decorate([
  property({ attribute: "supporting-text" })
], TextField.prototype, "supportingText", void 0);
__decorate([
  property({ attribute: "text-direction" })
], TextField.prototype, "textDirection", void 0);
__decorate([
  property({ type: Number })
], TextField.prototype, "rows", void 0);
__decorate([
  property({ type: Number })
], TextField.prototype, "cols", void 0);
__decorate([
  property({ reflect: true })
], TextField.prototype, "inputMode", void 0);
__decorate([
  property()
], TextField.prototype, "max", void 0);
__decorate([
  property({ type: Number })
], TextField.prototype, "maxLength", void 0);
__decorate([
  property()
], TextField.prototype, "min", void 0);
__decorate([
  property({ type: Number })
], TextField.prototype, "minLength", void 0);
__decorate([
  property({ type: Boolean, attribute: "no-spinner" })
], TextField.prototype, "noSpinner", void 0);
__decorate([
  property()
], TextField.prototype, "pattern", void 0);
__decorate([
  property({ reflect: true, converter: stringConverter })
], TextField.prototype, "placeholder", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], TextField.prototype, "readOnly", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], TextField.prototype, "multiple", void 0);
__decorate([
  property()
], TextField.prototype, "step", void 0);
__decorate([
  property({ reflect: true })
], TextField.prototype, "type", void 0);
__decorate([
  property({ reflect: true })
], TextField.prototype, "autocomplete", void 0);
__decorate([
  state()
], TextField.prototype, "dirty", void 0);
__decorate([
  state()
], TextField.prototype, "focused", void 0);
__decorate([
  state()
], TextField.prototype, "nativeError", void 0);
__decorate([
  state()
], TextField.prototype, "nativeErrorText", void 0);
__decorate([
  query(".input")
], TextField.prototype, "inputOrTextarea", void 0);
__decorate([
  query(".field")
], TextField.prototype, "field", void 0);
__decorate([
  queryAssignedElements({ slot: "leading-icon" })
], TextField.prototype, "leadingIcons", void 0);
__decorate([
  queryAssignedElements({ slot: "trailing-icon" })
], TextField.prototype, "trailingIcons", void 0);

// node_modules/@material/web/field/internal/field.js
var Field = class extends LitElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.error = false;
    this.focused = false;
    this.label = "";
    this.noAsterisk = false;
    this.populated = false;
    this.required = false;
    this.resizable = false;
    this.supportingText = "";
    this.errorText = "";
    this.count = -1;
    this.max = -1;
    this.hasStart = false;
    this.hasEnd = false;
    this.isAnimating = false;
    this.refreshErrorAlert = false;
    this.disableTransitions = false;
  }
  get counterText() {
    const countAsNumber = this.count ?? -1;
    const maxAsNumber = this.max ?? -1;
    if (countAsNumber < 0 || maxAsNumber <= 0) {
      return "";
    }
    return `${countAsNumber} / ${maxAsNumber}`;
  }
  get supportingOrErrorText() {
    return this.error && this.errorText ? this.errorText : this.supportingText;
  }
  /**
   * Re-announces the field's error supporting text to screen readers.
   *
   * Error text announces to screen readers anytime it is visible and changes.
   * Use the method to re-announce the message when the text has not changed,
   * but announcement is still needed (such as for `reportValidity()`).
   */
  reannounceError() {
    this.refreshErrorAlert = true;
  }
  update(props) {
    const isDisabledChanging = props.has("disabled") && props.get("disabled") !== void 0;
    if (isDisabledChanging) {
      this.disableTransitions = true;
    }
    if (this.disabled && this.focused) {
      props.set("focused", true);
      this.focused = false;
    }
    this.animateLabelIfNeeded({
      wasFocused: props.get("focused"),
      wasPopulated: props.get("populated")
    });
    super.update(props);
  }
  render() {
    const floatingLabel = this.renderLabel(
      /*isFloating*/
      true
    );
    const restingLabel = this.renderLabel(
      /*isFloating*/
      false
    );
    const outline = this.renderOutline?.(floatingLabel);
    const classes = {
      "disabled": this.disabled,
      "disable-transitions": this.disableTransitions,
      "error": this.error && !this.disabled,
      "focused": this.focused,
      "with-start": this.hasStart,
      "with-end": this.hasEnd,
      "populated": this.populated,
      "resizable": this.resizable,
      "required": this.required,
      "no-label": !this.label
    };
    return html`
      <div class="field ${classMap(classes)}">
        <div class="container-overflow">
          ${this.renderBackground?.()}
          <slot name="container"></slot>
          ${this.renderStateLayer?.()} ${this.renderIndicator?.()} ${outline}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${restingLabel} ${outline ? nothing : floatingLabel}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `;
  }
  updated(changed) {
    if (changed.has("supportingText") || changed.has("errorText") || changed.has("count") || changed.has("max")) {
      this.updateSlottedAriaDescribedBy();
    }
    if (this.refreshErrorAlert) {
      requestAnimationFrame(() => {
        this.refreshErrorAlert = false;
      });
    }
    if (this.disableTransitions) {
      requestAnimationFrame(() => {
        this.disableTransitions = false;
      });
    }
  }
  renderSupportingText() {
    const { supportingOrErrorText, counterText } = this;
    if (!supportingOrErrorText && !counterText) {
      return nothing;
    }
    const start = html`<span>${supportingOrErrorText}</span>`;
    const end = counterText ? html`<span class="counter">${counterText}</span>` : nothing;
    const shouldErrorAnnounce = this.error && this.errorText && !this.refreshErrorAlert;
    const role = shouldErrorAnnounce ? "alert" : nothing;
    return html`
      <div class="supporting-text" role=${role}>${start}${end}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `;
  }
  updateSlottedAriaDescribedBy() {
    for (const element of this.slottedAriaDescribedBy) {
      render(html`${this.supportingOrErrorText} ${this.counterText}`, element);
      element.setAttribute("hidden", "");
    }
  }
  renderLabel(isFloating) {
    if (!this.label) {
      return nothing;
    }
    let visible;
    if (isFloating) {
      visible = this.focused || this.populated || this.isAnimating;
    } else {
      visible = !this.focused && !this.populated && !this.isAnimating;
    }
    const classes = {
      "hidden": !visible,
      "floating": isFloating,
      "resting": !isFloating
    };
    const labelText = `${this.label}${this.required && !this.noAsterisk ? "*" : ""}`;
    return html`
      <span class="label ${classMap(classes)}" aria-hidden=${!visible}
        >${labelText}</span
      >
    `;
  }
  animateLabelIfNeeded({ wasFocused, wasPopulated }) {
    if (!this.label) {
      return;
    }
    wasFocused ??= this.focused;
    wasPopulated ??= this.populated;
    const wasFloating = wasFocused || wasPopulated;
    const shouldBeFloating = this.focused || this.populated;
    if (wasFloating === shouldBeFloating) {
      return;
    }
    this.isAnimating = true;
    this.labelAnimation?.cancel();
    this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: EASING.STANDARD });
    this.labelAnimation?.addEventListener("finish", () => {
      this.isAnimating = false;
    });
  }
  getLabelKeyframes() {
    const { floatingLabelEl, restingLabelEl } = this;
    if (!floatingLabelEl || !restingLabelEl) {
      return [];
    }
    const { x: floatingX, y: floatingY, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
    const { x: restingX, y: restingY, height: restingHeight } = restingLabelEl.getBoundingClientRect();
    const floatingScrollWidth = floatingLabelEl.scrollWidth;
    const restingScrollWidth = restingLabelEl.scrollWidth;
    const scale = restingScrollWidth / floatingScrollWidth;
    const xDelta = restingX - floatingX;
    const yDelta = restingY - floatingY + Math.round((restingHeight - floatingHeight * scale) / 2);
    const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    const floatTransform = `translateX(0) translateY(0) scale(1)`;
    const restingClientWidth = restingLabelEl.clientWidth;
    const isRestingClipped = restingScrollWidth > restingClientWidth;
    const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
    if (this.focused || this.populated) {
      return [
        { transform: restTransform, width },
        { transform: floatTransform, width }
      ];
    }
    return [
      { transform: floatTransform, width },
      { transform: restTransform, width }
    ];
  }
  getSurfacePositionClientRect() {
    return this.containerEl.getBoundingClientRect();
  }
};
__decorate([
  property({ type: Boolean })
], Field.prototype, "disabled", void 0);
__decorate([
  property({ type: Boolean })
], Field.prototype, "error", void 0);
__decorate([
  property({ type: Boolean })
], Field.prototype, "focused", void 0);
__decorate([
  property()
], Field.prototype, "label", void 0);
__decorate([
  property({ type: Boolean, attribute: "no-asterisk" })
], Field.prototype, "noAsterisk", void 0);
__decorate([
  property({ type: Boolean })
], Field.prototype, "populated", void 0);
__decorate([
  property({ type: Boolean })
], Field.prototype, "required", void 0);
__decorate([
  property({ type: Boolean })
], Field.prototype, "resizable", void 0);
__decorate([
  property({ attribute: "supporting-text" })
], Field.prototype, "supportingText", void 0);
__decorate([
  property({ attribute: "error-text" })
], Field.prototype, "errorText", void 0);
__decorate([
  property({ type: Number })
], Field.prototype, "count", void 0);
__decorate([
  property({ type: Number })
], Field.prototype, "max", void 0);
__decorate([
  property({ type: Boolean, attribute: "has-start" })
], Field.prototype, "hasStart", void 0);
__decorate([
  property({ type: Boolean, attribute: "has-end" })
], Field.prototype, "hasEnd", void 0);
__decorate([
  queryAssignedElements({ slot: "aria-describedby" })
], Field.prototype, "slottedAriaDescribedBy", void 0);
__decorate([
  state()
], Field.prototype, "isAnimating", void 0);
__decorate([
  state()
], Field.prototype, "refreshErrorAlert", void 0);
__decorate([
  state()
], Field.prototype, "disableTransitions", void 0);
__decorate([
  query(".label.floating")
], Field.prototype, "floatingLabelEl", void 0);
__decorate([
  query(".label.resting")
], Field.prototype, "restingLabelEl", void 0);
__decorate([
  query(".container")
], Field.prototype, "containerEl", void 0);

export {
  Field,
  styles2 as styles,
  TextField,
  styles as styles2
};
/*! Bundled license information:

@material/web/textfield/internal/shared-styles.js:
@material/web/field/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/development/directive-helpers.js:
lit-html/development/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/controller/string-converter.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/on-report-validity.js:
@material/web/labs/behaviors/validators/text-field-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/text-field.js:
@material/web/field/internal/field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=chunk-IOU5GDMK.js.map

import {
  Validator,
  createValidator,
  getFormState,
  getFormValue,
  getValidityAnchor,
  mixinConstraintValidation,
  mixinFormAssociated
} from "./chunk-Y5USKZKS.js";
import {
  isActivationClick
} from "./chunk-HGMXEH4Q.js";
import "./chunk-V4SOPYAJ.js";
import "./chunk-MHR3J37T.js";
import {
  internals,
  mixinElementInternals
} from "./chunk-THR3AX43.js";
import {
  classMap
} from "./chunk-2LM4DU2J.js";
import {
  LitElement,
  __decorate,
  css,
  customElement,
  html,
  isServer,
  property,
  query
} from "./chunk-3EMLS5FJ.js";
import "./chunk-BUSYA2B4.js";

// node_modules/@material/web/labs/behaviors/focusable.js
var isFocusable = Symbol("isFocusable");
var privateIsFocusable = Symbol("privateIsFocusable");
var externalTabIndex = Symbol("externalTabIndex");
var isUpdatingTabIndex = Symbol("isUpdatingTabIndex");
var updateTabIndex = Symbol("updateTabIndex");
function mixinFocusable(base) {
  var _a2, _b, _c;
  class FocusableElement extends base {
    constructor() {
      super(...arguments);
      this[_a2] = true;
      this[_b] = null;
      this[_c] = false;
    }
    get [isFocusable]() {
      return this[privateIsFocusable];
    }
    set [isFocusable](value) {
      if (this[isFocusable] === value) {
        return;
      }
      this[privateIsFocusable] = value;
      this[updateTabIndex]();
    }
    connectedCallback() {
      super.connectedCallback();
      this[updateTabIndex]();
    }
    attributeChangedCallback(name, old, value) {
      if (name !== "tabindex") {
        super.attributeChangedCallback(name, old, value);
        return;
      }
      this.requestUpdate("tabIndex", Number(old ?? -1));
      if (this[isUpdatingTabIndex]) {
        return;
      }
      if (!this.hasAttribute("tabindex")) {
        this[externalTabIndex] = null;
        this[updateTabIndex]();
        return;
      }
      this[externalTabIndex] = this.tabIndex;
    }
    [(_a2 = privateIsFocusable, _b = externalTabIndex, _c = isUpdatingTabIndex, updateTabIndex)]() {
      const internalTabIndex = this[isFocusable] ? 0 : -1;
      const computedTabIndex = this[externalTabIndex] ?? internalTabIndex;
      this[isUpdatingTabIndex] = true;
      this.tabIndex = computedTabIndex;
      this[isUpdatingTabIndex] = false;
    }
  }
  __decorate([
    property({ noAccessor: true })
  ], FocusableElement.prototype, "tabIndex", void 0);
  return FocusableElement;
}

// node_modules/@material/web/labs/behaviors/validators/radio-validator.js
var RadioValidator = class extends Validator {
  computeValidity(states) {
    if (!this.radioElement) {
      this.radioElement = document.createElement("input");
      this.radioElement.type = "radio";
      this.radioElement.name = "group";
    }
    let isRequired = false;
    let isChecked = false;
    for (const { checked, required } of states) {
      if (required) {
        isRequired = true;
      }
      if (checked) {
        isChecked = true;
      }
    }
    this.radioElement.checked = isChecked;
    this.radioElement.required = isRequired;
    return {
      validity: {
        valueMissing: isRequired && !isChecked
      },
      validationMessage: this.radioElement.validationMessage
    };
  }
  equals(prevGroup, nextGroup) {
    if (prevGroup.length !== nextGroup.length) {
      return false;
    }
    for (let i = 0; i < prevGroup.length; i++) {
      const prev = prevGroup[i];
      const next = nextGroup[i];
      if (prev.checked !== next.checked || prev.required !== next.required) {
        return false;
      }
    }
    return true;
  }
  copy(states) {
    return states.map(({ checked, required }) => ({
      checked,
      required
    }));
  }
};

// node_modules/@material/web/radio/internal/single-selection-controller.js
var SingleSelectionController = class {
  /**
   * All single selection elements in the host element's root with the same
   * `name` attribute, including the host element.
   */
  get controls() {
    const name = this.host.getAttribute("name");
    if (!name || !this.root || !this.host.isConnected) {
      return [this.host];
    }
    return Array.from(this.root.querySelectorAll(`[name="${name}"]`));
  }
  constructor(host) {
    this.host = host;
    this.focused = false;
    this.root = null;
    this.handleFocusIn = () => {
      this.focused = true;
      this.updateTabIndices();
    };
    this.handleFocusOut = () => {
      this.focused = false;
      this.updateTabIndices();
    };
    this.handleKeyDown = (event) => {
      const isDown = event.key === "ArrowDown";
      const isUp = event.key === "ArrowUp";
      const isLeft = event.key === "ArrowLeft";
      const isRight = event.key === "ArrowRight";
      if (!isLeft && !isRight && !isDown && !isUp) {
        return;
      }
      const siblings = this.controls;
      if (!siblings.length) {
        return;
      }
      event.preventDefault();
      const isRtl = getComputedStyle(this.host).direction === "rtl";
      const forwards = isRtl ? isLeft || isDown : isRight || isDown;
      const hostIndex = siblings.indexOf(this.host);
      let nextIndex = forwards ? hostIndex + 1 : hostIndex - 1;
      while (nextIndex !== hostIndex) {
        if (nextIndex >= siblings.length) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = siblings.length - 1;
        }
        const nextSibling = siblings[nextIndex];
        if (nextSibling.hasAttribute("disabled")) {
          if (forwards) {
            nextIndex++;
          } else {
            nextIndex--;
          }
          continue;
        }
        for (const sibling of siblings) {
          if (sibling !== nextSibling) {
            sibling.checked = false;
            sibling.tabIndex = -1;
            sibling.blur();
          }
        }
        nextSibling.checked = true;
        nextSibling.tabIndex = 0;
        nextSibling.focus();
        nextSibling.dispatchEvent(new Event("change", { bubbles: true }));
        break;
      }
    };
  }
  hostConnected() {
    this.root = this.host.getRootNode();
    this.host.addEventListener("keydown", this.handleKeyDown);
    this.host.addEventListener("focusin", this.handleFocusIn);
    this.host.addEventListener("focusout", this.handleFocusOut);
    if (this.host.checked) {
      this.uncheckSiblings();
    }
    queueMicrotask(() => {
      this.updateTabIndices();
    });
  }
  hostDisconnected() {
    this.host.removeEventListener("keydown", this.handleKeyDown);
    this.host.removeEventListener("focusin", this.handleFocusIn);
    this.host.removeEventListener("focusout", this.handleFocusOut);
    queueMicrotask(() => {
      this.updateTabIndices();
      this.root = null;
    });
  }
  /**
   * Should be called whenever the host's `checked` property changes
   * synchronously.
   */
  handleCheckedChange() {
    if (!this.host.checked) {
      return;
    }
    this.uncheckSiblings();
    this.updateTabIndices();
  }
  uncheckSiblings() {
    for (const sibling of this.controls) {
      if (sibling !== this.host) {
        sibling.checked = false;
      }
    }
  }
  /**
   * Updates the `tabindex` of the host and its siblings.
   */
  updateTabIndices() {
    const siblings = this.controls;
    const checkedSibling = siblings.find((sibling) => sibling.checked);
    if (checkedSibling || this.focused) {
      const focusable = checkedSibling || this.host;
      focusable.tabIndex = 0;
      for (const sibling of siblings) {
        if (sibling !== focusable) {
          sibling.tabIndex = -1;
        }
      }
      return;
    }
    for (const sibling of siblings) {
      sibling.tabIndex = 0;
    }
  }
};

// node_modules/@material/web/radio/internal/radio.js
var _a;
var CHECKED = Symbol("checked");
var maskId = 0;
var radioBaseClass = mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(mixinFocusable(LitElement))));
var Radio = class extends radioBaseClass {
  /**
   * Whether or not the radio is selected.
   */
  get checked() {
    return this[CHECKED];
  }
  set checked(checked) {
    const wasChecked = this.checked;
    if (wasChecked === checked) {
      return;
    }
    this[CHECKED] = checked;
    this.requestUpdate("checked", wasChecked);
    this.selectionController.handleCheckedChange();
  }
  constructor() {
    super();
    this.maskId = `cutout${++maskId}`;
    this[_a] = false;
    this.required = false;
    this.value = "on";
    this.selectionController = new SingleSelectionController(this);
    this.addController(this.selectionController);
    if (!isServer) {
      this[internals].role = "radio";
      this.addEventListener("click", this.handleClick.bind(this));
      this.addEventListener("keydown", this.handleKeydown.bind(this));
    }
  }
  render() {
    const classes = { "checked": this.checked };
    return html`
      <div class="container ${classMap(classes)}" aria-hidden="true">
        <md-ripple
          part="ripple"
          .control=${this}
          ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring part="focus-ring" .control=${this}></md-focus-ring>
        <svg class="icon" viewBox="0 0 20 20">
          <mask id="${this.maskId}">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="10" cy="10" r="8" fill="black" />
          </mask>
          <circle
            class="outer circle"
            cx="10"
            cy="10"
            r="10"
            mask="url(#${this.maskId})" />
          <circle class="inner circle" cx="10" cy="10" r="5" />
        </svg>

        <div class="touch-target"></div>
      </div>
    `;
  }
  updated() {
    this[internals].ariaChecked = String(this.checked);
  }
  async handleClick(event) {
    if (this.disabled) {
      return;
    }
    await 0;
    if (event.defaultPrevented) {
      return;
    }
    if (isActivationClick(event)) {
      this.focus();
    }
    this.checked = true;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
  }
  async handleKeydown(event) {
    await 0;
    if (event.key !== " " || event.defaultPrevented) {
      return;
    }
    this.click();
  }
  [(_a = CHECKED, getFormValue)]() {
    return this.checked ? this.value : null;
  }
  [getFormState]() {
    return String(this.checked);
  }
  formResetCallback() {
    this.checked = this.hasAttribute("checked");
  }
  formStateRestoreCallback(state) {
    this.checked = state === "true";
  }
  [createValidator]() {
    return new RadioValidator(() => {
      if (!this.selectionController) {
        return [this];
      }
      return this.selectionController.controls;
    });
  }
  [getValidityAnchor]() {
    return this.container;
  }
};
__decorate([
  property({ type: Boolean })
], Radio.prototype, "checked", null);
__decorate([
  property({ type: Boolean })
], Radio.prototype, "required", void 0);
__decorate([
  property()
], Radio.prototype, "value", void 0);
__decorate([
  query(".container")
], Radio.prototype, "container", void 0);

// node_modules/@material/web/radio/internal/radio-styles.js
var styles = css`@layer{:host{display:inline-flex;height:var(--md-radio-icon-size, 20px);outline:none;position:relative;vertical-align:top;width:var(--md-radio-icon-size, 20px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer;--md-ripple-hover-color: var(--md-radio-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-radio-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-radio-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-radio-pressed-state-layer-opacity, 0.12)}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-radio-icon-size, 20px))/2)}.container{display:flex;height:100%;place-content:center;place-items:center;width:100%}md-focus-ring{height:44px;inset:unset;width:44px}.checked{--md-ripple-hover-color: var(--md-radio-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-radio-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-radio-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-radio-selected-pressed-state-layer-opacity, 0.12)}.touch-target{height:48px;position:absolute;width:48px}:host([touch-target=none]) .touch-target{display:none}md-ripple{border-radius:50%;height:var(--md-radio-state-layer-size, 40px);inset:unset;width:var(--md-radio-state-layer-size, 40px)}.icon{fill:var(--md-radio-icon-color, var(--md-sys-color-on-surface-variant, #49454f));inset:0;position:absolute}.outer.circle{transition:fill 50ms linear}.inner.circle{opacity:0;transform-origin:center;transition:opacity 50ms linear}.checked .icon{fill:var(--md-radio-selected-icon-color, var(--md-sys-color-primary, #6750a4))}.checked .inner.circle{animation:inner-circle-grow 300ms cubic-bezier(0.05, 0.7, 0.1, 1);opacity:1}@keyframes inner-circle-grow{from{transform:scale(0)}to{transform:scale(1)}}:host([disabled]) .circle{animation-duration:0s;transition-duration:0s}:host(:hover) .icon{fill:var(--md-radio-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20))}:host(:focus-within) .icon{fill:var(--md-radio-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20))}:host(:active) .icon{fill:var(--md-radio-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20))}:host([disabled]) .icon{fill:var(--md-radio-disabled-unselected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-radio-disabled-unselected-icon-opacity, 0.38)}:host(:hover) .checked .icon{fill:var(--md-radio-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4))}:host(:focus-within) .checked .icon{fill:var(--md-radio-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4))}:host(:active) .checked .icon{fill:var(--md-radio-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4))}:host([disabled]) .checked .icon{fill:var(--md-radio-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-radio-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon{fill:CanvasText}:host([disabled]) .icon{fill:GrayText;opacity:1}}}
`;

// node_modules/@material/web/radio/radio.js
var MdRadio = class MdRadio2 extends Radio {
};
MdRadio.styles = [styles];
MdRadio = __decorate([
  customElement("md-radio")
], MdRadio);
export {
  MdRadio
};
/*! Bundled license information:

@material/web/labs/behaviors/focusable.js:
@material/web/labs/behaviors/validators/radio-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/radio/internal/single-selection-controller.js:
@material/web/radio/radio.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/radio/internal/radio.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/radio/internal/radio-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=@material_web_radio_radio__js.js.map

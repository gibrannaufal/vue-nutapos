import {
  CloseReason,
  createDefaultCloseMenuEvent,
  isClosableKey
} from "./chunk-TC2PPS7T.js";
import {
  html as html2,
  literal
} from "./chunk-EHNEH3OL.js";
import "./chunk-V4SOPYAJ.js";
import "./chunk-MHR3J37T.js";
import {
  mixinDelegatesAria
} from "./chunk-YLMQR52S.js";
import {
  classMap
} from "./chunk-2LM4DU2J.js";
import {
  LitElement,
  __decorate,
  css,
  customElement,
  html,
  nothing,
  property,
  query,
  queryAll,
  queryAssignedElements,
  queryAssignedNodes
} from "./chunk-3EMLS5FJ.js";
import "./chunk-BUSYA2B4.js";

// node_modules/@material/web/labs/item/internal/item.js
var Item = class extends LitElement {
  constructor() {
    super(...arguments);
    this.multiline = false;
  }
  render() {
    return html`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `;
  }
  handleTextSlotChange() {
    let isMultiline = false;
    let slotsWithContent = 0;
    for (const slot of this.textSlots) {
      if (slotHasContent(slot)) {
        slotsWithContent += 1;
      }
      if (slotsWithContent > 1) {
        isMultiline = true;
        break;
      }
    }
    this.multiline = isMultiline;
  }
};
__decorate([
  property({ type: Boolean, reflect: true })
], Item.prototype, "multiline", void 0);
__decorate([
  queryAll(".text slot")
], Item.prototype, "textSlots", void 0);
function slotHasContent(slot) {
  for (const node of slot.assignedNodes({ flatten: true })) {
    const isElement = node.nodeType === Node.ELEMENT_NODE;
    const isTextWithContent = node.nodeType === Node.TEXT_NODE && node.textContent?.match(/\S/);
    if (isElement || isTextWithContent) {
      return true;
    }
  }
  return false;
}

// node_modules/@material/web/labs/item/internal/item-styles.js
var styles = css`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;

// node_modules/@material/web/labs/item/item.js
var MdItem = class MdItem2 extends Item {
};
MdItem.styles = [styles];
MdItem = __decorate([
  customElement("md-item")
], MdItem);

// node_modules/@material/web/menu/internal/controllers/menuItemController.js
var MenuItemController = class {
  /**
   * @param host The MenuItem in which to attach this controller to.
   * @param config The object that configures this controller's behavior.
   */
  constructor(host, config) {
    this.host = host;
    this.internalTypeaheadText = null;
    this.onClick = () => {
      if (this.host.keepOpen)
        return;
      this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
        kind: CloseReason.CLICK_SELECTION
      }));
    };
    this.onKeydown = (event) => {
      if (this.host.href && event.code === "Enter") {
        const interactiveElement = this.getInteractiveElement();
        if (interactiveElement instanceof HTMLAnchorElement) {
          interactiveElement.click();
        }
      }
      if (event.defaultPrevented)
        return;
      const keyCode = event.code;
      if (this.host.keepOpen && keyCode !== "Escape")
        return;
      if (isClosableKey(keyCode)) {
        event.preventDefault();
        this.host.dispatchEvent(createDefaultCloseMenuEvent(this.host, {
          kind: CloseReason.KEYDOWN,
          key: keyCode
        }));
      }
    };
    this.getHeadlineElements = config.getHeadlineElements;
    this.getSupportingTextElements = config.getSupportingTextElements;
    this.getDefaultElements = config.getDefaultElements;
    this.getInteractiveElement = config.getInteractiveElement;
    this.host.addController(this);
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot, and if there are
   * no slotted elements into headline, then it checks the _default_ slot, and
   * then the `"supporting-text"` slot if nothing is in _default_.
   */
  get typeaheadText() {
    if (this.internalTypeaheadText !== null) {
      return this.internalTypeaheadText;
    }
    const headlineElements = this.getHeadlineElements();
    const textParts = [];
    headlineElements.forEach((headlineElement) => {
      if (headlineElement.textContent && headlineElement.textContent.trim()) {
        textParts.push(headlineElement.textContent.trim());
      }
    });
    if (textParts.length === 0) {
      this.getDefaultElements().forEach((defaultElement) => {
        if (defaultElement.textContent && defaultElement.textContent.trim()) {
          textParts.push(defaultElement.textContent.trim());
        }
      });
    }
    if (textParts.length === 0) {
      this.getSupportingTextElements().forEach((supportingTextElement) => {
        if (supportingTextElement.textContent && supportingTextElement.textContent.trim()) {
          textParts.push(supportingTextElement.textContent.trim());
        }
      });
    }
    return textParts.join(" ");
  }
  /**
   * The recommended tag name to render as the list item.
   */
  get tagName() {
    const type = this.host.type;
    switch (type) {
      case "link":
        return "a";
      case "button":
        return "button";
      default:
      case "menuitem":
      case "option":
        return "li";
    }
  }
  /**
   * The recommended role of the menu item.
   */
  get role() {
    return this.host.type === "option" ? "option" : "menuitem";
  }
  hostConnected() {
    this.host.toggleAttribute("md-menu-item", true);
  }
  hostUpdate() {
    if (this.host.href) {
      this.host.type = "link";
    }
  }
  /**
   * Use to set the typeaheadText when it changes.
   */
  setTypeaheadText(text) {
    this.internalTypeaheadText = text;
  }
};

// node_modules/@material/web/menu/internal/menuitem/menu-item.js
var menuItemBaseClass = mixinDelegatesAria(LitElement);
var MenuItemEl = class extends menuItemBaseClass {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.type = "menuitem";
    this.href = "";
    this.target = "";
    this.keepOpen = false;
    this.selected = false;
    this.menuItemController = new MenuItemController(this, {
      getHeadlineElements: () => {
        return this.headlineElements;
      },
      getSupportingTextElements: () => {
        return this.supportingTextElements;
      },
      getDefaultElements: () => {
        return this.defaultElements;
      },
      getInteractiveElement: () => this.listItemRoot
    });
  }
  /**
   * The text that is selectable via typeahead. If not set, defaults to the
   * innerText of the item slotted into the `"headline"` slot.
   */
  get typeaheadText() {
    return this.menuItemController.typeaheadText;
  }
  set typeaheadText(text) {
    this.menuItemController.setTypeaheadText(text);
  }
  render() {
    return this.renderListItem(html`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `);
  }
  /**
   * Renders the root list item.
   *
   * @param content the child content of the list item.
   */
  renderListItem(content) {
    const isAnchor = this.type === "link";
    let tag;
    switch (this.menuItemController.tagName) {
      case "a":
        tag = literal`a`;
        break;
      case "button":
        tag = literal`button`;
        break;
      default:
      case "li":
        tag = literal`li`;
        break;
    }
    const target = isAnchor && !!this.target ? this.target : nothing;
    return html2`
      <${tag}
        id="item"
        tabindex=${this.disabled && !isAnchor ? -1 : 0}
        role=${this.menuItemController.role}
        aria-label=${this.ariaLabel || nothing}
        aria-selected=${this.ariaSelected || nothing}
        aria-checked=${this.ariaChecked || nothing}
        aria-expanded=${this.ariaExpanded || nothing}
        aria-haspopup=${this.ariaHasPopup || nothing}
        class="list-item ${classMap(this.getRenderClasses())}"
        href=${this.href || nothing}
        target=${target}
        @click=${this.menuItemController.onClick}
        @keydown=${this.menuItemController.onKeydown}
      >${content}</${tag}>
    `;
  }
  /**
   * Handles rendering of the ripple element.
   */
  renderRipple() {
    return html` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`;
  }
  /**
   * Handles rendering of the focus ring.
   */
  renderFocusRing() {
    return html` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`;
  }
  /**
   * Classes applied to the list item root.
   */
  getRenderClasses() {
    return {
      "disabled": this.disabled,
      "selected": this.selected
    };
  }
  /**
   * Handles rendering the headline and supporting text.
   */
  renderBody() {
    return html`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `;
  }
  focus() {
    this.listItemRoot?.focus();
  }
};
MenuItemEl.shadowRootOptions = {
  ...LitElement.shadowRootOptions,
  delegatesFocus: true
};
__decorate([
  property({ type: Boolean, reflect: true })
], MenuItemEl.prototype, "disabled", void 0);
__decorate([
  property()
], MenuItemEl.prototype, "type", void 0);
__decorate([
  property()
], MenuItemEl.prototype, "href", void 0);
__decorate([
  property()
], MenuItemEl.prototype, "target", void 0);
__decorate([
  property({ type: Boolean, attribute: "keep-open" })
], MenuItemEl.prototype, "keepOpen", void 0);
__decorate([
  property({ type: Boolean })
], MenuItemEl.prototype, "selected", void 0);
__decorate([
  query(".list-item")
], MenuItemEl.prototype, "listItemRoot", void 0);
__decorate([
  queryAssignedElements({ slot: "headline" })
], MenuItemEl.prototype, "headlineElements", void 0);
__decorate([
  queryAssignedElements({ slot: "supporting-text" })
], MenuItemEl.prototype, "supportingTextElements", void 0);
__decorate([
  queryAssignedNodes({ slot: "" })
], MenuItemEl.prototype, "defaultElements", void 0);
__decorate([
  property({ attribute: "typeahead-text" })
], MenuItemEl.prototype, "typeaheadText", null);

// node_modules/@material/web/menu/internal/menuitem/menu-item-styles.js
var styles2 = css`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`;

// node_modules/@material/web/menu/menu-item.js
var MdMenuItem = class MdMenuItem2 extends MenuItemEl {
};
MdMenuItem.styles = [styles2];
MdMenuItem = __decorate([
  customElement("md-menu-item")
], MdMenuItem);
export {
  MdMenuItem
};
/*! Bundled license information:

@material/web/labs/item/internal/item.js:
@material/web/labs/item/item.js:
@material/web/menu/internal/controllers/menuItemController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item-styles.js:
@material/web/menu/internal/menuitem/menu-item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menuitem/menu-item.js:
@material/web/menu/menu-item.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=@material_web_menu_menu-item__js.js.map

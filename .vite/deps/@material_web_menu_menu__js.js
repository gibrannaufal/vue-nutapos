import {
  CloseReason,
  FocusState,
  isClosableKey,
  isElementInSubtree
} from "./chunk-TC2PPS7T.js";
import {
  styleMap
} from "./chunk-HJMO4AJE.js";
import "./chunk-BBIPV2WG.js";
import "./chunk-MHR3J37T.js";
import {
  EASING,
  classMap,
  createAnimationSignal
} from "./chunk-2LM4DU2J.js";
import {
  LitElement,
  __decorate,
  css,
  customElement,
  html,
  isServer,
  nothing,
  property,
  query,
  queryAssignedElements,
  state
} from "./chunk-3EMLS5FJ.js";
import "./chunk-BUSYA2B4.js";

// node_modules/@material/web/list/internal/list-navigation-helpers.js
function activateFirstItem(items, isActivatable = isItemNotDisabled) {
  const firstItem = getFirstActivatableItem(items, isActivatable);
  if (firstItem) {
    firstItem.tabIndex = 0;
    firstItem.focus();
  }
  return firstItem;
}
function activateLastItem(items, isActivatable = isItemNotDisabled) {
  const lastItem = getLastActivatableItem(items, isActivatable);
  if (lastItem) {
    lastItem.tabIndex = 0;
    lastItem.focus();
  }
  return lastItem;
}
function getActiveItem(items, isActivatable = isItemNotDisabled) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.tabIndex === 0 && isActivatable(item)) {
      return {
        item,
        index: i
      };
    }
  }
  return null;
}
function getFirstActivatableItem(items, isActivatable = isItemNotDisabled) {
  for (const item of items) {
    if (isActivatable(item)) {
      return item;
    }
  }
  return null;
}
function getLastActivatableItem(items, isActivatable = isItemNotDisabled) {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (isActivatable(item)) {
      return item;
    }
  }
  return null;
}
function getNextItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
  for (let i = 1; i < items.length; i++) {
    const nextIndex = (i + index) % items.length;
    if (nextIndex < index && !wrap) {
      return null;
    }
    const item = items[nextIndex];
    if (isActivatable(item)) {
      return item;
    }
  }
  return items[index] ? items[index] : null;
}
function getPrevItem(items, index, isActivatable = isItemNotDisabled, wrap = true) {
  for (let i = 1; i < items.length; i++) {
    const prevIndex = (index - i + items.length) % items.length;
    if (prevIndex > index && !wrap) {
      return null;
    }
    const item = items[prevIndex];
    if (isActivatable(item)) {
      return item;
    }
  }
  return items[index] ? items[index] : null;
}
function activateNextItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
  if (activeItemRecord) {
    const next = getNextItem(items, activeItemRecord.index, isActivatable, wrap);
    if (next) {
      next.tabIndex = 0;
      next.focus();
    }
    return next;
  } else {
    return activateFirstItem(items, isActivatable);
  }
}
function activatePreviousItem(items, activeItemRecord, isActivatable = isItemNotDisabled, wrap = true) {
  if (activeItemRecord) {
    const prev = getPrevItem(items, activeItemRecord.index, isActivatable, wrap);
    if (prev) {
      prev.tabIndex = 0;
      prev.focus();
    }
    return prev;
  } else {
    return activateLastItem(items, isActivatable);
  }
}
function isItemNotDisabled(item) {
  return !item.disabled;
}

// node_modules/@material/web/list/internal/list-controller.js
var NavigableKeys = {
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  Home: "Home",
  End: "End"
};
var ListController = class {
  constructor(config) {
    this.handleKeydown = (event) => {
      const key = event.key;
      if (event.defaultPrevented || !this.isNavigableKey(key)) {
        return;
      }
      const items = this.items;
      if (!items.length) {
        return;
      }
      const activeItemRecord = getActiveItem(items, this.isActivatable);
      event.preventDefault();
      const isRtl2 = this.isRtl();
      const inlinePrevious = isRtl2 ? NavigableKeys.ArrowRight : NavigableKeys.ArrowLeft;
      const inlineNext = isRtl2 ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
      let nextActiveItem = null;
      switch (key) {
        // Activate the next item
        case NavigableKeys.ArrowDown:
        case inlineNext:
          nextActiveItem = activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
          break;
        // Activate the previous item
        case NavigableKeys.ArrowUp:
        case inlinePrevious:
          nextActiveItem = activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
          break;
        // Activate the first item
        case NavigableKeys.Home:
          nextActiveItem = activateFirstItem(items, this.isActivatable);
          break;
        // Activate the last item
        case NavigableKeys.End:
          nextActiveItem = activateLastItem(items, this.isActivatable);
          break;
        default:
          break;
      }
      if (nextActiveItem && activeItemRecord && activeItemRecord.item !== nextActiveItem) {
        activeItemRecord.item.tabIndex = -1;
      }
    };
    this.onDeactivateItems = () => {
      const items = this.items;
      for (const item of items) {
        this.deactivateItem(item);
      }
    };
    this.onRequestActivation = (event) => {
      this.onDeactivateItems();
      const target = event.target;
      this.activateItem(target);
      target.focus();
    };
    this.onSlotchange = () => {
      const items = this.items;
      let encounteredActivated = false;
      for (const item of items) {
        const isActivated = !item.disabled && item.tabIndex > -1;
        if (isActivated && !encounteredActivated) {
          encounteredActivated = true;
          item.tabIndex = 0;
          continue;
        }
        item.tabIndex = -1;
      }
      if (encounteredActivated) {
        return;
      }
      const firstActivatableItem = getFirstActivatableItem(items, this.isActivatable);
      if (!firstActivatableItem) {
        return;
      }
      firstActivatableItem.tabIndex = 0;
    };
    const { isItem, getPossibleItems, isRtl, deactivateItem, activateItem, isNavigableKey, isActivatable, wrapNavigation } = config;
    this.isItem = isItem;
    this.getPossibleItems = getPossibleItems;
    this.isRtl = isRtl;
    this.deactivateItem = deactivateItem;
    this.activateItem = activateItem;
    this.isNavigableKey = isNavigableKey;
    this.isActivatable = isActivatable;
    this.wrapNavigation = wrapNavigation ?? (() => true);
  }
  /**
   * The items being managed by the list. Additionally, attempts to see if the
   * object has a sub-item in the `.item` property.
   */
  get items() {
    const maybeItems = this.getPossibleItems();
    const items = [];
    for (const itemOrParent of maybeItems) {
      const isItem = this.isItem(itemOrParent);
      if (isItem) {
        items.push(itemOrParent);
        continue;
      }
      const subItem = itemOrParent.item;
      if (subItem && this.isItem(subItem)) {
        items.push(subItem);
      }
    }
    return items;
  }
  /**
   * Activates the next item in the list. If at the end of the list, the first
   * item will be activated.
   *
   * @return The activated list item or `null` if there are no items.
   */
  activateNextItem() {
    const items = this.items;
    const activeItemRecord = getActiveItem(items, this.isActivatable);
    if (activeItemRecord) {
      activeItemRecord.item.tabIndex = -1;
    }
    return activateNextItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
  }
  /**
   * Activates the previous item in the list. If at the start of the list, the
   * last item will be activated.
   *
   * @return The activated list item or `null` if there are no items.
   */
  activatePreviousItem() {
    const items = this.items;
    const activeItemRecord = getActiveItem(items, this.isActivatable);
    if (activeItemRecord) {
      activeItemRecord.item.tabIndex = -1;
    }
    return activatePreviousItem(items, activeItemRecord, this.isActivatable, this.wrapNavigation());
  }
};

// node_modules/@material/web/menu/internal/controllers/surfacePositionController.js
var Corner = {
  END_START: "end-start",
  END_END: "end-end",
  START_START: "start-start",
  START_END: "start-end"
};
var SurfacePositionController = class {
  /**
   * @param host The host to connect the controller to.
   * @param getProperties A function that returns the properties for the
   * controller.
   */
  constructor(host, getProperties) {
    this.host = host;
    this.getProperties = getProperties;
    this.surfaceStylesInternal = {
      "display": "none"
    };
    this.lastValues = {
      isOpen: false
    };
    this.host.addController(this);
  }
  /**
   * The StyleInfo map to apply to the surface via Lit's stylemap
   */
  get surfaceStyles() {
    return this.surfaceStylesInternal;
  }
  /**
   * Calculates the surface's new position required so that the surface's
   * `surfaceCorner` aligns to the anchor's `anchorCorner` while keeping the
   * surface inside the window viewport. This positioning also respects RTL by
   * checking `getComputedStyle()` on the surface element.
   */
  async position() {
    const { surfaceEl, anchorEl, anchorCorner: anchorCornerRaw, surfaceCorner: surfaceCornerRaw, positioning, xOffset, yOffset, disableBlockFlip, disableInlineFlip, repositionStrategy } = this.getProperties();
    const anchorCorner = anchorCornerRaw.toLowerCase().trim();
    const surfaceCorner = surfaceCornerRaw.toLowerCase().trim();
    if (!surfaceEl || !anchorEl) {
      return;
    }
    const windowInnerWidth = window.innerWidth;
    const windowInnerHeight = window.innerHeight;
    const div = document.createElement("div");
    div.style.opacity = "0";
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.inset = "0";
    document.body.appendChild(div);
    const scrollbarTestRect = div.getBoundingClientRect();
    div.remove();
    const blockScrollbarHeight = window.innerHeight - scrollbarTestRect.bottom;
    const inlineScrollbarWidth = window.innerWidth - scrollbarTestRect.right;
    this.surfaceStylesInternal = {
      "display": "block",
      "opacity": "0"
    };
    this.host.requestUpdate();
    await this.host.updateComplete;
    if (surfaceEl.popover && surfaceEl.isConnected) {
      surfaceEl.showPopover();
    }
    const surfaceRect = surfaceEl.getSurfacePositionClientRect ? surfaceEl.getSurfacePositionClientRect() : surfaceEl.getBoundingClientRect();
    const anchorRect = anchorEl.getSurfacePositionClientRect ? anchorEl.getSurfacePositionClientRect() : anchorEl.getBoundingClientRect();
    const [surfaceBlock, surfaceInline] = surfaceCorner.split("-");
    const [anchorBlock, anchorInline] = anchorCorner.split("-");
    const isLTR = getComputedStyle(surfaceEl).direction === "ltr";
    let { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty } = this.calculateBlock({
      surfaceRect,
      anchorRect,
      anchorBlock,
      surfaceBlock,
      yOffset,
      positioning,
      windowInnerHeight,
      blockScrollbarHeight
    });
    if (blockOutOfBoundsCorrection && !disableBlockFlip) {
      const flippedSurfaceBlock = surfaceBlock === "start" ? "end" : "start";
      const flippedAnchorBlock = anchorBlock === "start" ? "end" : "start";
      const flippedBlock = this.calculateBlock({
        surfaceRect,
        anchorRect,
        anchorBlock: flippedAnchorBlock,
        surfaceBlock: flippedSurfaceBlock,
        yOffset,
        positioning,
        windowInnerHeight,
        blockScrollbarHeight
      });
      if (blockOutOfBoundsCorrection > flippedBlock.blockOutOfBoundsCorrection) {
        blockInset = flippedBlock.blockInset;
        blockOutOfBoundsCorrection = flippedBlock.blockOutOfBoundsCorrection;
        surfaceBlockProperty = flippedBlock.surfaceBlockProperty;
      }
    }
    let { inlineInset, inlineOutOfBoundsCorrection, surfaceInlineProperty } = this.calculateInline({
      surfaceRect,
      anchorRect,
      anchorInline,
      surfaceInline,
      xOffset,
      positioning,
      isLTR,
      windowInnerWidth,
      inlineScrollbarWidth
    });
    if (inlineOutOfBoundsCorrection && !disableInlineFlip) {
      const flippedSurfaceInline = surfaceInline === "start" ? "end" : "start";
      const flippedAnchorInline = anchorInline === "start" ? "end" : "start";
      const flippedInline = this.calculateInline({
        surfaceRect,
        anchorRect,
        anchorInline: flippedAnchorInline,
        surfaceInline: flippedSurfaceInline,
        xOffset,
        positioning,
        isLTR,
        windowInnerWidth,
        inlineScrollbarWidth
      });
      if (Math.abs(inlineOutOfBoundsCorrection) > Math.abs(flippedInline.inlineOutOfBoundsCorrection)) {
        inlineInset = flippedInline.inlineInset;
        inlineOutOfBoundsCorrection = flippedInline.inlineOutOfBoundsCorrection;
        surfaceInlineProperty = flippedInline.surfaceInlineProperty;
      }
    }
    if (repositionStrategy === "move") {
      blockInset = blockInset - blockOutOfBoundsCorrection;
      inlineInset = inlineInset - inlineOutOfBoundsCorrection;
    }
    this.surfaceStylesInternal = {
      "display": "block",
      "opacity": "1",
      [surfaceBlockProperty]: `${blockInset}px`,
      [surfaceInlineProperty]: `${inlineInset}px`
    };
    if (repositionStrategy === "resize") {
      if (blockOutOfBoundsCorrection) {
        this.surfaceStylesInternal["height"] = `${surfaceRect.height - blockOutOfBoundsCorrection}px`;
      }
      if (inlineOutOfBoundsCorrection) {
        this.surfaceStylesInternal["width"] = `${surfaceRect.width - inlineOutOfBoundsCorrection}px`;
      }
    }
    this.host.requestUpdate();
  }
  /**
   * Calculates the css property, the inset, and the out of bounds correction
   * for the surface in the block direction.
   */
  calculateBlock(config) {
    const { surfaceRect, anchorRect, anchorBlock, surfaceBlock, yOffset, positioning, windowInnerHeight, blockScrollbarHeight } = config;
    const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
    const relativeToDocument = positioning === "document" ? 1 : 0;
    const isSurfaceBlockStart = surfaceBlock === "start" ? 1 : 0;
    const isSurfaceBlockEnd = surfaceBlock === "end" ? 1 : 0;
    const isOneBlockEnd = anchorBlock !== surfaceBlock ? 1 : 0;
    const blockAnchorOffset = isOneBlockEnd * anchorRect.height + yOffset;
    const blockTopLayerOffset = isSurfaceBlockStart * anchorRect.top + isSurfaceBlockEnd * (windowInnerHeight - anchorRect.bottom - blockScrollbarHeight);
    const blockDocumentOffset = isSurfaceBlockStart * window.scrollY - isSurfaceBlockEnd * window.scrollY;
    const blockOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerHeight - blockTopLayerOffset - blockAnchorOffset - surfaceRect.height));
    const blockInset = relativeToWindow * blockTopLayerOffset + relativeToDocument * blockDocumentOffset + blockAnchorOffset;
    const surfaceBlockProperty = surfaceBlock === "start" ? "inset-block-start" : "inset-block-end";
    return { blockInset, blockOutOfBoundsCorrection, surfaceBlockProperty };
  }
  /**
   * Calculates the css property, the inset, and the out of bounds correction
   * for the surface in the inline direction.
   */
  calculateInline(config) {
    const { isLTR: isLTRBool, surfaceInline, anchorInline, anchorRect, surfaceRect, xOffset, positioning, windowInnerWidth, inlineScrollbarWidth } = config;
    const relativeToWindow = positioning === "fixed" || positioning === "document" ? 1 : 0;
    const relativeToDocument = positioning === "document" ? 1 : 0;
    const isLTR = isLTRBool ? 1 : 0;
    const isRTL = isLTRBool ? 0 : 1;
    const isSurfaceInlineStart = surfaceInline === "start" ? 1 : 0;
    const isSurfaceInlineEnd = surfaceInline === "end" ? 1 : 0;
    const isOneInlineEnd = anchorInline !== surfaceInline ? 1 : 0;
    const inlineAnchorOffset = isOneInlineEnd * anchorRect.width + xOffset;
    const inlineTopLayerOffsetLTR = isSurfaceInlineStart * anchorRect.left + isSurfaceInlineEnd * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth);
    const inlineTopLayerOffsetRTL = isSurfaceInlineStart * (windowInnerWidth - anchorRect.right - inlineScrollbarWidth) + isSurfaceInlineEnd * anchorRect.left;
    const inlineTopLayerOffset = isLTR * inlineTopLayerOffsetLTR + isRTL * inlineTopLayerOffsetRTL;
    const inlineDocumentOffsetLTR = isSurfaceInlineStart * window.scrollX - isSurfaceInlineEnd * window.scrollX;
    const inlineDocumentOffsetRTL = isSurfaceInlineEnd * window.scrollX - isSurfaceInlineStart * window.scrollX;
    const inlineDocumentOffset = isLTR * inlineDocumentOffsetLTR + isRTL * inlineDocumentOffsetRTL;
    const inlineOutOfBoundsCorrection = Math.abs(Math.min(0, windowInnerWidth - inlineTopLayerOffset - inlineAnchorOffset - surfaceRect.width));
    const inlineInset = relativeToWindow * inlineTopLayerOffset + inlineAnchorOffset + relativeToDocument * inlineDocumentOffset;
    let surfaceInlineProperty = surfaceInline === "start" ? "inset-inline-start" : "inset-inline-end";
    if (positioning === "document" || positioning === "fixed") {
      if (surfaceInline === "start" && isLTRBool || surfaceInline === "end" && !isLTRBool) {
        surfaceInlineProperty = "left";
      } else {
        surfaceInlineProperty = "right";
      }
    }
    return {
      inlineInset,
      inlineOutOfBoundsCorrection,
      surfaceInlineProperty
    };
  }
  hostUpdate() {
    this.onUpdate();
  }
  hostUpdated() {
    this.onUpdate();
  }
  /**
   * Checks whether the properties passed into the controller have changed since
   * the last positioning. If so, it will reposition if the surface is open or
   * close it if the surface should close.
   */
  async onUpdate() {
    const props = this.getProperties();
    let hasChanged = false;
    for (const [key, value] of Object.entries(props)) {
      hasChanged = hasChanged || value !== this.lastValues[key];
      if (hasChanged)
        break;
    }
    const openChanged = this.lastValues.isOpen !== props.isOpen;
    const hasAnchor = !!props.anchorEl;
    const hasSurface = !!props.surfaceEl;
    if (hasChanged && hasAnchor && hasSurface) {
      this.lastValues.isOpen = props.isOpen;
      if (props.isOpen) {
        this.lastValues = props;
        await this.position();
        props.onOpen();
      } else if (openChanged) {
        await props.beforeClose();
        this.close();
        props.onClose();
      }
    }
  }
  /**
   * Hides the surface.
   */
  close() {
    this.surfaceStylesInternal = {
      "display": "none"
    };
    this.host.requestUpdate();
    const surfaceEl = this.getProperties().surfaceEl;
    if (surfaceEl?.popover && surfaceEl?.isConnected) {
      surfaceEl.hidePopover();
    }
  }
};

// node_modules/@material/web/menu/internal/controllers/typeaheadController.js
var TYPEAHEAD_RECORD = {
  INDEX: 0,
  ITEM: 1,
  TEXT: 2
};
var TypeaheadController = class {
  /**
   * @param getProperties A function that returns the options of the typeahead
   * controller:
   *
   * {
   *   getItems: A function that returns an array of menu items to be searched.
   *   typeaheadBufferTime: The maximum time between each keystroke to keep the
   *       current type buffer alive.
   * }
   */
  constructor(getProperties) {
    this.getProperties = getProperties;
    this.typeaheadRecords = [];
    this.typaheadBuffer = "";
    this.cancelTypeaheadTimeout = 0;
    this.isTypingAhead = false;
    this.lastActiveRecord = null;
    this.onKeydown = (event) => {
      if (this.isTypingAhead) {
        this.typeahead(event);
      } else {
        this.beginTypeahead(event);
      }
    };
    this.endTypeahead = () => {
      this.isTypingAhead = false;
      this.typaheadBuffer = "";
      this.typeaheadRecords = [];
    };
  }
  get items() {
    return this.getProperties().getItems();
  }
  get active() {
    return this.getProperties().active;
  }
  /**
   * Sets up typingahead
   */
  beginTypeahead(event) {
    if (!this.active) {
      return;
    }
    if (event.code === "Space" || event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
      return;
    }
    this.isTypingAhead = true;
    this.typeaheadRecords = this.items.map((el, index) => [
      index,
      el,
      el.typeaheadText.trim().toLowerCase()
    ]);
    this.lastActiveRecord = this.typeaheadRecords.find((record) => record[TYPEAHEAD_RECORD.ITEM].tabIndex === 0) ?? null;
    if (this.lastActiveRecord) {
      this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
    }
    this.typeahead(event);
  }
  /**
   * Performs the typeahead. Based on the normalized items and the current text
   * buffer, finds the _next_ item with matching text and activates it.
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: 'o'
   * user types: l
   *
   * activates Olive
   *
   * @example
   *
   * items: Apple, Banana, Olive (active), Orange, Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Orange
   *
   * @example
   *
   * items: Apple, Banana, Olive, Orange (active), Cucumber
   * buffer: ''
   * user types: o
   *
   * activates Olive
   */
  typeahead(event) {
    if (event.defaultPrevented)
      return;
    clearTimeout(this.cancelTypeaheadTimeout);
    if (event.code === "Enter" || event.code.startsWith("Arrow") || event.code === "Escape") {
      this.endTypeahead();
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      return;
    }
    if (event.code === "Space") {
      event.preventDefault();
    }
    this.cancelTypeaheadTimeout = setTimeout(this.endTypeahead, this.getProperties().typeaheadBufferTime);
    this.typaheadBuffer += event.key.toLowerCase();
    const lastActiveIndex = this.lastActiveRecord ? this.lastActiveRecord[TYPEAHEAD_RECORD.INDEX] : -1;
    const numRecords = this.typeaheadRecords.length;
    const rebaseIndexOnActive = (record) => {
      return (record[TYPEAHEAD_RECORD.INDEX] + numRecords - lastActiveIndex) % numRecords;
    };
    const matchingRecords = this.typeaheadRecords.filter((record) => !record[TYPEAHEAD_RECORD.ITEM].disabled && record[TYPEAHEAD_RECORD.TEXT].startsWith(this.typaheadBuffer)).sort((a, b) => rebaseIndexOnActive(a) - rebaseIndexOnActive(b));
    if (matchingRecords.length === 0) {
      clearTimeout(this.cancelTypeaheadTimeout);
      if (this.lastActiveRecord) {
        this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
      }
      this.endTypeahead();
      return;
    }
    const isNewQuery = this.typaheadBuffer.length === 1;
    let nextRecord;
    if (this.lastActiveRecord === matchingRecords[0] && isNewQuery) {
      nextRecord = matchingRecords[1] ?? matchingRecords[0];
    } else {
      nextRecord = matchingRecords[0];
    }
    if (this.lastActiveRecord) {
      this.lastActiveRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = -1;
    }
    this.lastActiveRecord = nextRecord;
    nextRecord[TYPEAHEAD_RECORD.ITEM].tabIndex = 0;
    nextRecord[TYPEAHEAD_RECORD.ITEM].focus();
    return;
  }
};

// node_modules/@material/web/menu/internal/menu.js
var DEFAULT_TYPEAHEAD_BUFFER_TIME = 200;
var submenuNavKeys = /* @__PURE__ */ new Set([
  NavigableKeys.ArrowDown,
  NavigableKeys.ArrowUp,
  NavigableKeys.Home,
  NavigableKeys.End
]);
var menuNavKeys = /* @__PURE__ */ new Set([
  NavigableKeys.ArrowLeft,
  NavigableKeys.ArrowRight,
  ...submenuNavKeys
]);
function getFocusedElement(activeDoc = document) {
  let activeEl = activeDoc.activeElement;
  while (activeEl && activeEl?.shadowRoot?.activeElement) {
    activeEl = activeEl.shadowRoot.activeElement;
  }
  return activeEl;
}
var Menu = class extends LitElement {
  /**
   * Whether the menu is animating upwards or downwards when opening. This is
   * helpful for calculating some animation calculations.
   */
  get openDirection() {
    const menuCornerBlock = this.menuCorner.split("-")[0];
    return menuCornerBlock === "start" ? "DOWN" : "UP";
  }
  /**
   * The element which the menu should align to. If `anchor` is set to a
   * non-empty idref string, then `anchorEl` will resolve to the element with
   * the given id in the same root node. Otherwise, `null`.
   */
  get anchorElement() {
    if (this.anchor) {
      return this.getRootNode().querySelector(`#${this.anchor}`);
    }
    return this.currentAnchorElement;
  }
  set anchorElement(element) {
    this.currentAnchorElement = element;
    this.requestUpdate("anchorElement");
  }
  constructor() {
    super();
    this.anchor = "";
    this.positioning = "absolute";
    this.quick = false;
    this.hasOverflow = false;
    this.open = false;
    this.xOffset = 0;
    this.yOffset = 0;
    this.noHorizontalFlip = false;
    this.noVerticalFlip = false;
    this.typeaheadDelay = DEFAULT_TYPEAHEAD_BUFFER_TIME;
    this.anchorCorner = Corner.END_START;
    this.menuCorner = Corner.START_START;
    this.stayOpenOnOutsideClick = false;
    this.stayOpenOnFocusout = false;
    this.skipRestoreFocus = false;
    this.defaultFocus = FocusState.FIRST_ITEM;
    this.noNavigationWrap = false;
    this.typeaheadActive = true;
    this.isSubmenu = false;
    this.pointerPath = [];
    this.isRepositioning = false;
    this.openCloseAnimationSignal = createAnimationSignal();
    this.listController = new ListController({
      isItem: (maybeItem) => {
        return maybeItem.hasAttribute("md-menu-item");
      },
      getPossibleItems: () => this.slotItems,
      isRtl: () => getComputedStyle(this).direction === "rtl",
      deactivateItem: (item) => {
        item.selected = false;
        item.tabIndex = -1;
      },
      activateItem: (item) => {
        item.selected = true;
        item.tabIndex = 0;
      },
      isNavigableKey: (key) => {
        if (!this.isSubmenu) {
          return menuNavKeys.has(key);
        }
        const isRtl = getComputedStyle(this).direction === "rtl";
        const arrowOpen = isRtl ? NavigableKeys.ArrowLeft : NavigableKeys.ArrowRight;
        if (key === arrowOpen) {
          return true;
        }
        return submenuNavKeys.has(key);
      },
      wrapNavigation: () => !this.noNavigationWrap
    });
    this.lastFocusedElement = null;
    this.typeaheadController = new TypeaheadController(() => {
      return {
        getItems: () => this.items,
        typeaheadBufferTime: this.typeaheadDelay,
        active: this.typeaheadActive
      };
    });
    this.currentAnchorElement = null;
    this.internals = // Cast needed for closure
    this.attachInternals();
    this.menuPositionController = new SurfacePositionController(this, () => {
      return {
        anchorCorner: this.anchorCorner,
        surfaceCorner: this.menuCorner,
        surfaceEl: this.surfaceEl,
        anchorEl: this.anchorElement,
        positioning: this.positioning === "popover" ? "document" : this.positioning,
        isOpen: this.open,
        xOffset: this.xOffset,
        yOffset: this.yOffset,
        disableBlockFlip: this.noVerticalFlip,
        disableInlineFlip: this.noHorizontalFlip,
        onOpen: this.onOpened,
        beforeClose: this.beforeClose,
        onClose: this.onClosed,
        // We can't resize components that have overflow like menus with
        // submenus because the overflow-y will show menu items / content
        // outside the bounds of the menu. Popover API fixes this because each
        // submenu is hoisted to the top-layer and are not considered overflow
        // content.
        repositionStrategy: this.hasOverflow && this.positioning !== "popover" ? "move" : "resize"
      };
    });
    this.onWindowResize = () => {
      if (this.isRepositioning || this.positioning !== "document" && this.positioning !== "fixed" && this.positioning !== "popover") {
        return;
      }
      this.isRepositioning = true;
      this.reposition();
      this.isRepositioning = false;
    };
    this.handleFocusout = async (event) => {
      const anchorEl = this.anchorElement;
      if (this.stayOpenOnFocusout || !this.open || this.pointerPath.includes(anchorEl)) {
        return;
      }
      if (event.relatedTarget) {
        if (isElementInSubtree(event.relatedTarget, this) || this.pointerPath.length !== 0 && isElementInSubtree(event.relatedTarget, anchorEl)) {
          return;
        }
      } else if (this.pointerPath.includes(this)) {
        return;
      }
      const oldRestoreFocus = this.skipRestoreFocus;
      this.skipRestoreFocus = true;
      this.close();
      await this.updateComplete;
      this.skipRestoreFocus = oldRestoreFocus;
    };
    this.onOpened = async () => {
      this.lastFocusedElement = getFocusedElement();
      const items = this.items;
      const activeItemRecord = getActiveItem(items);
      if (activeItemRecord && this.defaultFocus !== FocusState.NONE) {
        activeItemRecord.item.tabIndex = -1;
      }
      let animationAborted = !this.quick;
      if (this.quick) {
        this.dispatchEvent(new Event("opening"));
      } else {
        animationAborted = !!await this.animateOpen();
      }
      switch (this.defaultFocus) {
        case FocusState.FIRST_ITEM:
          const first = getFirstActivatableItem(items);
          if (first) {
            first.tabIndex = 0;
            first.focus();
            await first.updateComplete;
          }
          break;
        case FocusState.LAST_ITEM:
          const last = getLastActivatableItem(items);
          if (last) {
            last.tabIndex = 0;
            last.focus();
            await last.updateComplete;
          }
          break;
        case FocusState.LIST_ROOT:
          this.focus();
          break;
        default:
        case FocusState.NONE:
          break;
      }
      if (!animationAborted) {
        this.dispatchEvent(new Event("opened"));
      }
    };
    this.beforeClose = async () => {
      this.open = false;
      if (!this.skipRestoreFocus) {
        this.lastFocusedElement?.focus?.();
      }
      if (!this.quick) {
        await this.animateClose();
      }
    };
    this.onClosed = () => {
      if (this.quick) {
        this.dispatchEvent(new Event("closing"));
        this.dispatchEvent(new Event("closed"));
      }
    };
    this.onWindowPointerdown = (event) => {
      this.pointerPath = event.composedPath();
    };
    this.onDocumentClick = (event) => {
      if (!this.open) {
        return;
      }
      const path = event.composedPath();
      if (!this.stayOpenOnOutsideClick && !path.includes(this) && !path.includes(this.anchorElement)) {
        this.open = false;
      }
    };
    if (!isServer) {
      this.internals.role = "menu";
      this.addEventListener("keydown", this.handleKeydown);
      this.addEventListener("keydown", this.captureKeydown, { capture: true });
      this.addEventListener("focusout", this.handleFocusout);
    }
  }
  /**
   * The menu items associated with this menu. The items must be `MenuItem`s and
   * have both the `md-menu-item` and `md-list-item` attributes.
   */
  get items() {
    return this.listController.items;
  }
  willUpdate(changed) {
    if (!changed.has("open")) {
      return;
    }
    if (this.open) {
      this.removeAttribute("aria-hidden");
      return;
    }
    this.setAttribute("aria-hidden", "true");
  }
  update(changed) {
    if (changed.has("open")) {
      if (this.open) {
        this.setUpGlobalEventListeners();
      } else {
        this.cleanUpGlobalEventListeners();
      }
    }
    if (changed.has("positioning") && this.positioning === "popover" && // type required for Google JS conformance
    !this.showPopover) {
      this.positioning = "fixed";
    }
    super.update(changed);
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.open) {
      this.setUpGlobalEventListeners();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanUpGlobalEventListeners();
  }
  getBoundingClientRect() {
    if (!this.surfaceEl) {
      return super.getBoundingClientRect();
    }
    return this.surfaceEl.getBoundingClientRect();
  }
  getClientRects() {
    if (!this.surfaceEl) {
      return super.getClientRects();
    }
    return this.surfaceEl.getClientRects();
  }
  render() {
    return this.renderSurface();
  }
  /**
   * Renders the positionable surface element and its contents.
   */
  renderSurface() {
    return html`
      <div
        class="menu ${classMap(this.getSurfaceClasses())}"
        style=${styleMap(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning === "popover" ? "manual" : nothing}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `;
  }
  /**
   * Renders the menu items' slot
   */
  renderMenuItems() {
    return html`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`;
  }
  /**
   * Renders the elevation component.
   */
  renderElevation() {
    return html`<md-elevation part="elevation"></md-elevation>`;
  }
  getSurfaceClasses() {
    return {
      open: this.open,
      fixed: this.positioning === "fixed",
      "has-overflow": this.hasOverflow
    };
  }
  captureKeydown(event) {
    if (event.target === this && !event.defaultPrevented && isClosableKey(event.code)) {
      event.preventDefault();
      this.close();
    }
    this.typeaheadController.onKeydown(event);
  }
  /**
   * Performs the opening animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   *
   * @return A promise that resolve to `true` if the animation was aborted,
   *     `false` if it was not aborted.
   */
  async animateOpen() {
    const surfaceEl = this.surfaceEl;
    const slotEl = this.slotEl;
    if (!surfaceEl || !slotEl)
      return true;
    const openDirection = this.openDirection;
    this.dispatchEvent(new Event("opening"));
    surfaceEl.classList.toggle("animating", true);
    const signal = this.openCloseAnimationSignal.start();
    const height = surfaceEl.offsetHeight;
    const openingUpwards = openDirection === "UP";
    const children = this.items;
    const FULL_DURATION = 500;
    const SURFACE_OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / children.length;
    const surfaceHeightAnimation = surfaceEl.animate([{ height: "0px" }, { height: `${height}px` }], {
      duration: FULL_DURATION,
      easing: EASING.EMPHASIZED
    });
    const upPositionCorrectionAnimation = slotEl.animate([
      { transform: openingUpwards ? `translateY(-${height}px)` : "" },
      { transform: "" }
    ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED });
    const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 0 }, { opacity: 1 }], SURFACE_OPACITY_DURATION);
    const childrenAnimations = [];
    for (let i = 0; i < children.length; i++) {
      const directionalIndex = openingUpwards ? children.length - 1 - i : i;
      const child = children[directionalIndex];
      const animation = child.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: ITEM_OPACITY_DURATION,
        delay: DELAY_BETWEEN_ITEMS * i
      });
      child.classList.toggle("md-menu-hidden", true);
      animation.addEventListener("finish", () => {
        child.classList.toggle("md-menu-hidden", false);
      });
      childrenAnimations.push([child, animation]);
    }
    let resolveAnimation = (value) => {
    };
    const animationFinished = new Promise((resolve) => {
      resolveAnimation = resolve;
    });
    signal.addEventListener("abort", () => {
      surfaceHeightAnimation.cancel();
      upPositionCorrectionAnimation.cancel();
      surfaceOpacityAnimation.cancel();
      childrenAnimations.forEach(([child, animation]) => {
        child.classList.toggle("md-menu-hidden", false);
        animation.cancel();
      });
      resolveAnimation(true);
    });
    surfaceHeightAnimation.addEventListener("finish", () => {
      surfaceEl.classList.toggle("animating", false);
      this.openCloseAnimationSignal.finish();
      resolveAnimation(false);
    });
    return await animationFinished;
  }
  /**
   * Performs the closing animation:
   *
   * https://direct.googleplex.com/#/spec/295000003+271060003
   */
  animateClose() {
    let resolve;
    const animationEnded = new Promise((res) => {
      resolve = res;
    });
    const surfaceEl = this.surfaceEl;
    const slotEl = this.slotEl;
    if (!surfaceEl || !slotEl) {
      resolve(false);
      return animationEnded;
    }
    const openDirection = this.openDirection;
    const closingDownwards = openDirection === "UP";
    this.dispatchEvent(new Event("closing"));
    surfaceEl.classList.toggle("animating", true);
    const signal = this.openCloseAnimationSignal.start();
    const height = surfaceEl.offsetHeight;
    const children = this.items;
    const FULL_DURATION = 150;
    const SURFACE_OPACITY_DURATION = 50;
    const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PERCENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / children.length;
    const surfaceHeightAnimation = surfaceEl.animate([
      { height: `${height}px` },
      { height: `${height * END_HEIGHT_PERCENTAGE}px` }
    ], {
      duration: FULL_DURATION,
      easing: EASING.EMPHASIZED_ACCELERATE
    });
    const downPositionCorrectionAnimation = slotEl.animate([
      { transform: "" },
      {
        transform: closingDownwards ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)` : ""
      }
    ], { duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE });
    const surfaceOpacityAnimation = surfaceEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SURFACE_OPACITY_DURATION, delay: SURFACE_OPACITY_DELAY });
    const childrenAnimations = [];
    for (let i = 0; i < children.length; i++) {
      const directionalIndex = closingDownwards ? i : children.length - 1 - i;
      const child = children[directionalIndex];
      const animation = child.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: ITEM_OPACITY_DURATION,
        delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i
      });
      animation.addEventListener("finish", () => {
        child.classList.toggle("md-menu-hidden", true);
      });
      childrenAnimations.push([child, animation]);
    }
    signal.addEventListener("abort", () => {
      surfaceHeightAnimation.cancel();
      downPositionCorrectionAnimation.cancel();
      surfaceOpacityAnimation.cancel();
      childrenAnimations.forEach(([child, animation]) => {
        animation.cancel();
        child.classList.toggle("md-menu-hidden", false);
      });
      resolve(false);
    });
    surfaceHeightAnimation.addEventListener("finish", () => {
      surfaceEl.classList.toggle("animating", false);
      childrenAnimations.forEach(([child]) => {
        child.classList.toggle("md-menu-hidden", false);
      });
      this.openCloseAnimationSignal.finish();
      this.dispatchEvent(new Event("closed"));
      resolve(true);
    });
    return animationEnded;
  }
  handleKeydown(event) {
    this.pointerPath = [];
    this.listController.handleKeydown(event);
  }
  setUpGlobalEventListeners() {
    document.addEventListener("click", this.onDocumentClick, { capture: true });
    window.addEventListener("pointerdown", this.onWindowPointerdown);
    document.addEventListener("resize", this.onWindowResize, { passive: true });
    window.addEventListener("resize", this.onWindowResize, { passive: true });
  }
  cleanUpGlobalEventListeners() {
    document.removeEventListener("click", this.onDocumentClick, {
      capture: true
    });
    window.removeEventListener("pointerdown", this.onWindowPointerdown);
    document.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("resize", this.onWindowResize);
  }
  onCloseMenu() {
    this.close();
  }
  onDeactivateItems(event) {
    event.stopPropagation();
    this.listController.onDeactivateItems();
  }
  onRequestActivation(event) {
    event.stopPropagation();
    this.listController.onRequestActivation(event);
  }
  handleDeactivateTypeahead(event) {
    event.stopPropagation();
    this.typeaheadActive = false;
  }
  handleActivateTypeahead(event) {
    event.stopPropagation();
    this.typeaheadActive = true;
  }
  handleStayOpenOnFocusout(event) {
    event.stopPropagation();
    this.stayOpenOnFocusout = true;
  }
  handleCloseOnFocusout(event) {
    event.stopPropagation();
    this.stayOpenOnFocusout = false;
  }
  close() {
    this.open = false;
    const maybeSubmenu = this.slotItems;
    maybeSubmenu.forEach((item) => {
      item.close?.();
    });
  }
  show() {
    this.open = true;
  }
  /**
   * Activates the next item in the menu. If at the end of the menu, the first
   * item will be activated.
   *
   * @return The activated menu item or `null` if there are no items.
   */
  activateNextItem() {
    return this.listController.activateNextItem() ?? null;
  }
  /**
   * Activates the previous item in the menu. If at the start of the menu, the
   * last item will be activated.
   *
   * @return The activated menu item or `null` if there are no items.
   */
  activatePreviousItem() {
    return this.listController.activatePreviousItem() ?? null;
  }
  /**
   * Repositions the menu if it is open.
   *
   * Useful for the case where document or window-positioned menus have their
   * anchors moved while open.
   */
  reposition() {
    if (this.open) {
      this.menuPositionController.position();
    }
  }
};
__decorate([
  query(".menu")
], Menu.prototype, "surfaceEl", void 0);
__decorate([
  query("slot")
], Menu.prototype, "slotEl", void 0);
__decorate([
  property()
], Menu.prototype, "anchor", void 0);
__decorate([
  property()
], Menu.prototype, "positioning", void 0);
__decorate([
  property({ type: Boolean })
], Menu.prototype, "quick", void 0);
__decorate([
  property({ type: Boolean, attribute: "has-overflow" })
], Menu.prototype, "hasOverflow", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], Menu.prototype, "open", void 0);
__decorate([
  property({ type: Number, attribute: "x-offset" })
], Menu.prototype, "xOffset", void 0);
__decorate([
  property({ type: Number, attribute: "y-offset" })
], Menu.prototype, "yOffset", void 0);
__decorate([
  property({ type: Boolean, attribute: "no-horizontal-flip" })
], Menu.prototype, "noHorizontalFlip", void 0);
__decorate([
  property({ type: Boolean, attribute: "no-vertical-flip" })
], Menu.prototype, "noVerticalFlip", void 0);
__decorate([
  property({ type: Number, attribute: "typeahead-delay" })
], Menu.prototype, "typeaheadDelay", void 0);
__decorate([
  property({ attribute: "anchor-corner" })
], Menu.prototype, "anchorCorner", void 0);
__decorate([
  property({ attribute: "menu-corner" })
], Menu.prototype, "menuCorner", void 0);
__decorate([
  property({ type: Boolean, attribute: "stay-open-on-outside-click" })
], Menu.prototype, "stayOpenOnOutsideClick", void 0);
__decorate([
  property({ type: Boolean, attribute: "stay-open-on-focusout" })
], Menu.prototype, "stayOpenOnFocusout", void 0);
__decorate([
  property({ type: Boolean, attribute: "skip-restore-focus" })
], Menu.prototype, "skipRestoreFocus", void 0);
__decorate([
  property({ attribute: "default-focus" })
], Menu.prototype, "defaultFocus", void 0);
__decorate([
  property({ type: Boolean, attribute: "no-navigation-wrap" })
], Menu.prototype, "noNavigationWrap", void 0);
__decorate([
  queryAssignedElements({ flatten: true })
], Menu.prototype, "slotItems", void 0);
__decorate([
  state()
], Menu.prototype, "typeaheadActive", void 0);

// node_modules/@material/web/menu/internal/menu-styles.js
var styles = css`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit;scrollbar-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit;scrollbar-width:inherit}.item-padding{padding-block:var(--md-menu-top-space, 8px) var(--md-menu-bottom-space, 8px)}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`;

// node_modules/@material/web/menu/menu.js
var MdMenu = class MdMenu2 extends Menu {
};
MdMenu.styles = [styles];
MdMenu = __decorate([
  customElement("md-menu")
], MdMenu);
export {
  CloseReason,
  Corner,
  FocusState,
  MdMenu
};
/*! Bundled license information:

@material/web/list/internal/list-navigation-helpers.js:
@material/web/list/internal/list-controller.js:
@material/web/menu/internal/controllers/surfacePositionController.js:
@material/web/menu/internal/controllers/typeaheadController.js:
@material/web/menu/internal/menu.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/menu.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=@material_web_menu_menu__js.js.map

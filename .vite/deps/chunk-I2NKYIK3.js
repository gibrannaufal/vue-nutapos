// node_modules/@material/web/internal/events/redispatch-event.js
function redispatchEvent(element, event) {
  if (event.bubbles && (!element.shadowRoot || event.composed)) {
    event.stopPropagation();
  }
  const copy = Reflect.construct(event.constructor, [event.type, event]);
  const dispatched = element.dispatchEvent(copy);
  if (!dispatched) {
    event.preventDefault();
  }
  return dispatched;
}

export {
  redispatchEvent
};
/*! Bundled license information:

@material/web/internal/events/redispatch-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=chunk-I2NKYIK3.js.map

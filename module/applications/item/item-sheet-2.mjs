import ItemSheet5e from "./item-sheet.mjs";
import ItemSheetV2Mixin from "./sheet-v2-mixin.mjs";
import ContextMenu5e from "../context-menu.mjs";

/**
 * V2 Item sheet implementation.
 */
export default class ItemSheet5e2 extends ItemSheetV2Mixin(ItemSheet5e) {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5e2", "sheet", "item"],
      width: 500,
      height: "auto",
      resizable: false,
      scrollY: [".tab.active"],
      elements: { effects: "dnd5e-effects" },
      legacyDisplay: false,
      contextMenu: ContextMenu5e
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    return "systems/dnd5e/templates/items/item-sheet-2.hbs";
  }

  /* -------------------------------------------- */
  /*  Event Listeners & Handlers                  */
  /* -------------------------------------------- */

  /** @inheritDoc */
  activateListeners(html) {
    super.activateListeners(html);

    for ( const control of html[0].querySelectorAll("[data-context-menu]") ) {
      control.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        const { clientX, clientY } = event;
        event.currentTarget.closest("[data-id]").dispatchEvent(new PointerEvent("contextmenu", {
          view: window, bubbles: true, cancelable: true, clientX, clientY
        }));
      });
    }
  }
}
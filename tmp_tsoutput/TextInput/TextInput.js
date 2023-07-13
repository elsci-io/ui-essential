// @ts-check
import TextInputValidityState from "./TextInputValidityState.js";
import { KeyCode, safeHtml } from "../utils.js";
export default class TextInput extends HTMLElement {
    static #INPUT_ATTRIBUTES = new Set(["autocomplete", "autofocus", "disabled", "max", "maxlength", "min", "minlength",
        "name", "pattern", "readonly", "required", "step", "type", "value"]);
    /** @type {HTMLInputElement} */
    #inputElement;
    /** @type {HTMLElement} */
    #errorElement;
    /** @type {TextInputValidityState} */
    #validityState;
    #callbacks = {
        /** @type {Function[]} */
        onTrailingIconClick: [],
        /** @type {Function[]} */
        onChangeValue: [],
        /** @type {Function[]} */
        onInput: []
    };
    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#inputElement = this.querySelector("input");
        this.#errorElement = this.querySelector(".text-input__error");
        this.#validityState = new TextInputValidityState(this.#inputElement);
        this.#fillInputAttributes();
        this.#addListeners();
        if (this.hasAttribute("value"))
            this.value = this.getAttribute("value");
    }
    disconnectedCallback() {
        // Save value to attribute, because it will be lost after element is removed from DOM and reinserted.
        // The case is happening when user adds new element to the table and then sorts it by reinserting rows.
        this.setAttribute("value", this.value);
        window.removeEventListener("visibilitychange", this.#onVisibilityChange.bind(this), { capture: true });
    }
    /**
     * Returns trimmed value of the input.
     * @returns {string}
     */
    get value() {
        return this.rawValue.trim();
    }
    /**
     * Returns raw value of the input.
     * @returns {string}
     */
    get rawValue() {
        return this.#inputElement.value;
    }
    /** @param {string | null} value */
    set value(value) {
        this.#inputElement.value = value || '';
        this.checkValidity();
    }
    checkValidity() {
        const isValid = this.#validityState.checkValidity();
        this.#errorElement.textContent = this.#validityState.errorMessage;
        return isValid;
    }
    get errorMessage() {
        return this.#errorElement.textContent;
    }
    set errorMessage(message) {
        this.#validityState.setCustomValidity(message);
        this.#errorElement.textContent = this.#validityState.errorMessage;
    }
    /** @param {Function} callback */
    onTrailingIconClick(callback) {
        this.#callbacks.onTrailingIconClick.push(callback);
    }
    /** @param {Function} callback */
    onInput(callback) {
        this.#callbacks.onInput.push(callback);
    }
    /** @param {Function} callback */
    onChangeValue(callback) {
        this.#callbacks.onChangeValue.push(callback);
    }
    /** @param {KeyboardEvent} event */
    #onKeyDown(event) {
        if (this.#inputElement.type === "number" && (event.key === KeyCode.Up || event.key === KeyCode.Down))
            event.preventDefault();
    }
    #onInput() {
        this.checkValidity();
        this.#callbacks.onInput.forEach(callback => callback(this.value));
    }
    #onChange() {
        this.#validateAndNotify();
    }
    #onTrailingIconClick() {
        this.#callbacks.onTrailingIconClick.forEach(callback => callback());
    }
    #validateAndNotify() {
        this.checkValidity();
        this.#callbacks.onChangeValue.forEach(callback => callback(this.value));
    }
    #fillInputAttributes() {
        for (const attribute of this.attributes)
            if (TextInput.#INPUT_ATTRIBUTES.has(attribute.name))
                this.#inputElement.setAttribute(attribute.name, attribute.value);
        // For number inputs, if step is not specified then it is set to 1 by default, and it is not possible to enter
        // decimal w/o validation error. So, if step is not specified, then we set it to "any" to allow decimal values.
        if (this.getAttribute("type") === "number" && !this.hasAttribute("step"))
            this.#inputElement.setAttribute("step", "any");
    }
    #addListeners() {
        this.#inputElement.addEventListener("keydown", this.#onKeyDown.bind(this));
        this.#inputElement.addEventListener("input", this.#onInput.bind(this));
        this.#inputElement.addEventListener("change", this.#onChange.bind(this));
        this.querySelector('.text-input__trailing-icon').addEventListener("click", this.#onTrailingIconClick.bind(this));
        window.addEventListener("visibilitychange", this.#onVisibilityChange.bind(this), { capture: true });
    }
    /**
     * This method is called when user:
     *  - closes the tab
     *  - closes browser window
     *  - refreshes the page
     *  - navigates to another page
     *  - navigates to another tab
     *  - minimizes the browser window
     *
     *  It is needed to blur the input element, because if it is focused, then it might be not saved to the database.
     *  Blurring the input element will trigger the change event, if the value was changed.
     *
     *  Note: If the user closes the tab or browser window, then there is no guarantee that asynchronous requests
     *  (XHR or fetch) will be sent. So, if the user closes the tab or browser window, then the value
     *  of the input element might not be saved to the database.
     */
    #onVisibilityChange() {
        if (document.activeElement === this.#inputElement)
            this.#inputElement.blur();
    }
    #htmlTemplate() {
        const trailingIconName = this.getAttribute("data-icon") || "";
        return safeHtml `<input class="text-input__input" placeholder="needed for CSS">
                <label class="text-input__label">${this.getAttribute("label")}</label>
                <i class="text-input__trailing-icon material-symbols-outlined">${trailingIconName}</i>
                <p class="text-input__error"></p>`;
    }
    static get is() {
        return 'text-input';
    }
}
window.customElements.define(TextInput.is, TextInput);

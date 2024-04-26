// @ts-check
import TextInputValidityState from "./TextInputValidityState.js";
import {isFiniteNumber, KeyCode, safeHtml} from "../utils.js"

/**
 * @typedef {import("../InputValidator.js").default} InputValidator
 */
export default class TextInput extends HTMLElement {
    static #INPUT_ATTRIBUTES = new Set(["autocomplete", "autofocus", "disabled", "max", "maxlength",
        "min", "minlength", "name", "pattern", "readonly", "step", "type", "value", "placeholder"
        /* "required" - we do not want to set attribute required when render text-input, because in this case all
        required inputs becomes red, as solution we just leave it in the root element and do this validation manually */]);
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
    /** @type {string} */
    #lastChangedValue;
    /** @type {InputValidator[]} */
    #validators = [];

    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#inputElement = this.querySelector("input");
        this.#errorElement = this.querySelector(".text-input__error");
        this.#validityState = new TextInputValidityState(this);
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

    /** @param {InputValidator} validator */
    addValidator(validator) {
        this.#validators.push(validator);
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
        this.#inputElement.value = (isFiniteNumber(value) || typeof value == "string")? value : '';
        this.#lastChangedValue = this.#inputElement.value
        this.checkValidity();
    }

    checkValidity() {
        if (!this.#validityState.checkValidity()){
            this.errorMessage = this.#validityState.errorMessage;
            return false;
        }
        this.errorMessage = this.#validityState.errorMessage;
        for (const validator of this.#validators) {
            const result = validator.validate(this, this.value);
            if (!result.isValid) {
                this.errorMessage = result.errorMessage;
                this.focus()
                return false;
            }
        }
        return true;
    }

    get errorMessage() {
        return this.#errorElement.textContent;
    }

    set errorMessage(message) {
        // We reset lastChangedValue because if the same invalid value is entered again, we want to validate this value
       if (message){
            this.#lastChangedValue = null;
        }
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

    // @ts-ignore
    focus(options) {
        this.#inputElement.focus(options)
    }

    /** @param {boolean} isDisabled */
    setDisabled(isDisabled) {
        this.toggleAttribute("disabled", isDisabled);
        this.#inputElement.toggleAttribute("disabled", isDisabled);
    }

    /** @param {KeyboardEvent} event */
    #onKeyDown(event) {
        if (this.#inputElement.type === "number" && (event.key === KeyCode.Up || event.key === KeyCode.Down))
            event.preventDefault();
        if (event.key === KeyCode.Enter && !event.repeat)
            this.#onChange();
    }

    #onInput() {
        const isValid = this.checkValidity();
        this.#callbacks.onInput.forEach(callback => callback(this.value, isValid));
    }

    #onChange() {
        // We validate if the current value is not equal to the last changed value
        if (this.#lastChangedValue !== this.value)
            this.#validateAndNotify();
    }

    #onTrailingIconClick() {
        this.#callbacks.onTrailingIconClick.forEach(callback => callback());
    }

    #validateAndNotify() {
        if (this.checkValidity()) {
            this.#lastChangedValue = this.value;
            this.#callbacks.onChangeValue.forEach(callback => callback(this.value));
        }
    }

    #fillInputAttributes() {
        for (const attribute of this.attributes)
            if (TextInput.#INPUT_ATTRIBUTES.has(attribute.name))
                this.#inputElement.setAttribute(attribute.name, attribute.value)
        // For number inputs, if step is not specified then it is set to 1 by default, and it is not possible to enter
        // decimal w/o validation error. So, if step is not specified, then we set it to "any" to allow decimal values.
        if (this.getAttribute("type") === "number" && !this.hasAttribute("step"))
            this.#inputElement.setAttribute("step", "any");
        if (this.hasAttribute("placeholder"))
            this.classList.add("placeholder-shown");
    }

    #addListeners() {
        this.#inputElement.addEventListener("keydown", this.#onKeyDown.bind(this));
        this.#inputElement.addEventListener("input", this.#onInput.bind(this));
        this.#inputElement.addEventListener("focusout", this.#onChange.bind(this));
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
        return safeHtml`<input class="text-input__input" placeholder="needed for CSS">
                <label class="text-input__label">${this.getAttribute("label")}</label>
                <i class="text-input__trailing-icon material-symbols-outlined">${trailingIconName}</i>
                <p class="text-input__error"></p>`;
    }

    static get is() {
        return 'text-input';
    }
}

// Checking, is a custom element already defined
if(!window.customElements.get(TextInput.is)){
    window.customElements.define(TextInput.is, TextInput);
}

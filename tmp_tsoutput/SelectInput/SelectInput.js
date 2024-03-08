import { KeyCode, safeHtml } from "../utils.js";
export default class SelectInput extends HTMLElement {
    #inputElement;
    #dropdownElement;
    #currentValue;
    #lastValidValue = null;
    #callbacks = {
        onShowDropdown: [],
        onChangeValue: []
    };
    get value() {
        return this.#currentValue;
    }
    set value(value) {
        this.#inputElement.value = value && value.displayName ? value.displayName : "";
        this.#currentValue = value;
    }
    set options(options) {
        this.#dropdownElement.options = options;
    }
    /** @param {function|null} comparator */
    set comparator(comparator) {
        this.#dropdownElement.comparator = comparator;
    }
    showDropdown() {
        this.#dropdownElement.show();
        this.#callbacks.onShowDropdown.forEach(callback => callback());
    }
    onShowDropdown(callback) {
        this.#callbacks.onShowDropdown.push(callback);
    }
    onChangeValue(callback) {
        this.#callbacks.onChangeValue.push(callback);
    }
    checkValidity() {
        return this.#validate();
    }
    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#inputElement = this.querySelector("text-input");
        this.#dropdownElement = this.querySelector("list-box");
        this.#addListeners();
    }
    #addListeners() {
        this.addEventListener("keydown", this.#onKeydown.bind(this));
        const input = this.#inputElement.querySelector("input");
        input.addEventListener('focus', this.#onFocus.bind(this));
        input.addEventListener("focusout", this.#onFocusout.bind(this));
        input.addEventListener("click", this.#onInputClick.bind(this));
        this.#dropdownElement.onOptionClick(this.#onOptionClick.bind(this));
    }
    #onFocus() {
        this.showDropdown();
    }
    #onFocusout() {
        this.#hideDropdownAndValidate();
    }
    #onOptionClick(option) {
        this.#inputElement.value = option.displayName;
        this.#currentValue = option;
        this.#hideDropdownAndValidate();
    }
    #onInputClick() {
        this.showDropdown();
    }
    #onKeydown(event) {
        if ([KeyCode.Up, KeyCode.Down].includes(event.code)) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        switch (event.key) {
            case KeyCode.Esc: {
                event.preventDefault();
                this.#hideDropdownAndValidate();
                this.#inputElement.focus();
                break;
            }
            case KeyCode.Enter: {
                if (this.#dropdownElement.isVisible()) {
                    event.stopPropagation();
                    if (this.#dropdownElement.hasSelectedElement())
                        this.#dropdownElement.triggerClickOnSelectedItem();
                    else
                        this.#dropdownElement.hide();
                }
                break;
            }
            case KeyCode.Down: {
                if (!this.#dropdownElement.isVisible())
                    this.#dropdownElement.show();
                this.#dropdownElement.selectNextItem();
                break;
            }
            case KeyCode.Up: {
                if (!this.#dropdownElement.isVisible())
                    this.#dropdownElement.show();
                this.#dropdownElement.selectPrevItem();
                break;
            }
        }
    }
    #hideDropdownAndValidate() {
        this.#dropdownElement.hide();
        this.#validateAndNotify();
    }
    #validateAndNotify() {
        if (this.#validate() && this.#lastValidValue !== this.value) {
            this.#lastValidValue = this.value;
            this.#callbacks.onChangeValue.forEach(callback => callback(this.value));
        }
    }
    #validate() {
        if (this.#inputElement.hasAttribute("required") && !this.#inputElement.value)
            this.#inputElement.errorMessage = "Required";
        else
            this.#inputElement.errorMessage = "";
        return this.#inputElement.checkValidity();
    }
    #htmlTemplate() {
        const requiredAttribute = this.hasAttribute("required") ? "required" : "";
        const disabledAttribute = this.hasAttribute("disabled") ? "disabled" : "";
        return safeHtml `
            <text-input
                class="text-input--select" 
                label="${this.getAttribute("label")}" 
                ${requiredAttribute}
                ${disabledAttribute}
                data-icon="arrow_drop_down"
                readonly
            ></text-input>
            <list-box></list-box>`;
    }
    static get is() {
        return 'select-input';
    }
}
// Checking, is a custom element already defined
if (!window.customElements.get(SelectInput.is)) {
    window.customElements.define(SelectInput.is, SelectInput);
}

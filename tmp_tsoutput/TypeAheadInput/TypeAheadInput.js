import '../TextInput/TextInput.js';
import '../ListBox/ListBox.js';
import { KeyCode, safeHtml } from "../utils.js";
export default class TypeAheadInput extends HTMLElement {
    /**
     * @type {TextInput}
     */
    #inputElement;
    /**
     * @type {ListBox}
     */
    #dropdownElement;
    #currentValue;
    #lastValidValue = null;
    #callbacks = {
        onChangeValue: []
    };
    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#inputElement = this.querySelector("text-input");
        this.#dropdownElement = this.querySelector("list-box");
        this.#addListeners();
    }
    get value() {
        return this.#currentValue;
    }
    set value(value) {
        this.#currentValue = value;
        this.#inputElement.value = value && value.displayName ? value.displayName : "";
    }
    /**
     * Sets the initial value of the input, as well as the last valid value.
     */
    set initialValue(value) {
        this.value = value;
        this.#lastValidValue = value;
    }
    set options(options) {
        this.#dropdownElement.options = options;
    }
    checkValidity() {
        return this.#validate() && this.#inputElement.checkValidity();
    }
    onChangeValue(callback) {
        this.#callbacks.onChangeValue.push(callback);
    }
    #onInput() {
        this.#setErrorMessage("");
        this.#filterDatalist();
        if (!this.#dropdownElement.isVisible())
            this.#dropdownElement.show();
    }
    #onFocus() {
        this.#filterDatalist();
        this.#dropdownElement.show();
    }
    #onBlur() {
        this.#hideDropdownAndValidate();
    }
    #onOptionClick(option) {
        this.value = option;
        this.#hideDropdownAndValidate();
    }
    #onClearIconClick() {
        this.value = { displayName: "" };
        this.#inputElement.querySelector('input').focus();
    }
    #onKeydown(event) {
        if ([KeyCode.Up, KeyCode.Down].includes(event.code)) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        switch (event.key) {
            case KeyCode.Esc: {
                this.#hideDropdownAndValidate();
                break;
            }
            case KeyCode.Enter: {
                if (this.#dropdownElement.isVisible())
                    if (this.#dropdownElement.hasSelectedElement())
                        this.#dropdownElement.triggerClickOnSelectedItem();
                    else
                        this.#hideDropdownAndValidate();
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
    #onInputValueChange() {
        this.#validateAndNotify();
    }
    #hideDropdownAndValidate() {
        this.#dropdownElement.hide();
        this.#validateAndNotify();
    }
    #validateAndNotify() {
        if (this.#validate() && this.#isValueChanged()) {
            this.#lastValidValue = this.value;
            this.#callbacks.onChangeValue.forEach(callback => callback(this.value));
        }
    }
    #validate() {
        const inputText = this.#inputElement.value;
        if (inputText === "") {
            this.#currentValue = null;
            return true; // assume that value is valid if it is empty, otherwise required attribute should be set
        }
        if (this.value && this.value.displayName === inputText) {
            this.#setErrorMessage("");
            return true; // assume that value is valid if it is the same as the initial value
        }
        for (const option of this.#dropdownElement.options) {
            if (option.displayName === inputText) {
                this.#setErrorMessage("");
                this.#currentValue = option;
                this.#inputElement.value = option.displayName;
                return true;
            }
        }
        this.#currentValue = null;
        this.#setErrorMessage("Select from list");
        return false;
    }
    #setErrorMessage(message) {
        this.#inputElement.errorMessage = message;
    }
    #filterDatalist() {
        this.#dropdownElement.filter = this.#inputElement.value;
    }
    #isValueChanged() {
        return this.#lastValidValue !== this.value;
    }
    #addListeners() {
        const input = this.#inputElement.querySelector("input");
        this.addEventListener("keydown", this.#onKeydown.bind(this));
        input.addEventListener("input", this.#onInput.bind(this));
        input.addEventListener("blur", this.#onBlur.bind(this));
        input.addEventListener('focus', this.#onFocus.bind(this));
        this.#inputElement.onTrailingIconClick(this.#onClearIconClick.bind(this));
        this.#inputElement.onChangeValue(this.#onInputValueChange.bind(this));
        this.#dropdownElement.onOptionClick(this.#onOptionClick.bind(this));
    }
    #htmlTemplate() {
        const requiredAttribute = this.hasAttribute("required") ? "required" : "";
        const disabledAttribute = this.hasAttribute("disabled") ? "disabled" : "";
        return safeHtml `
            <text-input 
                class="text-input--with-right-icon" 
                label="${this.getAttribute("label")}" 
                ${requiredAttribute}
                ${disabledAttribute}
                data-icon="close"
                autocomplete="off"
            ></text-input>
            <list-box></list-box>`;
    }
    static get is() {
        return 'typeahead-input';
    }
}
window.customElements.define(TypeAheadInput.is, TypeAheadInput);

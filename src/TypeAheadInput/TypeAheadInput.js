import '../TextInput/TextInput.js';
import '../ListBox/ListBox.js';
import { KeyCode, safeHtml } from "../utils.js"

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
    #shouldMatchOptions;
    #callbacks = {
        onChangeValue: []
    }

    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#inputElement = this.querySelector("text-input");
        this.#dropdownElement = this.querySelector("list-box");
        this.#shouldMatchOptions = this.hasAttribute("shouldMatchOptions")
        this.#addListeners();
    }

    get value() {
        return this.#currentValue;
    }

    get rawValue() {
        return this.#inputElement.value;
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

    /** @param {function|null} comparator */
    set comparator(comparator) {
        this.#dropdownElement.comparator = comparator;
    }

    set options(options) {
        this.#dropdownElement.options = options;
        this.#filterDatalist();
    }

    set errorMessage(message) {
        this.#inputElement.errorMessage = message;
    }

    checkValidity() {
        return this.#validate() && this.#inputElement.checkValidity();
    }

    onChangeValue(callback) {
        this.#callbacks.onChangeValue.push(callback);
    }

    /** @param {boolean} isDisabled */
    setDisabled(isDisabled) {
        this.toggleAttribute("disabled", isDisabled);
        this.#inputElement.setDisabled(isDisabled);
    }


    #onInput() {
        this.errorMessage = "";
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
        this.value = {displayName: ""};
        this.#validateAndNotify();
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
            this.errorMessage = "";
            return true; // assume that value is valid if it is the same as the initial value
        }
        if (!this.#shouldMatchOptions) {
            this.errorMessage = "";
            this.#currentValue = {displayName: inputText};
            return true; // assume that value is valid if it should not match to any option
        }
        for (const option of this.#dropdownElement.options) {
            if (option.displayName === inputText) {
                this.errorMessage = "";
                this.#currentValue = option;
                this.#inputElement.value = option.displayName;
                return true;
            }
        }
        this.#currentValue = null;
        this.errorMessage = "Select from list";
        return false;
    }

    #filterDatalist() {
        // We use attribute "nofiltering" when make filtration ourselves
        if (this.hasAttribute('nofiltering'))
            return
        this.#dropdownElement.filter = this.#inputElement.value;
    }

    #isValueChanged() {
        return this.#lastValidValue !== this.value;
    }

    #addListeners() {
        const input = this.#inputElement.querySelector("input");
        this.addEventListener("keydown", this.#onKeydown.bind(this));
        this.addEventListener("keyup", (event)=>{event.stopPropagation()});
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
        const iconName = this.hasAttribute("no-icon") ? "" : "close";
        return safeHtml`
            <text-input 
                class="text-input--with-right-icon" 
                label="${this.getAttribute("label")}" 
                ${requiredAttribute}
                ${disabledAttribute}
                data-icon="${iconName}"
                autocomplete="off"
            ></text-input>
            <list-box></list-box>`;
    }

    static get is() {
        return 'typeahead-input';
    }
}

// Checking, is a custom element already defined
if(!window.customElements.get(TypeAheadInput.is)){
    window.customElements.define(TypeAheadInput.is, TypeAheadInput);
}

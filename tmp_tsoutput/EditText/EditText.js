import { getTextWidth, KeyCode, roundToDecimalPlaces } from "../utils.js";
export default class EditText extends HTMLElement {
    #children;
    #isValid = true;
    #lastEnteredValue;
    #suffix = "";
    #prefix = "";
    #displayTextTransformer = (value) => value;
    #resizeObserver = new ResizeObserver(this.#updatePopupPosition.bind(this));
    #callbacks = {
        onChangeValue: []
    };
    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#children = {
            text: this.querySelector(".edit-text__text"),
            popup: this.querySelector(".edit-text__popup"),
            input: this.querySelector('text-input')
        };
        this.#addListeners();
        this.#resizeObserver.observe(document.body);
        this.#initAttributes();
        this.#updateTextValue();
    }
    disconnectedCallback() {
        this.#resizeObserver.unobserve(document.body);
    }
    onChange(cb) {
        this.#callbacks.onChangeValue.push(cb);
    }
    checkValidity() {
        return this.#children.input.checkValidity();
    }
    /** @param {boolean} isIncorrect */
    toggleIncorrectAttribute(isIncorrect) {
        this.toggleAttribute('incorrect', isIncorrect);
    }
    get value() {
        return this.#children.input.value;
    }
    set displayTextTransformer(f) {
        this.#displayTextTransformer = f;
    }
    #getValueAttr() {
        return this.getAttribute("value");
    }
    #getDisplayName() {
        let val = this.#displayTextTransformer(this.#getValueAttr());
        if (this.#isNumberType())
            val = +val;
        return `${this.#prefix}${val}${this.#suffix}`;
    }
    #addListeners() {
        this.#children.text.addEventListener("click", this.#showPopup.bind(this));
        this.addEventListener('mousedown', this.#onClickOutsideOfInput.bind(this));
        this.#children.popup.addEventListener('keydown', this.#onKeydown.bind(this));
        this.#children.input.onInput(this.#onInput.bind(this));
        this.addEventListener("cancel", this.#onEscape.bind(this));
    }
    #showPopup() {
        this.toggleIncorrectAttribute(false);
        this.#updateInputValue();
        this.#updatePopupPosition();
        this.#children.popup.showModal();
        this.#children.input.focus();
        this.#setInputWidth(this.#children.input, this.#children.input.rawValue);
    }
    #onInput(_, isValid) {
        this.#isValid = isValid;
    }
    #onEscape() {
        this.#children.popup.close();
    }
    #onEnter() {
        if (this.#isValid) {
            this.#children.popup.close();
            this.#updateDisplayTextAndNotifyIfChanged();
        }
    }
    #onClickOutsideOfInput(event) {
        if (event.target !== this.#children.popup)
            return;
        event.preventDefault();
        event.stopPropagation();
        this.#children.popup.close();
        if (this.#isValid)
            this.#updateDisplayTextAndNotifyIfChanged();
    }
    #updateDisplayTextAndNotifyIfChanged() {
        if (this.#getValueAttr() !== this.#children.input.value && this.#children.input.value.length) {
            this.#updateTextValue();
            this.#callbacks.onChangeValue.forEach(cb => cb(this.#getValueAttr()));
        }
        const value = this.#children.input.rawValue;
        if (value.length === 0 && !this.#children.input.hasAttribute("required")) {
            this.#setEmptyValue();
        }
        else {
            this.#lastEnteredValue = value;
            this.#children.text.toggleAttribute('empty-value', false);
        }
    }
    #setEmptyValue() {
        this.#children.text.textContent = "set";
        this.#children.text.toggleAttribute('empty-value', true);
        this.removeAttribute('value');
        this.removeAttribute('title');
    }
    #onKeydown(evt) {
        evt.stopPropagation();
        if (evt.key === KeyCode.Enter && !evt.repeat)
            this.#onEnter();
    }
    #updateInputValue() {
        if (this.hasAttribute('value')) {
            this.#lastEnteredValue = this.getAttribute("value");
            this.#children.input.value = this.#lastEnteredValue;
        }
    }
    #updateTextValue() {
        this.setAttribute("value", this.#children.input.value);
        this.setAttribute('title', this.#children.input.value);
        let value = this.#getValueAttr();
        if (typeof value === "string" && value.length > 0) {
            this.#children.text.textContent = this.#getDisplayName();
        }
        else {
            this.#setEmptyValue();
        }
    }
    #updatePopupPosition() {
        let { top, left } = this.getBoundingClientRect();
        this.#children.popup.style.top = top + window.scrollY + "px";
        this.#children.popup.style.left = left + window.scrollX + "px";
        this.#children.popup.style['max-width'] = this.offsetWidth + 16 + "px";
    }
    #isNumberType() {
        return this.getAttribute("type") === "number";
    }
    #setInputWidth(element, text) {
        const textWidth = getTextWidth(text);
        element.style.width = textWidth + 16 + "px";
    }
    #initAttributes() {
        if (this.hasAttribute("suffix"))
            this.#suffix = this.getAttribute("suffix");
        if (this.hasAttribute("prefix"))
            this.#prefix = this.getAttribute("prefix");
        this.#children.input.value = this.#getValueAttr();
        if (this.hasAttribute("scale"))
            this.displayTextTransformer = (text) => roundToDecimalPlaces(text, parseInt(this.getAttribute("scale")));
    }
    #htmlTemplate() {
        const requiredAttr = this.hasAttribute("required") ? "required" : "";
        const typeAttr = this.getAttribute("type") || "text";
        let stepAttr = "";
        if (this.hasAttribute("step"))
            stepAttr = `step="${this.getAttribute("step")}"`;
        let minAttr = "";
        if (this.hasAttribute("min"))
            minAttr = `min="${this.getAttribute("min")}"`;
        let maxAttr = "";
        if (this.hasAttribute("max"))
            maxAttr = `max="${this.getAttribute("max")}"`;
        let minLengthAttr = "";
        if (this.hasAttribute("minlength"))
            minLengthAttr = `minlength="${this.getAttribute("minlength")}"`;
        let maxLengthAttr = "";
        if (this.hasAttribute("maxlength"))
            maxLengthAttr = `maxlength="${this.getAttribute("maxlength")}"`;
        let patternAttr = "";
        if (this.hasAttribute("pattern"))
            patternAttr = `pattern="${this.getAttribute("pattern")}"`;
        return `<span class="edit-text__text"></span>
                <dialog class="edit-text__popup" tabindex="9">
                        <text-input 
                            class="text-input--with-right-icon" 
                            label="" 
                            autocomplete="off"
                            ${requiredAttr}
                            ${stepAttr}
                            ${minAttr}
                            ${maxAttr}
                            ${minLengthAttr}
                            ${maxLengthAttr}
                            ${patternAttr}
                            type="${typeAttr}"
                        ></text-input>
                </dialog>`;
    }
    static get is() {
        return 'edit-text';
    }
}
// Checking, is a custom element already defined
if (!window.customElements.get(EditText.is)) {
    window.customElements.define(EditText.is, EditText);
}

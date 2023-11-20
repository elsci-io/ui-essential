import {KeyCode} from "../utils.js";

export default class EditText extends HTMLElement {
    #children;
    #isValid = true;

    static #minChars = 6;
    static #maxChars = 10;
    static #inputRightPaddingChars = 1;
    #resizeObserver = new ResizeObserver(this.#updatePopupPosition.bind(this));

    #callbacks = {
        onChangeValue: []
    }

    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#children = {
            text: this.querySelector(".edit-text__text"),
            popup: this.querySelector(".edit-text__popup"),
            input: this.querySelector('text-input')
        };
        this.#addListeners();
        this.#resizeObserver.observe(document.body);
    }

    disconnectedCallback() {
        this.#resizeObserver.unobserve(document.body);
    }

    value() {
        return this.#children.text.textContent.trim();
    }

    onChange(cb){
        this.#callbacks.onChangeValue.push(cb);
    }

    #addListeners() {
        this.#children.text.addEventListener("click", this.#showPopup.bind(this));
        this.#children.popup.addEventListener('click', this.#onEnter.bind(this));
        this.#children.popup.addEventListener('keydown', this.#onKeydown.bind(this));
        this.#children.input.onInput(this.#onInput.bind(this));
        this.addEventListener("cancel", this.#onEscape.bind(this));
        this.querySelector(".popup-content").addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    #showPopup() {
        this.#updateInputValue();
        this.#updatePopupPosition();
        this.#updateInputWidth(this.value());
        this.#children.popup.showModal();
        this.#children.input.focus();
    }

    #onInput(value, isValid) {
        this.#updateInputWidth(value);
        this.#isValid = isValid;
    }

    #onEscape() {
        this.#children.popup.close();
    }

    #onEnter() {
        if (!this.#isValid)
            return;
        this.#closeAndNotifyOnChange();
    }

    #onKeydown(evt) {
        if (evt.key === KeyCode.Enter && !evt.repeat)
            this.#onEnter();
    }

    #closeAndNotifyOnChange() {
        this.#updateTextValue();
        this.#children.popup.close();
        this.#callbacks.onChangeValue.forEach(cb => cb(this.value()));
    }

    #updateInputValue() {
        this.#children.input.value = this.#children.text.textContent;
    }

    #updateTextValue() {
        let value = this.#children.input.value;
        if (this.#isNumberType())
            value = +value;
        this.#children.text.textContent = value;

    }

    #updatePopupPosition() {
        let {top, left} = this.getBoundingClientRect();
        this.#children.popup.style.top = top + window.scrollY + "px";
        this.#children.popup.style.left = left + window.scrollX + "px";
    }

    #updateInputWidth(value) {
        const inputWidth = Math.min(
            EditText.#maxChars,
            Math.max(
                EditText.#minChars,
                value.length + EditText.#inputRightPaddingChars)
        );
        this.#children.input.querySelector("input").style.width = inputWidth + "ch";
    }

    #isNumberType() {
        return this.getAttribute("type") === "number"
    }

    #htmlTemplate() {
        const requiredAttr = this.hasAttribute("required") ? "required" : "";
        const typeAttr = this.getAttribute("type") || "text";
        let stepAttr = "";
        if (this.hasAttribute("step"))
            stepAttr = `step="${this.getAttribute("step")}"`
        let minAttr = "";
        if (this.hasAttribute("min"))
            minAttr = `min="${this.getAttribute("min")}"`
        let maxAttr = "";
        if (this.hasAttribute("max"))
            maxAttr = `max="${this.getAttribute("max")}"`
        const value = this.getAttribute("value");
        return `<span class="edit-text__text">${value}</span>
                <dialog class="edit-text__popup" tabindex="9">
                    <section class="popup-content">
                        <text-input 
                            class="text-input--with-right-icon" 
                            label="" 
                            autocomplete="off"
                            ${requiredAttr}
                            ${stepAttr}
                            ${minAttr}
                            ${maxAttr}
                            type="${typeAttr}"
                            value="${value}"
                        ></text-input>
                    </section>
                </dialog>`;
    }

    static get is() {
        return 'edit-text';
    }
}

window.customElements.define(EditText.is, EditText);

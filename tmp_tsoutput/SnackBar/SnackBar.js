import { safeText } from "../utils.js";
export default class SnackBar {
    /**
     * SnackBar is a tiny notification displayed at the bottom of the screen. It's allowed to have only one SnackBar in
     * the same time. Creating a new SnackBar will remove the old one. Default living time is 15 sec after which
     * SnackBar disappears.
     * Properties:
     * - msgText - main text (e.g. Smth was deleted)
     * - btnText - OK button text (e.g. Undo)
     * - btnCb - function to be called when OK btn pressed
     * - ttl - aka TimeToLive in milliseconds
     */
    /** @param {string} - needed in order to be able to create multiple snackbars on a page */
    #snackBarId;
    /** @param {number} - needed in order to delete the previous timeout when a new one appears */
    #timeoutId;
    /** @param {HTMLElement} */
    #snackBarEl;
    #onButtonClickCb = () => { };
    /** @param {string} id */
    constructor(id = 'snackBar') {
        this.#snackBarId = id;
    }
    /**
     * @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop
     */
    show(prop) {
        SnackBar.#validateProperties(prop);
        this.#onButtonClickCb = prop.btnCb;
        this.#removeExistingIfNeeded();
        this.#snackBarEl = this.#createSnackBarElement(this.#snackBarId, prop);
        this.#setEventListeners();
        this.#timeoutId = setTimeout(() => {
            this.remove();
        }, prop.ttl || 15 * 1000);
    }
    #getOkButton() {
        return this.#snackBarEl.querySelector('[js-ok]');
    }
    #getCloseButton() {
        return this.#snackBarEl.querySelector('[js-close]');
    }
    #getSnackbarEl() {
        return document.getElementById(`${this.#snackBarId}`);
    }
    #removeExistingIfNeeded() {
        const existing = this.#getSnackbarEl();
        if (existing)
            existing.remove();
        if (this.#timeoutId)
            window.clearTimeout(this.#timeoutId);
    }
    #setEventListeners() {
        const okButton = this.#getOkButton();
        if (okButton) {
            okButton.addEventListener('click', () => {
                this.remove();
                this.#onButtonClickCb();
            });
        }
        const closeButton = this.#getCloseButton();
        closeButton.addEventListener('click', () => { this.remove(); });
    }
    remove() {
        this.#snackBarEl.remove();
        const containerEl = SnackBar.#getSnackBarContainerEl();
        if (containerEl.children.length === 0)
            containerEl.remove();
    }
    /**
     * @param {string} id
     * @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop
     * @return {HTMLDivElement}
     */
    #createSnackBarElement(id, prop) {
        const containerEl = SnackBar.#getSnackBarContainerEl();
        containerEl.insertAdjacentHTML("beforeend", SnackBar.#htmlTemplate(prop.msgText, prop.btnText, this.#snackBarId));
        return containerEl.lastElementChild;
    }
    /**
     * @param {string} messageText
     * @param {string?} buttonText
     * @param {string} elementId
     * @return {string}
     */
    static #htmlTemplate(messageText, buttonText, elementId) {
        return `
            <div id="${safeText(elementId)}" class="snackbar">
                <div class="snackbar__label">${safeText(messageText)}</div>
                <div class="snackbar__buttons">
                    ${buttonText ? `<button class="snackbar__button-ok" js-ok>${safeText(buttonText)}</button>` : ''}
                    <button class="snackbar__button-close material-symbols-outlined" js-close title="Close">close</button>
                </div>
            </div>`;
    }
    /** @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop */
    static #validateProperties(prop) {
        if (!prop)
            throw new Error('No SnackBar properties');
        if (!prop.msgText)
            throw new Error('Empty SnackBar message text');
        if (prop.btnText && !prop.btnCb)
            throw new Error('No callback for SnackBar button');
        if (!prop.btnText && prop.btnCb)
            throw new Error('No SnackBar button text');
        if (prop.btnCb && (typeof prop.btnCb !== "function"))
            throw new Error('Callback for SnackBar button is not a function');
        if (prop.ttl && (typeof prop.ttl !== "number"))
            throw new Error('TTL is not a number');
    }
    static #getSnackBarContainerEl() {
        let container = document.body.querySelector(".snackbar-container");
        if (!container) {
            document.body.insertAdjacentHTML("beforeend", "<div class='snackbar-container'/>");
            container = document.body.lastElementChild;
        }
        return container;
    }
}

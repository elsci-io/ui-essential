import {safeText} from "../utils.js";

export default class SnackBar {
    /** @param {string} - needed in order to be able to create multiple snackbars on a page */
    #snackBarId;
    /** @param {number} - needed in order to delete the previous timeout when a new one appears */
    #timeoutId;
    /** @param {HTMLElement} */
    #snackBarEl;

    /** @param {string} id */
    constructor(id = 'snackBar') {
        this.#snackBarId = id;
    }

    /**
     * SnackBar is a tiny notification displayed at the bottom of the screen. It's allowed to have only one SnackBar in
     * the same time. Creating a new SnackBar will remove the old one. Default living time is 15 sec after which
     * SnackBar disappears.
     * Properties:
     *  - msgText - main text (e.g. Smth was deleted)
     *  - btnText - OK button text (e.g. Undo)
     *  - btnCb - function to be called when OK btn pressed
     *  - ttl - aka TimeToLive in milliseconds
     * @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop
     */
    show(prop) {
        SnackBar.#validateProperties(prop);
        this.#removeExistingIfNeeded();
        this.#snackBarEl = this.#createSnackBarElement(this.#snackBarId, prop);
        this.#addEventListeners(prop.btnCb);
        this.#timeoutId = setTimeout(() => {
            this.#removeEl()
        }, prop.ttl || 15 * 1000);
    }

    #removeExistingIfNeeded(){
        const existing = document.getElementById(`${this.#snackBarId}`);
        if (existing)
            existing.remove();
        if (this.#timeoutId)
            window.clearTimeout(this.#timeoutId)
    }

    /** @param {Function} callback */
    #addEventListeners(callback) {
        const okButton = this.#snackBarEl.querySelector('[js-ok]');
        if (okButton) {
            okButton.addEventListener('click', () => {
                this.#removeEl();
                callback()
            })
        }
        const closeButton = this.#snackBarEl.querySelector('[js-close]');
        closeButton.addEventListener('click', () => {this.#removeEl()})
    }

    #removeEl() {
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
            <div id="${elementId}" class="snackbar">
                <div class="snackbar__label">${safeText(messageText)}</div>
                <div class="snackbar__buttons">
                    ${buttonText ? `<button class="snackbar__button-ok" js-ok>${safeText(buttonText)}</button>` : ''}
                    <button class="snackbar__button-close material-symbols-outlined" js-close title="Close">close</button>
                </div>
            </div>`
    }

    /** @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop */
    static #validateProperties(prop) {
        if (!prop) throw new Error('No SnackBar properties');
        if (!prop.msgText) throw new Error('Empty SnackBar message text');
        if (prop.btnText && !prop.btnCb) throw new Error('No callback for SnackBar button');
        if (!prop.btnText && prop.btnCb) throw new Error('No SnackBar button text');
        if (prop.btnCb && (typeof prop.btnCb !== "function")) throw new Error('Callback for SnackBar button is not a function');
        if (prop.ttl && (typeof prop.ttl !== "number")) throw new Error('TTL is not a number');
    }

    static #getSnackBarContainerEl(){
        let container = document.body.querySelector(".snackbar-menu");
        if (!container){
            document.body.insertAdjacentHTML("beforeend", "<div class='snackbar-menu'/>");
            container = document.body.lastElementChild;
        }
        return container;
    }
}

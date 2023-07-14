import {JSDOM, VirtualConsole} from "jsdom";
import XMLHttpRequest from "xhr2";
/**
 * This class is used to initialize the JSDOM environment for testing.
 * Virtual DOM will be created and initialized only once in the beginning of the first test suite.
 * The virtual DOM must be reset before each test case to avoid side effects.
 *
 * Main purpose of this class is to avoid error when it is not possible to properly initialize
 * custom elements in JSDOM environment.
 *
 * @type {JsDomUtils}
 */
export default class JsDomUtils {
    static #DEFAULT_HTML = `<!DOCTYPE html><body tabindex="0"></body></html>`;
    static #CUSTOM_ELEMENTS = {
        'text-input': '../TextInput/TextInput.js',
    };

    static #isInitialized = false;

    /**
     * @type {JSDOM}
     */
    static #dom;
    static #consoleErrors = [];

    /**
     *
     * @return {Promise<JSDOM>}
     */
    static async dom() {
        if (!this.#isInitialized) {
            await JsDomUtils.init();
        }
        return this.#dom;
    }

    static async init(html = JsDomUtils.#DEFAULT_HTML) {
        if (JsDomUtils.#isInitialized) {
            document.body.innerHTML = html;
            return;
        }
        const dom = new JSDOM(html, {url: 'http://localhost'});
        global.window = dom.window;
        global.document = dom.window.document;
        global.HTMLElement = dom.window.HTMLElement;
        global.Event = dom.window.Event;
        global.KeyboardEvent = dom.window.KeyboardEvent;
        global.MouseEvent = dom.window.MouseEvent;
        global.XMLHttpRequest = XMLHttpRequest;
        JsDomUtils.#mockGetBoundingRect();
        await JsDomUtils.#loadCustomElements();
        JsDomUtils.#isInitialized = true;
        JsDomUtils.#dom = dom;
        new VirtualConsole().on("jsdomError", e => this.#consoleErrors.push(e));
    }

    static insertHtml(html) {
        document.body.insertAdjacentHTML('beforeend', html);
        return document.body.lastElementChild;
    }

    static assertNoErrorsInConsole() {
        return JsDomUtils.#consoleErrors.length === 0;
    }

    static async #loadCustomElements() {
        await import('../src/TextInput/TextInput.js');
    }


    static #mockGetBoundingRect() {
        window.Element.prototype.getBoundingClientRect = function () {
            let width, height;
            let element = this;
            // get element width from attributes of the element or at least one of its parents
            while (!width && element && element.getAttribute) {
                width = element.getAttribute('width');
                element = element.parentNode;
            }
            element = this;
            while (!height && element && element.getAttribute) {
                height = element.getAttribute('height');
                element = element.parentNode;
            }
            return {
                width: parseFloat(width) || 0,
                height: parseFloat(height) || 0,
                top: 0,
                left: 0
            }
        }
    }
}
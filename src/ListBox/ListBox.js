import {getTextWidth, safeHtml} from "../utils.js";

export default class ListBox extends HTMLElement {
    #listElement;
    #values = [];
    #maxItemWidth = 0;
    #selectedElementIndex = -1;
    /** @type {function|null} */
    #comparator = (a, b) => a.displayName.localeCompare(b.displayName);
    #callbacks = {
        onOptionClick: []
    }
    #preventScrollFunction;

    /**
     * @returns {{displayName:string}[]}
     */
    get options() {
        return this.#values;
    }

    /**
     * @param {{displayName:string}[]}values
     */
    set options(values) {
        this.#setValues(values);
        this.innerHTML = this.#htmlTemplate();
        this.#listElement = this.querySelector("ul");
        this.#updatePosition();
        this.#addListeners();
    }

    /** @param {function|null} comparator */
    set comparator(comparator) {
        this.#comparator = comparator;
    }

    /**
     * @param {string} filter
     */
    set filter(filter) {
        const searchString = filter.toLowerCase();
        for (const li of this.querySelectorAll("li")) {
            const {displayName} = this.#values[li.dataset.index];
            const indexOf = displayName.toLowerCase().indexOf(searchString);
            li.innerHTML = this.#getMarkedText(displayName, indexOf, searchString.length);
            li.toggleAttribute('hidden', indexOf === -1);
        }
        const selectedElement = this.#getSelectedElement();
        if (selectedElement) {
            if (selectedElement.hasAttribute('hidden'))
                this.#resetCurrentSelection();
            else
                selectedElement.scrollIntoView({block: "nearest"});
        }
    }

    show() {
        document.addEventListener("wheel", this.#preventScrollFunction, {capture: true, passive: false});
        this.toggleAttribute('open', true)
        this.#updatePosition();
    }

    hide() {
        document.removeEventListener("wheel", this.#preventScrollFunction, {capture: true, passive: false});
        this.toggleAttribute('open', false)
        this.#resetCurrentSelection();
    }

    selectNextItem() {
        const visibleElements = this.#getVisibleElements();
        if (!this.hasSelectedElement()) {
            if (visibleElements.length === 0)
                return;
            this.#setSelectedElement(visibleElements[0].dataset.index);
        } else {
            const indexOf = visibleElements.indexOf(this.#getSelectedElement());
            if (visibleElements.length - 1 <= indexOf) // is last item?
                return;
            this.#setSelectedElement(visibleElements[indexOf + 1].dataset.index);
        }
    }

    selectPrevItem() {
        const visibleElements = this.#getVisibleElements();
        if (!this.hasSelectedElement()) {
            if (visibleElements.length === 0)
                return;
            this.#setSelectedElement(visibleElements[visibleElements.length - 1].dataset.index);
        } else {
            const indexOf = visibleElements.indexOf(this.#getSelectedElement());
            if (indexOf === 0) // is first item?
                return;
            this.#setSelectedElement(visibleElements[indexOf - 1].dataset.index);
        }
    }

    triggerClickOnSelectedItem() {
        if (this.hasSelectedElement())
            this.#getSelectedElement().dispatchEvent(new MouseEvent('mousedown'));
    }

    hasSelectedElement() {
        return this.#getSelectedElement() != null;
    }

    isVisible() {
        return this.hasAttribute('open')
    }

    onOptionClick(cb) {
        this.#callbacks.onOptionClick.push(cb);
    }

    connectedCallback() {
        this.innerHTML = this.#htmlTemplate();
        this.#listElement = this.querySelector("ul");
        this.#addListeners();
        // This function is needed to stop scrolling all page, except of list-box
        // Otherwise select and typeahead inputs can be scrolled, but list-box fixed in the page
        this.#preventScrollFunction = (evt)=> {
            if (!this.contains(evt.target)) {
                // When scrolling outside the list-box
                evt.stopPropagation();
                evt.preventDefault();
            } else {
                const isScrollingUp = evt.deltaY < 0;
                const isScrollingDown = evt.deltaY > 0;
                const isListScrolledToItsTop = this.#listElement.scrollTop === 0;
                const isListScrolledToItsBottom = this.#listElement.scrollTop + this.#listElement.clientHeight >= this.#listElement.scrollHeight;
                const nothingToScrollUp = isScrollingUp & isListScrolledToItsTop;
                const nothingToScrollDown = isScrollingDown & isListScrolledToItsBottom;
                if (nothingToScrollUp || nothingToScrollDown){
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            }
        };
    }

    /**
     * @param {{displayName:string}[]}values
     */
    #setValues(values) {
        if (typeof this.#comparator === "function") {
            this.#values = [...values].sort(this.#comparator);
        } else {
            this.#values = values
        }
    }

    #getVisibleElements() {
        return [...this.#listElement.querySelectorAll('li:not([hidden])')];
    }

    #addListeners() {
        this.#listElement.addEventListener("mousedown", (evt)=>{
            // When we use TypeAhead Input or Select Input in dialog and click on scroll bar, dialog takes focus
            // and list box is closed. So we need to prevent the default behavior of the mousedown event
            evt.preventDefault();
        })
        for (const li of this.querySelectorAll("li")) {
            li.addEventListener('mousedown', () => {
                const option = this.#values[li.dataset.index];
                this.#callbacks.onOptionClick.forEach(cb => cb(option));
            });
        }
    }

    #htmlTemplate() {
        return `
            <ul>
                ${this.#values.map((value, i) =>
            safeHtml`<li data-index="${i}" title="${value.title || value.displayName}">${value.displayName}</li>`
        ).join('')}
            </ul>`;
    }

    #updatePosition() {
        const parentClientRect = this.parentElement.getBoundingClientRect();
        if (this.#maxItemWidth === 0) // calculate max item width only once
            this.#maxItemWidth = Math.max(...this.#values.map(value => getTextWidth(value.displayName)), 0);
        // if parent element width is greater than max item width, set list width to parent width
        const widthToBe = Math.max(this.#maxItemWidth + 24/*paddings*/ + 22/*scrollbar*/, parentClientRect.width);
        // max allowed width is the distance from the left side of parent element to the right side of the page
        const maxAllowedWidth = document.documentElement.clientWidth - parentClientRect.left
        if (widthToBe > maxAllowedWidth) { // can't fit to the right side, so put it to the left side
            this.#listElement.style.right = 0;
        } else {
            this.#listElement.style.right = null;
        }
        this.#listElement.style.width = `${Math.min(widthToBe, document.documentElement.clientWidth)}px`;
        this.style.width = `${Math.min(widthToBe, document.documentElement.clientWidth)}px`;
        this.style.top = `${parentClientRect.top}px`;
    }

    #getSelectedElement() {
        return this.querySelector(`li[data-index="${this.#selectedElementIndex}"]`);
    }

    #setSelectedElement(elementIndex) {
        this.#resetCurrentSelection();
        this.#selectedElementIndex = elementIndex;
        const element = this.#getSelectedElement();
        element.classList.add('list-box__item--active');
        element.scrollIntoView({block: "nearest"});
    }

    #resetCurrentSelection() {
        if (this.#selectedElementIndex >= 0) {
            const selectedElement = this.#getSelectedElement();
            selectedElement.classList.remove('list-box__item--active');
            this.#selectedElementIndex = -1;
        }
    }

    #getMarkedText(text, startIndex, length) {
        if (startIndex >= 0) {
            const before = text.substring(0, startIndex);
            const match = text.substring(startIndex, startIndex + length);
            const after = text.substring(startIndex + length);
            // wrap whole text in span to prevent swallowing spaces
            return safeHtml`<span>${before}<mark>${match}</mark>${after}</span>`;
        } else {
            return text;
        }
    }

    static get is() {
        return 'list-box';
    }
}

// Checking, is a custom element already defined
if(!window.customElements.get(ListBox.is)){
    window.customElements.define(ListBox.is, ListBox);
}

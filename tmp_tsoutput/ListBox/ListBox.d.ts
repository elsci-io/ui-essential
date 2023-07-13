export default class ListBox extends HTMLElement {
    static get is(): string;
    /**
     * @param {{displayName:string}[]}values
     */
    set options(arg: {
        displayName: string;
    }[]);
    /**
     * @returns {{displayName:string}[]}
     */
    get options(): {
        displayName: string;
    }[];
    /**
     * @param {string} filter
     */
    set filter(arg: string);
    show(): void;
    hide(): void;
    selectNextItem(): void;
    selectPrevItem(): void;
    triggerClickOnSelectedItem(): void;
    hasSelectedElement(): boolean;
    isVisible(): boolean;
    onOptionClick(cb: any): void;
    connectedCallback(): void;
    #private;
}

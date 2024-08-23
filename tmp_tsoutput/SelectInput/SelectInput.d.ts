export default class SelectInput extends HTMLElement {
    static get is(): string;
    set value(arg: any);
    get value(): any;
    set options(arg: any);
    /** @param {function|null} comparator */
    set comparator(arg: Function);
    /** @param {boolean} isDisabled */
    setDisabled(isDisabled: boolean): void;
    /** @param {string} placeholderText */
    setPlaceholder(placeholderText: string): void;
    showDropdown(): void;
    onShowDropdown(callback: any): void;
    onChangeValue(callback: any): void;
    checkValidity(): any;
    connectedCallback(): void;
    #private;
}

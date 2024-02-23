export default class TextInput extends HTMLElement {
    static "__#5@#INPUT_ATTRIBUTES": Set<string>;
    static get is(): string;
    connectedCallback(): void;
    /** @param {string | null} value */
    set value(arg: string);
    /**
     * Returns trimmed value of the input.
     * @returns {string}
     */
    get value(): string;
    disconnectedCallback(): void;
    /**
     * Returns raw value of the input.
     * @returns {string}
     */
    get rawValue(): string;
    checkValidity(): boolean;
    set errorMessage(arg: string);
    get errorMessage(): string;
    /** @param {Function} callback */
    onTrailingIconClick(callback: Function): void;
    /** @param {Function} callback */
    onInput(callback: Function): void;
    /** @param {Function} callback */
    onChangeValue(callback: Function): void;
    focus(options: any): void;
    /** @param {boolean} isDisabled */
    setDisabled(isDisabled: boolean): void;
    #private;
}

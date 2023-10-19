export default class TypeAheadInput extends HTMLElement {
    static get is(): string;
    connectedCallback(): void;
    set value(arg: any);
    get value(): any;
    /**
     * Sets the initial value of the input, as well as the last valid value.
     */
    set initialValue(arg: any);
    set options(arg: any);
    set errorMessage(arg: any);
    checkValidity(): any;
    onChangeValue(callback: any): void;
    #private;
}

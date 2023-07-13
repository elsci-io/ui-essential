export default class SelectInput extends HTMLElement {
    static get is(): string;
    set value(arg: any);
    get value(): any;
    set options(arg: any);
    showDropdown(): void;
    onShowDropdown(callback: any): void;
    onChangeValue(callback: any): void;
    isValid(): any;
    connectedCallback(): void;
    #private;
}

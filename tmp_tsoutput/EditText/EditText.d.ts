export default class EditText extends HTMLElement {
    static get is(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    value(): string;
    onChange(cb: any): void;
    checkValidity(): any;
    #private;
}

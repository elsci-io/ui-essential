export default class EditText extends HTMLElement {
    static get is(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    value(): any;
    onChange(cb: any): void;
    #private;
}

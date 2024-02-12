export default class EditText extends HTMLElement {
    static get is(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    onChange(cb: any): void;
    checkValidity(): any;
    get value(): any;
    set displayTextTransformer(arg: any);
    #private;
}

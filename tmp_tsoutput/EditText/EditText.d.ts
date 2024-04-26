export default class EditText extends HTMLElement {
    static get is(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    onChange(cb: any): void;
    checkValidity(): any;
    /** @param {boolean} isIncorrect */
    toggleIncorrectAttribute(isIncorrect: boolean): void;
    /**
     * @deprecated
     * @param {InputValidator} validator
     * */
    addExternalValidator(validator: InputValidator): void;
    /** @param {InputValidator} validator */
    addValidator(validator: InputValidator): void;
    set value(arg: any);
    get value(): any;
    set displayTextTransformer(arg: any);
    #private;
}

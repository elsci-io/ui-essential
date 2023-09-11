export default class TextInputValidityState {
    constructor(textInput: any);
    get isValid(): boolean;
    get errorMessage(): string;
    checkValidity(): boolean;
    setCustomValidity(message: any): void;
    #private;
}

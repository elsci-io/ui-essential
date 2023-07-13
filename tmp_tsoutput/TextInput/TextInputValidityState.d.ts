export default class TextInputValidityState {
    constructor(inputElement: any);
    get isValid(): boolean;
    get errorMessage(): string;
    checkValidity(): boolean;
    setCustomValidity(message: any): void;
    #private;
}

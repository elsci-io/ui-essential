export default class ValidationResult {
    /**
     * @param {boolean} isValid
     * @param {string} errorMessage
     */
    constructor(isValid: boolean, errorMessage: string);
    _isValid: boolean;
    _errorMessage: string;
    get isValid(): boolean;
    get errorMessage(): string;
    #private;
}

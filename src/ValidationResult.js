export default class ValidationResult {
    /** @type {boolean} */
    #isValid;
    /** @type {string} */
    #errorMessage;

    /**
     * @param {boolean} isValid
     * @param {string} errorMessage
     */
    constructor(isValid, errorMessage) {
        this.#isValid = isValid;
        this.#errorMessage = errorMessage;
        this._isValid = isValid;
        this._errorMessage = errorMessage;
    }

    get isValid() {
        return this._isValid;
    }

    get errorMessage() {
        return this._errorMessage;
    }
}
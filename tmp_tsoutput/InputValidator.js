import ValidationResult from "./ValidationResult.js";
export default class InputValidator {
    /** @type {function} */
    #validatingFunction;
    /** @type {string} */
    #errorMessage;
    /**
     * @param {function} validationFunction
     * @param {string} errorMessage
     */
    constructor(validationFunction, errorMessage) {
        this.#validatingFunction = validationFunction;
        this.#errorMessage = errorMessage;
    }
    /**
     * @param {EditText} inputEl
     * @param {*} valueToValidate
     * @return {ValidationResult}
     */
    validate(inputEl, valueToValidate) {
        return this.#validatingFunction(inputEl, valueToValidate)
            ? new ValidationResult(true, "")
            : new ValidationResult(false, this.#errorMessage);
    }
}

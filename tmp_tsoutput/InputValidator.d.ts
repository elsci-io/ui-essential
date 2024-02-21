export default class InputValidator {
    /**
     * @param {function} validationFunction
     * @param {string} errorMessage
     */
    constructor(validationFunction: Function, errorMessage: string);
    /**
     * @param {EditText} inputEl
     * @param {*} valueToValidate
     * @return {ValidationResult}
     */
    validate(inputEl: EditText, valueToValidate: any): ValidationResult;
    #private;
}
import ValidationResult from "./ValidationResult.js";

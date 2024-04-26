export default class InputValidator {
    /**
     * @param {function} validationFunction
     * @param {string} errorMessage
     */
    constructor(validationFunction: Function, errorMessage: string);
    /**
     * @param {TextInput} inputEl
     * @param {*} valueToValidate
     * @return {ValidationResult}
     */
    validate(inputEl: TextInput, valueToValidate: any): ValidationResult;
    #private;
}
import ValidationResult from "./ValidationResult.js";

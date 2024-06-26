export default class TextInputValidityState {
	#textInput;
	#inputElement;
	#isValid;
	#errorMessage;

	constructor(textInput) {
		this.#textInput = textInput
		this.#inputElement = textInput.querySelector('input');
		this.#isValid = true;
		this.#errorMessage = "";
	}

	get isValid() {
		return this.#isValid;
	}

	get errorMessage() {
		return this.#errorMessage;
	}

	checkValidity() {
		// reset custom validity
		this.setCustomValidity("");
		this.#inputElement.checkValidity();
		// if the input element is valid, then check custom validity
		let validity = this.#inputElement.validity;
		if (validity.valid) {
			validity = this.#getCustomValidity();
		}
		this.#isValid = validity.valid;
		this.#errorMessage = this.#getValidationMessage(validity);
		return this.isValid;
	}

	setCustomValidity(message) {
		this.#inputElement.setCustomValidity(message);
		this.#isValid = this.#inputElement.validity.valid;
		this.#errorMessage = message;
	}

	/**
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
	 * Here we add our own validation steps, and update the validity state properties.
	 *  - valueMissing: if the input element is required and the trimmed text is empty (contains only whitespaces).
	 *  - rangeUnderflow: if the input element is a number and the value is less than the min attribute.
	 *  - rangeOverflow: if the input element is a number and the value is greater than the max attribute.
	 */
	#getCustomValidity() {
		const {badInput, customError, patternMismatch, typeMismatch, valid, rangeOverflow, rangeUnderflow, tooLong,
			tooShort, valueMissing, stepMismatch} = this.#inputElement.validity;
		const cv = Object.assign({},
			{badInput, customError, patternMismatch, typeMismatch, valid, rangeOverflow, rangeUnderflow, tooLong,
				tooShort, valueMissing, stepMismatch},
			this.#isBlanknessConstraintViolated(),
			this.#isRangeConstraintViolated(),
			this.#isStepConstraintViolated()
		);
		cv.valid = !cv.valueMissing && !cv.rangeUnderflow && !cv.rangeOverflow && !cv.stepMismatch;
		return cv;
	}

	/**
	 * Checks if the input element is required and the trimmed text is empty (contains only whitespaces).
	 * @returns {{valueMissing: (*|boolean)}}
	 */
	#isBlanknessConstraintViolated() {
		const trimmedText = this.#inputElement.value.trim();
		return {valueMissing: this.#textInput.hasAttribute("required") && trimmedText === ""};
	}

	/**
	 * This is a workaround for the fact that the browser does not validate decimals properly. It takes only
	 * first 18 digits of the decimal number and then compares it with the min and max attributes.
	 * So if the min attribute is 0 and the value is -0.0000000000000000001, then the browser will not
	 * consider it as a range underflow (after conversion it becomes -0 => 0).
	 * This is why we have to check the value manually.
	 */
	#isRangeConstraintViolated() {
		if (this.#inputElement.type !== "number")
			return {rangeUnderflow: false, rangeOverflow: false};
		const {min, max, value} = this.#inputElement;
		return {rangeUnderflow: (min !== "" && +value < +min), rangeOverflow: (max !== "" && +value > +max)};
	}

	/**
	 * This method serves to supplement internal validation to determine whether a float qualifies as an integer.
	 * The internal validation for an input type="number" step="1" doesn't consistently cover all cases.
	 * For example, the number 2.00000001 might be considered an integer by the internal validator.
	 * So we are using attribute 'number-type="integer"'
	 * The aim is to widen this validation range. Now, the comparison for an integer works correctly when a number
	 * has no more than 16 digits. However, if a number has 17 digits or more, this function returns incorrect result.
	 *
	 * We use StepMismatch property because internal validation writes this error to this property
	 * StepMismatch property of a ValidityState object indicates if the value of an <input>, after having been edited
	 * by the user, does not conform to the constraints set by the element's step attribute.
	 *
	 * @return {{stepMismatch: boolean}}
	 */
	#isStepConstraintViolated() {
		if (this.#inputElement.type !== "number")
			return {stepMismatch: false};
		const numberType = this.#textInput.getAttribute('number-type');
		if (!numberType || numberType !== "integer")
			return {stepMismatch: false};
		const stepMismatch =  !Number.isInteger(this.#inputElement.valueAsNumber);
		return {stepMismatch: stepMismatch};
	}

	#getValidationMessage(validityState) {
		const isTypeNumber = this.#inputElement.type === "number";
		const {badInput, rangeOverflow, rangeUnderflow, tooLong, tooShort, valueMissing, stepMismatch} = validityState;
		if (isTypeNumber && badInput)
			return "Invalid number";
		if (isTypeNumber && stepMismatch) {
			if (this.#inputElement.step === "1" ){
				// Here we checked floats because if step is 1, then the value must be an integer.
				// Now we can use attribute 'number-type="integer"', but we have previously written inputs,
				// that's why don't want to remove this code
				return "Must be an integer";
			}
			const numberType = this.#textInput.getAttribute('number-type');
			if (numberType && numberType === "integer") {
				return "Must be an integer";
			}
		}
		if (rangeOverflow)
			return "Greater than " + this.#inputElement.max;
		if (rangeUnderflow)
			return "Less than " + this.#inputElement.min;
		if (tooLong)
			return "Max length is " + this.#inputElement.maxLength;
		if (tooShort)
			return "Min length is " + this.#inputElement.minLength;
		if (!badInput && valueMissing)
			return "Required";
		return this.#inputElement.validationMessage;
	}
}
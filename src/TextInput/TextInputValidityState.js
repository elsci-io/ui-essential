export default class TextInputValidityState {
	#inputElement;
	#isValid;
	#errorMessage;

	constructor(inputElement) {
		this.#inputElement = inputElement;
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
		const cv = Object.assign({},
			this.#inputElement.validity,
			this.#isBlanknessConstraintViolated(),
			this.#isRangeConstraintViolated()
		);
		cv.valid = !cv.valueMissing && !cv.rangeUnderflow && !cv.rangeOverflow;
		return cv;
	}

	/**
	 * Checks if the input element is required and the trimmed text is empty (contains only whitespaces).
	 * @returns {{valueMissing: (*|boolean)}}
	 */
	#isBlanknessConstraintViolated() {
		const trimmedText = this.#inputElement.value.trim();
		return {valueMissing: this.#inputElement.hasAttribute("required") && trimmedText === ""};
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

	#getValidationMessage(validityState) {
		const isTypeNumber = this.#inputElement.type === "number";
		const {badInput, rangeOverflow, rangeUnderflow, tooLong, tooShort, valueMissing, stepMismatch} = validityState;
		if (isTypeNumber && badInput)
			return "Invalid number";
		if (isTypeNumber && stepMismatch && this.#inputElement.step === "1") {
			// Here we validate only floats because if step is 1, then the value must be an integer.
			return "Must be an integer";
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
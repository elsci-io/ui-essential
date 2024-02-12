export const KeyCode = Object.freeze({
    "Shift": "ShiftLeft",
    "Esc": "Escape",
    "Enter": "Enter",
    "Up": "ArrowUp",
    "Down": "ArrowDown"
});
/**
 * @param {string} unsafe
 * @returns {string}
 */
export const safeText = (unsafe) => {
    if (!unsafe)
        return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
/**
 * To be used when generating HTML via string interpolation e.g. {@code safeHtml`<div>${variables}</div>`} -
 * these variables will go through this function and have to be escaped should such string be shown on UI.
 *
 * @param {TemplateStringsArray} strings
 * @param {string[]} values
 * @returns {string}
 */
export const safeHtml = (strings, ...values) => {
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
        result += safeText(String(values[i]));
        result += strings[i + 1];
    }
    return result;
};
/* @param {String} text */
export function getTextWidth(text) {
    const span = document.createElement("span");
    document.body.appendChild(span);
    span.textContent = text;
    span.style.fontSize = '1rem';
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    const width = Math.ceil(span.getBoundingClientRect().width) + 1;
    span.remove();
    return width;
}
function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}
export function isFiniteNumber(value) {
    if (typeof value !== 'undefined' && Number.isFinite(value)) {
        return true;
    }
    else
        return false;
}
/**
 * Function that rounds a number to a specified number of decimal places.
 * @param {number} number
 * @param {number} decimalPlaces
 * @return {number}
 */
export function roundToDecimalPlaces(number, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(number * multiplier) / multiplier;
}

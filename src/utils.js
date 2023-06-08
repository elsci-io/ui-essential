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
        return ''
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

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
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

export function getCanvasFont(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

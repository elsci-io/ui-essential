/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export function getTextWidth(text: string, font: string): any;
export function getCanvasFont(el?: HTMLElement): string;
export const KeyCode: Readonly<{
    Shift: "ShiftLeft";
    Esc: "Escape";
    Enter: "Enter";
    Up: "ArrowUp";
    Down: "ArrowDown";
}>;
export function safeText(unsafe: string): string;
export function safeHtml(strings: TemplateStringsArray, ...values: string[]): string;

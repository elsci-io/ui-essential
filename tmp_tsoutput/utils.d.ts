export function getTextWidth(text: any): number;
export function isFiniteNumber(value: any): boolean;
/**
 * Function that rounds a number to a specified number of decimal places.
 * @param {number} number
 * @param {number} decimalPlaces
 * @return {number}
 */
export function roundToDecimalPlaces(number: number, decimalPlaces: number): number;
export const KeyCode: Readonly<{
    Shift: "ShiftLeft";
    Esc: "Escape";
    Enter: "Enter";
    Up: "ArrowUp";
    Down: "ArrowDown";
}>;
export function safeText(unsafe: string): string;
export function safeHtml(strings: TemplateStringsArray, ...values: string[]): string;

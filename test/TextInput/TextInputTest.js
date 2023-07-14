import assert from "assert"
import JsDomUtils from "../JsDomUtils.js";

describe('Text Input', () => {
    beforeEach(async () => {
        await JsDomUtils.init(`<!DOCTYPE html><body tabindex="0"><text-input></text-input></body></html>`);
    });
    it('sets number', () => {
        const textInput = sut(3)
        assert.strictEqual(textInput.value, "3")
    });
    it('sets 0', () => {
        const textInput = sut(0);
        assert.strictEqual(textInput.value, "0")
    });
    it('sets string', () => {
        const textInput = sut('abc');
        assert.strictEqual(textInput.value, "abc")
    });
    it('sets null value as empty string', () => {
        const textInput = sut(null);
        assert.strictEqual(textInput.value, "")
    });
    it('sets undefined value as empty string', () => {
        const textInput = sut();
        assert.strictEqual(textInput.value, "")
    })
})

function sut(value) {
    const textInput = document.querySelector('text-input');
    textInput.value = value;
    return textInput
}
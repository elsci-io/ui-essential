import assert from "assert"
import JsDomUtils from "../JsDomUtils.js";

describe('TextInput', () => {
    beforeEach(async () => {
        await JsDomUtils.init();
    });
    describe('attributes', () => {
        describe('label', () => {
            it('should set label text', () => {
                const element = JsDomUtils.insertHtml(`<text-input label="Some label"></text-input>`);
                assert.strictEqual(element.querySelector('label').textContent, 'Some label');
            });
            it('does not propagate label attribute to input element', async () => {
                const element = JsDomUtils.insertHtml(`<text-input label="Some label"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('label'), null);
            });
        });
        describe('placeholder', () => {
            it('has no effect to label', () => {
                const element = JsDomUtils.insertHtml(`<text-input label="Some label" placeholder="Some placeholder"></text-input>`);
                assert.strictEqual(element.querySelector('label').textContent, 'Some label');
            });
        });
        describe('value', () => {
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
            });
            it('sets value through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input value="Some value"></text-input>`);
                assert.strictEqual(element.value, 'Some value');
            });
            it('sets value through setter', () => {
                const element = JsDomUtils.insertHtml(`<text-input></text-input>`);
                element.value = 'Some value';
                assert.strictEqual(element.value, 'Some value');
            });
        });
        describe('type', () => {
            it('sets type through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input type="number"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('type'), 'number');
            });
        });
        describe('required', () => {
            it('sets required through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input required></text-input>`);
                assert.ok(element.querySelector('input').hasAttribute('required'));
            });
        });
        describe('readonly', () => {
            it('sets readonly through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input readonly></text-input>`);
                assert.ok(element.querySelector('input').hasAttribute('readonly'));
            });
        });
        describe('disabled', () => {
            it('sets disabled through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input disabled></text-input>`);
                assert.ok(element.querySelector('input').hasAttribute('disabled'));
            });
        });
        describe('minlength', () => {
            it('sets minlength through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input minlength="5"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('minlength'), '5');
            });
        });
        describe('maxlength', () => {
            it('sets maxlength through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input maxlength="5"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('maxlength'), '5');
            });
        });
        describe('min', () => {
            it('sets min through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input min="5"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('min'), '5');
            });
        });
        describe('max', () => {
            it('sets max through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input max="5"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('max'), '5');
            });
        });
        describe('pattern', () => {
            it('sets pattern through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input pattern="\\d+"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('pattern'), '\\d+');
            });
        });
        describe('step', () => {
            it('sets step through attribute', () => {
                const element = JsDomUtils.insertHtml(`<text-input step="5"></text-input>`);
                assert.strictEqual(element.querySelector('input').getAttribute('step'), '5');
            });
        });

    });
    describe('validation', () => {
        it('should be valid when value is empty and not required', () => {
            const element = JsDomUtils.insertHtml(`<text-input></text-input>`);
            assert.ok(element.checkValidity());
        });
        it('should not be valid when value is empty and required', () => {
            const element = JsDomUtils.insertHtml(`<text-input required></text-input>`);
            assert.ok(!element.checkValidity());
        });
        it('should show custom message when number is less than min', () => {
            const element = JsDomUtils.insertHtml(`<text-input type="number" min="5" value="4"></text-input>`);
            assert.ok(!element.checkValidity());
            assert.strictEqual(element.errorMessage, 'Less than 5');
        });
        it('should show custom message when number is greater than max', () => {
            const element = JsDomUtils.insertHtml(`<text-input type="number" max="5" value="6"></text-input>`);
            assert.ok(!element.checkValidity());
            assert.strictEqual(element.errorMessage, 'Greater than 5');
        });
        it('allows float numbers if step is not specified', () => {
            const element = JsDomUtils.insertHtml(`<text-input type="number" value="3.141592"></text-input>`);
            assert.ok(element.checkValidity());
        });
        it('should not be valid when value is float, but step=1', () => {
            const element = JsDomUtils.insertHtml(`<text-input type="number" step="1"></text-input>`);
            element.value = 3.141592
            assert.ok(!element.checkValidity());
            assert.strictEqual(element.errorMessage, 'Must be an integer');
        });
    });
});

function sut(value) {
    const textInput = document.querySelector('text-input');
    textInput.value = value;
    return textInput
}
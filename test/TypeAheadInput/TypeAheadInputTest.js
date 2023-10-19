import assert from "assert"
import JsDomUtils from "../JsDomUtils.js";

describe('TypeAheadInput', () => {
    beforeEach(async () => {
        await JsDomUtils.init();
    });
    describe('validation', () => {
        it('should be valid when matching to the one of options is not necessary', () => {
            const element = JsDomUtils.insertHtml(`<typeahead-input></typeahead-input>`);
            element.options = [
                {displayName: "NaOH"}
            ];
            element.querySelector('text-input').value = "NaCl";
            assert.ok(element.checkValidity());
        });
        it('should not be valid when if value does not match to any of options', () => {
            const element = JsDomUtils.insertHtml(`<typeahead-input shouldMatchOptions></typeahead-input>`);
            element.options = [
                {displayName: "NaOH"}
            ];
            element.querySelector('text-input').value = "NaCl";
            assert.ok(!element.checkValidity());
        });
    });
});
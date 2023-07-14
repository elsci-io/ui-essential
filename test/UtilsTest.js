import {isFiniteNumber} from '../src/utils.js'
import assert from "assert";
describe("Utils", () => {
    it('return true when value is finite number', () => {
        assert.strictEqual(isFiniteNumber(3), true)
    });
    it('return true when value is 0', () => {
        assert.strictEqual(isFiniteNumber(0), true)
    });
    it('return false when value is undefined', () => {
        assert.strictEqual(isFiniteNumber(undefined), false)
    });
    it('return false when value is null', () => {
        assert.strictEqual(isFiniteNumber(null), false)
    });
    it('return false when value is infinity', () => {
        assert.strictEqual(isFiniteNumber(infinity), false)
    })
})

const infinity = 1/0;
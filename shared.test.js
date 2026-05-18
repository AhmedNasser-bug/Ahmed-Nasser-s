const { test, describe } = require('node:test');
const assert = require('node:assert');
const { getRandomInt } = require('./shared.js');

describe('getRandomInt', () => {
  test('returns an integer within the specified range [min, max]', () => {
    const min = 1;
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(min, max);
      assert.strictEqual(Number.isInteger(result), true, `Expected ${result} to be an integer`);
      assert.ok(result >= min, `Expected ${result} to be >= ${min}`);
      assert.ok(result <= max, `Expected ${result} to be <= ${max}`);
    }
  });

  test('includes both min and max in the output', () => {
    const min = 0;
    const max = 1;
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomInt(min, max));
    }
    assert.ok(results.has(min), `Expected results to include min (${min})`);
    assert.ok(results.has(max), `Expected results to include max (${max})`);
  });

  test('handles equal min and max', () => {
    const val = 5;
    assert.strictEqual(getRandomInt(val, val), val);
  });

  test('handles negative numbers', () => {
    const min = -10;
    const max = -1;
    const result = getRandomInt(min, max);
    assert.ok(result >= min && result <= max);
  });

  test('handles float inputs by rounding', () => {
    // min 1.5 -> ceil -> 2
    // max 4.5 -> floor -> 4
    // range [2, 4]
    const min = 1.5;
    const max = 4.5;
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(min, max);
      assert.ok(result >= 2 && result <= 4, `Expected ${result} to be between 2 and 4`);
    }
  });
});

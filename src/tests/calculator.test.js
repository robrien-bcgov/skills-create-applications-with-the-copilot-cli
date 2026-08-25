/**
 * calculator.test.js
 *
 * Unit tests for the calculator's four basic arithmetic operations:
 * addition, subtraction, multiplication, and division.
 *
 * The primary examples (2 + 3, 10 - 4, 45 * 2, 20 / 5) come from
 * images/calc-basic-operations.png, with additional cases covering
 * negatives, decimals, and edge cases like division by zero.
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5 (example from calc-basic-operations.png)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds two positive numbers', () => {
    expect(add(10, 15)).toBe(25);
  });

  test('adds negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds a positive and a negative number', () => {
    expect(add(-5, 8)).toBe(3);
  });

  test('adds decimal numbers', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test('adds with zero', () => {
    expect(add(0, 7)).toBe(7);
  });
});

describe('subtract', () => {
  test('10 - 4 = 6 (example from calc-basic-operations.png)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts two positive numbers', () => {
    expect(subtract(20, 8)).toBe(12);
  });

  test('subtracts to produce a negative result', () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test('subtracts decimal numbers', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test('subtracts zero', () => {
    expect(subtract(9, 0)).toBe(9);
  });
});

describe('multiply', () => {
  test('45 * 2 = 90 (example from calc-basic-operations.png)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies two positive numbers', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test('multiplies by zero', () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test('multiplies negative numbers', () => {
    expect(multiply(-4, 5)).toBe(-20);
    expect(multiply(-4, -5)).toBe(20);
  });

  test('multiplies decimal numbers', () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe('divide', () => {
  test('20 / 5 = 4 (example from calc-basic-operations.png)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divides resulting in a decimal', () => {
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test('divides negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test('dividing zero by a number returns zero', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate (operator dispatch)', () => {
  test.each([
    [2, '+', 3, 5],
    [10, '-', 4, 6],
    [45, '*', 2, 90],
    [45, 'x', 2, 90],
    [45, 'X', 2, 90],
    [20, '/', 5, 4],
  ])('calculate(%p, %p, %p) === %p', (a, operator, b, expected) => {
    expect(calculate(a, operator, b)).toBe(expected);
  });

  test('throws an error for an unsupported operator', () => {
    expect(() => calculate(5, '%', 2)).toThrow(/Unsupported operator/);
  });

  test('propagates division by zero error through calculate', () => {
    expect(() => calculate(5, '/', 0)).toThrow('Division by zero is not allowed.');
  });
});

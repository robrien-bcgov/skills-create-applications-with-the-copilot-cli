#!/usr/bin/env node
/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic arithmetic
 * operations, matching the four operator keys on the calculator image:
 *   + (addition)
 *   - (subtraction)
 *   x or * (multiplication)
 *   / (division)
 *
 * Usage:
 *   node src/calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node src/calculator.js 5 + 3   -> 8
 *   node src/calculator.js 10 - 4  -> 6
 *   node src/calculator.js 6 x 7   -> 42
 *   node src/calculator.js 20 / 4  -> 5
 */

/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides the first number by the second.
 * Throws an error if dividing by zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} a / b
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/**
 * Performs the requested arithmetic operation on two numbers.
 * @param {number} a - The first operand.
 * @param {string} operator - One of '+', '-', 'x', '*', '/'.
 * @param {number} b - The second operand.
 * @returns {number} The result of the operation.
 */
function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
    case 'X':
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      throw new Error(
        `Unsupported operator "${operator}". Use one of: +, -, x, /`
      );
  }
}

/**
 * Parses CLI arguments, runs the calculation, and prints the result.
 * Exits with a non-zero status code and an error message on invalid input.
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number1> <operator> <number2>');
    console.error('Operators supported: + - x /');
    process.exitCode = 1;
    return;
  }

  const [rawA, operator, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Both operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(a, operator, b);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

// Only run the CLI when this file is executed directly (not when imported).
if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, calculate };

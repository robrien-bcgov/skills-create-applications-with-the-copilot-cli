#!/usr/bin/env node
/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting arithmetic operations:
 *   + (addition)
 *   - (subtraction)
 *   x or * (multiplication)
 *   / (division)
 *   % (modulo)
 *   ** (exponentiation)
 *   sqrt (square root — takes one operand)
 *
 * Usage:
 *   node src/calculator.js <number1> <operator> <number2>
 *   node src/calculator.js sqrt <number>
 *
 * Examples:
 *   node src/calculator.js 5 + 3    -> 8
 *   node src/calculator.js 10 - 4   -> 6
 *   node src/calculator.js 6 x 7    -> 42
 *   node src/calculator.js 20 / 4   -> 5
 *   node src/calculator.js 10 % 3   -> 1
 *   node src/calculator.js 2 ** 8   -> 256
 *   node src/calculator.js sqrt 9   -> 3
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
 * Returns the remainder of dividing the first number by the second.
 * Throws an error if the divisor is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} a % b
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

/**
 * Raises the base to the given exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number} base ** exponent
 */
function exponentiate(base, exponent) {
  return base ** exponent;
}

/**
 * Returns the square root of a non-negative number.
 * Throws an error if the number is negative.
 * @param {number} a
 * @returns {number} Math.sqrt(a)
 */
function squareRoot(a) {
  if (a < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(a);
}

/**
 * Performs the requested arithmetic operation on two numbers.
 * @param {number} a - The first operand.
 * @param {string} operator - One of '+', '-', 'x', '*', '/', '%', '**', 'sqrt'.
 * @param {number} [b] - The second operand (not used for 'sqrt').
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
    case '%':
      return modulo(a, b);
    case '**':
      return exponentiate(a, b);
    case 'sqrt':
      return squareRoot(a);
    default:
      throw new Error(
        `Unsupported operator "${operator}". Use one of: +, -, x, /, %, **, sqrt`
      );
  }
}

/**
 * Parses CLI arguments, runs the calculation, and prints the result.
 * Exits with a non-zero status code and an error message on invalid input.
 *
 * Supports two call forms:
 *   node src/calculator.js <number1> <operator> <number2>
 *   node src/calculator.js sqrt <number>
 */
function main() {
  const args = process.argv.slice(2);

  // Handle unary sqrt: sqrt <number>
  if (args.length === 2 && args[0].toLowerCase() === 'sqrt') {
    const a = Number(args[1]);
    if (Number.isNaN(a)) {
      console.error('The operand must be a valid number.');
      process.exitCode = 1;
      return;
    }
    try {
      console.log(squareRoot(a));
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
    return;
  }

  if (args.length !== 3) {
    console.error('Usage: node src/calculator.js <number1> <operator> <number2>');
    console.error('       node src/calculator.js sqrt <number>');
    console.error('Operators supported: + - x / % ** sqrt');
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

module.exports = { add, subtract, multiply, divide, modulo, exponentiate, squareRoot, calculate };

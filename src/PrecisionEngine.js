/**
 * Object-Oriented Engine: Encapsulates arithmetic precision & restoration rules.
 * DSA Complexity: Time O(1) | Space O(1)
 */
export class PrecisionEngine {
  static process(rawNumerator, rawDenominator, precisionDigits = 2) {
    const num = Number(rawNumerator);
    const den = Number(rawDenominator);

    if (isNaN(num) || isNaN(den)) {
      throw new Error('Please enter valid numeric values.');
    }

    if (den === 0) {
      throw new Error('Division by zero is mathematically undefined.');
    }

    const rawDivision = num / den;

    if (!isFinite(rawDivision)) {
      throw new Error('Operation produced an infinite or overflow value.');
    }

    const formattedDivision = rawDivision.toFixed(precisionDigits);
    const restoredResult = Math.round(parseFloat(formattedDivision) * den);

    return {
      originalNumerator: num,
      originalDenominator: den,
      divisionDisplay: formattedDivision,
      restoredResult: restoredResult,
    };
  }
}
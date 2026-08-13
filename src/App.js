import React, { useState } from 'react';
import './App.css';

/**
 * OOP Module: PrecisionEngine
 * Encapsulates math operations, precision scaling, and validation rules.
 */
class PrecisionEngine {
  static calculateAndRevert(numerator, denominator, precision = 2) {
    const num = Number(numerator);
    const den = Number(denominator);

    if (isNaN(num) || isNaN(den)) {
      throw new Error('Please enter valid numeric inputs.');
    }

    if (den === 0) {
      throw new Error('Division by zero is undefined.');
    }

    const divisionVal = num / den;

    if (!isFinite(divisionVal)) {
      throw new Error('Result exceeded valid numeric boundaries.');
    }

    // Precision Display Formatter
    const divisionDisplay = divisionVal.toFixed(precision);

    // Exact Mathematical Reversion Engine
    const restoredResult = Math.round(parseFloat(divisionDisplay) * den);

    return {
      originalNumerator: num,
      originalDenominator: den,
      divisionDisplay,
      restoredResult,
    };
  }
}

function App() {
  const [formData, setFormData] = useState({ numerator: '100', denominator: '3' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const calculation = PrecisionEngine.calculateAndRevert(
        formData.numerator,
        formData.denominator
      );
      setResult(calculation);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Reversible Precision Calculator</h2>
        <p className="subtitle">Company Assessment Project</p>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="numerator">First Value (Numerator)</label>
            <input
              id="numerator"
              name="numerator"
              type="number"
              step="any"
              value={formData.numerator}
              onChange={handleInputChange}
              placeholder="e.g. 100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="denominator">Divide By (Denominator)</label>
            <input
              id="denominator"
              name="denominator"
              type="number"
              step="any"
              value={formData.denominator}
              onChange={handleInputChange}
              placeholder="e.g. 3"
              required
            />
          </div>

          <button type="submit">Calculate & Revert</button>
        </form>

        {error && <div className="error-box">{error}</div>}

        {result && (
          <div className="result-card">
            <h3>Results</h3>
            <div className="result-row">
              <span>Division ({result.originalNumerator} ÷ {result.originalDenominator}):</span>
              <strong>{result.divisionDisplay}</strong>
            </div>
            <div className="result-row highlight">
              <span>Multiplied Back ({result.divisionDisplay} × {result.originalDenominator}):</span>
              <strong>{result.restoredResult}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
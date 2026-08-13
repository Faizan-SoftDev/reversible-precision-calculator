import React, { useState } from 'react';
import { PrecisionEngine } from './PrecisionEngine';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ numerator: '100', denominator: '3' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      // OOP Abstraction: Delegates math logic to PrecisionEngine
      const calculationResult = PrecisionEngine.process(
        formData.numerator,
        formData.denominator
      );
      setResult(calculationResult);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Reversible Precision Calculator</h2>
        <p className="subtitle">Company Assessment Project</p>

        <form onSubmit={handleCalculate}>
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
import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({ numerator: '100', denominator: '3' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const num = Number(inputs.numerator);
    const den = Number(inputs.denominator);

    if (isNaN(num) || isNaN(den)) {
      setError('Please enter valid numeric values.');
      return;
    }

    if (den === 0) {
      setError('Denominator cannot be zero.');
      return;
    }

    const divisionVal = num / den;

    if (!isFinite(divisionVal)) {
      setError('Calculation resulted in an invalid number.');
      return;
    }

    // 2 Decimal places display
    const formattedDivision = divisionVal.toFixed(2);
    // Exact Reversion Logic
    const restoredVal = Math.round(parseFloat(formattedDivision) * den);

    setResult({
      originalNumerator: num,
      originalDenominator: den,
      divisionDisplay: formattedDivision,
      restoredResult: restoredVal,
    });
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
              value={inputs.numerator}
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
              value={inputs.denominator}
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
const express = require('express');
const cors = require('cors');

const app = express();

// Enable Cross-Origin Requests from React (localhost:3000)
app.use(cors());
app.use(express.json());

// Healthcheck route to test in browser
app.get('/', (req, res) => {
  res.send('Calculator Backend is Running!');
});

// Calculation Endpoint
app.post('/api/calculate', (req, res) => {
  const { numerator, denominator } = req.body;

  const num = parseFloat(numerator);
  const den = parseFloat(denominator);

  if (isNaN(num) || isNaN(den)) {
    return res.status(400).json({ error: 'Please enter valid numeric values.' });
  }

  if (den === 0) {
    return res.status(400).json({ error: 'Division by zero is undefined.' });
  }

  const rawQuotient = num / den;
  const displayQuotient = rawQuotient.toFixed(2);
  const restoredResult = rawQuotient * den;

  return res.json({
    originalNumerator: num,
    originalDenominator: den,
    divisionDisplay: displayQuotient,
    restoredResult: restoredResult
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server successfully running on http://localhost:${PORT}`);
});
const { json } = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
const expensesRouter = require('./controllers/expenses');

// app.use(express.static('./'));
app.use('/api/expenses',expensesRouter);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}.`);
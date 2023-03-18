const expensesRouter = require('express').Router();
const testItems = [
    {
        "name": "AT&T Fiber Internet Service",
        "amount": 81.50
    },
    {
        "name": "Southern California Edison Electric",
        "amount": 75.95
    }
]

// returns all
expensesRouter.get('/', (request, response) => {
    response.json(testItems);
});

module.exports = expensesRouter;
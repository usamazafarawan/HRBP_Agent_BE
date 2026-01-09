import express from 'express';
const router = express.Router();
import * as controller from './expenses.controller';


router.post('/add', controller.addExpense);
router.get('/get-list', controller.getExpenses);
router.delete('/delete-expense/:id', controller.deleteExpense);
router.get('/get-expense-by-id/:id', controller.getExpenseById);
router.put('/update-expense/:id', controller.updateExpense);







export = router


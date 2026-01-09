import express from 'express';
const router = express.Router();
import * as controller from './parents_account.controller';


router.post('/add-purchase', controller.addPurchase);
router.post('/add-payment', controller.addPayment);
router.get("/get-detail/:parentId", controller.getParentAccountDetails);
router.put("/update-transaction", controller.updateTransactionRecord);
router.put("/delete-transaction", controller.deleteTransactionRecord);







export = router


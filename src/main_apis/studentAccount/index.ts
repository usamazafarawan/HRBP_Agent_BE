import express from 'express';
const router = express.Router();
import * as controller from './studentAccount.controller';


// router.post('/', controller.createStudentAdmissionRecord);
router.get('/getList',controller.getListOfStudentsForAccounts);
router.post('/createRecord/:studentId',controller.createTableForStudentAccount);
router.post('/addAmount/:studentId',controller.addAmountToRecord);
router.post('/receivedAmount/:studentId',controller.receivedAmount);
router.post('/updateMonthyFee/',controller.upadteStudentsCurrentMonthFee);



// router.delete('/deleteStudentRecord/:id', controller.deleteStudentRecord);
// router.put('/updateStudentRecord', controller.updateStudentRecord);



// router.post('/login',controller.loginValidation)
// // router.put('/',  controller.npaAccept);
// router.get('/get', controller.getRecord);

// router.delete('/delete/:id', controller.deleteRecord);

// router.put('/put/:id',controller.updateRecord)


export = router


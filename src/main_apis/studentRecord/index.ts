import express from 'express';
const router = express.Router();
import * as controller from './studentRecord.controller';


router.post('/', controller.createStudentAdmissionRecord);
router.get('/getList',controller.getListOfStudents);
router.get('/getStudentListforSiblings',controller.getStudentsForSiblings);

router.delete('/deleteStudentRecord/:id', controller.deleteStudentRecord);
router.put('/updateStudentRecord', controller.updateStudentRecord);



// router.post('/login',controller.loginValidation)
// // router.put('/',  controller.npaAccept);
// router.get('/get', controller.getRecord);

// router.delete('/delete/:id', controller.deleteRecord);

// router.put('/put/:id',controller.updateRecord)


export = router


import express from 'express';
const router = express.Router();
import * as controller from './students.controller';


router.post('/create', controller.createStudentAdmissionRecord);
router.get('/getAllStudents', controller.getAllStudentsWithParents);
router.get('/getClassStudents', controller.getClassStudents);
router.get('/get-student-details/:studentId', controller.getStudentDetailsById);
router.put('/update-parent-student-record', controller.updateParentAndStudentRecord);
router.put('/delete-student-account', controller.deleteStudentAccount);






export = router


import express from 'express';
const router = express.Router();
import * as controller from './message.controller';


router.post('/create', controller.createStudentAdmissionRecord);







export = router


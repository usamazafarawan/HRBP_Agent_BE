import express from 'express';
const router = express.Router();
import * as controller from './uploadFeeStrucDoc.controller';



router.get('/getfile',controller.getFile);
router.post('/', controller.uploadFile);
router.delete('/deletefile', controller.deleteFeeStructureFile);

// // router.put('/',  controller.npaAccept);
// router.get('/get', controller.getRecord);


// router.put('/put/:id',controller.updateRecord)


export = router


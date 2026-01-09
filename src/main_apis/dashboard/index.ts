import express from 'express';
const router = express.Router();
import * as controller from './dashboard.controller';


router.get("/get-dashboard-data", controller.getDashboardData);







export = router


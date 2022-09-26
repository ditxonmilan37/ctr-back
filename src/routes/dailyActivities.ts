import { Router } from "express";
const router: Router = Router();

import {
    setActivities,
    getActivitiesAll,
    getActivitiesAllExcel,
    getActivitiesReport
} from '../controllers/dailyActivities';

router.post("/activities/save", setActivities);
router.get("/activities/listAll", getActivitiesAll);
router.get("/activities/listAllExcel", getActivitiesAllExcel);
router.get("/activities/report", getActivitiesReport);

export default router;
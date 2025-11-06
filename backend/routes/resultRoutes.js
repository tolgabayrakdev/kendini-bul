import express from "express";
import * as resultController from "../controllers/resultController.js";

const router = express.Router();

router.post("/submit", resultController.submitTest);
router.get("/token/:token", resultController.getResultByToken);
router.get("/stats/:testId", resultController.getTestStatistics);

export default router;


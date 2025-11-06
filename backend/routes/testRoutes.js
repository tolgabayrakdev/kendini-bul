import express from "express";
import * as testController from "../controllers/testController.js";

const router = express.Router();

router.get("/", testController.getAllTests);
router.get("/popular", testController.getPopularTests);
router.get("/random", testController.getRandomTest);
router.get("/category/:category", testController.getTestsByCategory);
router.get("/:id", testController.getTestById);

export default router;


import express from "express";
import appController from "../controllers/appController.js";
import asyncHandler from "../middleware/asyncWrapper.js";
const router = express.Router();
router.get("/", asyncHandler(appController.getPage));
// router.post("/shorten");
export default router;

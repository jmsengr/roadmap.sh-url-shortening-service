import express from "express";
import appController from "../controllers/appController.js";
import asyncHandler from "../middleware/asyncWrapper.js";

const router = express.Router();

router.get("/", asyncHandler(appController.getPage));

router.get("/test", (req, res, next) => res.json({ data: "Test message!" }));

router.post("/shorten", asyncHandler(appController.postUrl));

router.get("/shorten/:code", asyncHandler(appController.getOriginalUrl));

router.delete("/shorten/:code", asyncHandler(appController.deleteShortUrl));

router.get("/shorten/:code/stats", asyncHandler(appController.getUrlStatistics));

export default router;

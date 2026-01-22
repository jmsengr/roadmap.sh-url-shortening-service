import type { Request, Response, NextFunction } from "express";
import appService from "../services/appService.js";

const getPage = async (req: Request, res: Response, next: NextFunction) => {
	res.render("app.ejs");
};

const postUrl = async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = await appService.createShortUrl(req);

	if (!serviceResponse.success) {
		return res.status(400).json(serviceResponse);
	}

	return res.status(201).json(serviceResponse);
};

const getOriginalUrl = async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = await appService.getOriginalUrl(req);

	if (!serviceResponse.success) {
		return res.status(400).json(serviceResponse);
	}

	const originalUrl: string | undefined = serviceResponse.data?.url;

	if (!originalUrl) {
		return res.status(404).json({ success: false, error: "Link does not exist" });
	}

	return res.status(200).redirect(originalUrl);
};

export default { getPage, postUrl, getOriginalUrl };

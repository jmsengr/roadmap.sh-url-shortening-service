import type { Request, Response, NextFunction } from "express";
import appService from "../services/appService.js";

const getPage = async (req: Request, res: Response, next: NextFunction) => {
	res.render("app.ejs");
};

const postUrl = async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = await appService.createShortUrl(req);
};

export default { getPage };

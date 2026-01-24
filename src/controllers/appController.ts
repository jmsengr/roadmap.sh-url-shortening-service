import type { Request, Response, NextFunction } from "express";
import appService from "../services/appService.js";

const getPage = async (req: Request, res: Response, next: NextFunction) => {
	res.render("app.ejs");
};

const postUrl = async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = await appService.createShortUrl(req);

	switch (serviceResponse.type) {
		case 'failure':
			return res.status(400).json({ success: false, error: serviceResponse.error });
		case 'create':
			return res.status(201).json({ success: true, data: serviceResponse.data });
		case 'read':
			return res.status(200).json({ success: true, data: serviceResponse.data });
	}
};

const getOriginalUrl = async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = await appService.getOriginalUrl(req);

	switch (serviceResponse.type) {
		case 'failure':
			return res.status(404).json({ success: false, error: serviceResponse.error });
		case 'read':
			const originalUrl: string = serviceResponse.data.url;
			return res.status(200).redirect(originalUrl);
	}

};

const updateShortUrl = async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = await appService.updateShortUrl(req);

	switch (serviceResponse.type) {
		case 'failure':
			return res.status(400).json({ success: false, error: serviceResponse.error });
		case 'update':
			return res.status(201).json({ success: true, data: serviceResponse.data });
	}
};

const deleteShortUrl = async (req: Request, res: Response, next: NextFunction) => {};

const getUrlStatistics = async (req: Request, res: Response, next: NextFunction) => {};

export default { getPage, postUrl, getOriginalUrl };

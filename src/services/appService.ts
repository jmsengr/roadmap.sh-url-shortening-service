import type { Request } from "express";

const createShortUrl = async (req: Request) => {
	const { url } = req.body;

	console.log(url);
};

export default { createShortUrl };

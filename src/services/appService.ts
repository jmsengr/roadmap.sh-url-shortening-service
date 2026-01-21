import type { Request } from "express";

const createShortUrl = async (req: Request) => {
	const { url } = req.body;
};

export default { createShortUrl };

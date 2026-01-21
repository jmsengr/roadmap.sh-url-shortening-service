import type { Request } from "express";
import prisma from "../database/prisma.js";

const createShortUrl = async (req: Request) => {
	const { url } = req.body;

	// const shortenUrl = await prisma.url.create
};

export default { createShortUrl };

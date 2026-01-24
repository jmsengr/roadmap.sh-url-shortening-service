import type { Request } from "express";
import prisma from "../database/prisma.js";
import { generateCode } from "../utils/utils.js";
import type ServiceResponse from "../types/serviceResponse.js";

const createShortUrl = async (req: Request): Promise<ServiceResponse<{ url: string; shortCode: string }>> => {
	const { url } = req.body;

	const stored_url = await prisma.url.findFirst({
		where: { url: url },
	});

	if (stored_url) {
		return {
			statusCode: 201,
			success: true,
			data: {
				url: stored_url.url,
				shortCode: stored_url.shortCode,
			},
		};
	}

	// Creates new code key
	let new_code: string = generateCode();
	while (await prisma.url.findFirst({ where: { shortCode: new_code } })) {
		new_code = generateCode();
	}

	const shortenUrl = await prisma.url.create({
		data: {
			url: url,
			shortCode: new_code,
			createdAt: new Date(),
			updatedAt: new Date(),
			accessCount: 0,
		},
	});

	return {
		statusCode: 200,
		success: true,
		data: {
			url: shortenUrl.url,
			shortCode: shortenUrl.shortCode,
		},
	};
};

const getOriginalUrl = async (req: Request): Promise<ServiceResponse<{ url: string; shortCode: string }>> => {
	const { code } = req.params;

	const stored_url = await prisma.url.findFirst({
		where: { shortCode: code as string },
	});

	if (!stored_url) {
		return { statusCode: 404, success: false, error: "The shortened url is not found or expired" };
	}

	return {
		statusCode: 200,
		success: true,
		data: {
			url: stored_url.url,
			shortCode: stored_url.shortCode,
		},
	};
};

const updateShortUrl = async (req: Request): Promise<ServiceResponse<{ url: string; shortCode: string }>> => {
	const { code } = req.params;
	const { url } = req.body;

	const stored_url = await prisma.url.findFirst({ where: { shortCode: code as string } });

	if (!stored_url) {
		return { success: false, error: `${code} code for shortened url does not exists, cannot update` };
	}

	const updatedShortenedUrl = await prisma.url.update({
		where: { shortCode: code as string },
		data: {
			url: url,
			updatedAt: new Date(),
		},
	});

	return {
		success: true,
		data: {
			url: updatedShortenedUrl.url,
			shortCode: updatedShortenedUrl.shortCode,
		},
	};
};

export default { createShortUrl, getOriginalUrl, updateShortUrl };

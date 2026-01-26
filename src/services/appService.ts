import type { Request } from "express";
import prisma from "../database/prisma.js";
import { generateCode } from "../utils/utils.js";
import type ServiceResponse from "../types/serviceResponse.js";
import axios from "axios";
import { access } from "node:fs";

const createShortUrl = async (req: Request): Promise<ServiceResponse<{ url: string; shortCode: string }>> => {
    const { url } = req.body;

    // Validate URL reachability
    const valid_site = await axios
        .get(url)
        .then(() => true)
        .catch(() => false);

    if (!valid_site) {
        return {
            type: "failure",
            error: "The provided URL is not reachable. Please provide a valid URL.",
        };
    }

    const stored_url = await prisma.url.findFirst({
        where: { url: url },
    });

    // URL Already exists
    if (stored_url) {
        await prisma.url.update({
            where: { shortCode: stored_url.shortCode },
            data: {
                updatedAt: new Date(),
                accessCount: stored_url.accessCount + 1,
            },
        });

        return {
            type: "read",
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
        type: "create",
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
        return {
            type: "failure",
            error: "The shortened url is not found or expired",
        };
    }

    await prisma.url.update({
        where: { shortCode: code as string },
        data: {
            accessCount: stored_url.accessCount + 1,
            updatedAt: new Date(),
        },
    });

    return {
        type: "read",
        data: {
            url: stored_url.url,
            shortCode: stored_url.shortCode,
        },
    };
};

const updateShortUrl = async (req: Request): Promise<ServiceResponse<{ url: string; shortCode: string }>> => {
    const { code } = req.params;
    const { url } = req.body;

    const stored_url = await prisma.url.findFirst({
        where: { shortCode: code as string },
    });

    if (!stored_url) {
        return {
            type: "failure",
            error: `${code} code for shortened url does not exists, cannot update`,
        };
    }

    const updatedShortenedUrl = await prisma.url.update({
        where: { shortCode: code as string },
        data: {
            url: url,
            updatedAt: new Date(),
            accessCount: stored_url.accessCount + 1,
        },
    });

    return {
        type: "update",
        data: {
            url: updatedShortenedUrl.url,
            shortCode: updatedShortenedUrl.shortCode,
        },
    };
};

const deleteShortUrl = async (req: Request): Promise<ServiceResponse<null>> => {
    const { code } = req.params;

    const stored_url = await prisma.url.findFirst({
        where: { shortCode: code as string },
    });

    if (!stored_url) {
        return {
            type: "failure",
            error: `${code} code for shortened url does not exists, cannot delete`,
        };
    }

    await prisma.url.delete({ where: { shortCode: code as string } });

    return {
        type: "delete",
        data: null,
    };
};

const getUrlStatistics = async (
    req: Request,
): Promise<ServiceResponse<{ originalUrl: string; shortenUrl: string; accessCount: number }>> => {
    const { code } = req.params;

    const stored_url = await prisma.url.findFirst({
        where: { shortCode: code as string },
    });

    if (!stored_url) {
        return {
            type: "failure",
            error: `Statistics for url code ${code} not found`,
        };
    }

    return {
        type: "read",
        data: {
            originalUrl: stored_url.url,
            shortenUrl: `http://localhost:3000/shorten/${stored_url.shortCode}`,
            accessCount: Number(stored_url.accessCount),
        },
    };
};

export default {
    createShortUrl,
    getOriginalUrl,
    updateShortUrl,
    deleteShortUrl,
    getUrlStatistics,
};

import prisma from "../database/prisma.js";
import { generateCode } from "../utils/utils.js";
const createShortUrl = async (req) => {
    const { url } = req.body;
    const stored_url = await prisma.url.findFirst({
        where: { url: url },
    });
    // URL Already exists
    if (stored_url) {
        return {
            type: 'read',
            data: {
                url: stored_url.url,
                shortCode: stored_url.shortCode,
            },
        };
    }
    // Creates new code key
    let new_code = generateCode();
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
        type: 'create',
        data: {
            url: shortenUrl.url,
            shortCode: shortenUrl.shortCode,
        },
    };
};
const getOriginalUrl = async (req) => {
    const { code } = req.params;
    const stored_url = await prisma.url.findFirst({
        where: { shortCode: code },
    });
    if (!stored_url) {
        return { type: 'failure', error: "The shortened url is not found or expired" };
    }
    return {
        type: 'read',
        data: {
            url: stored_url.url,
            shortCode: stored_url.shortCode,
        },
    };
};
const updateShortUrl = async (req) => {
    const { code } = req.params;
    const { url } = req.body;
    const stored_url = await prisma.url.findFirst({ where: { shortCode: code } });
    if (!stored_url) {
        return { type: 'failure', error: `${code} code for shortened url does not exists, cannot update` };
    }
    const updatedShortenedUrl = await prisma.url.update({
        where: { shortCode: code },
        data: {
            url: url,
            updatedAt: new Date(),
        },
    });
    return {
        type: 'update',
        data: {
            url: updatedShortenedUrl.url,
            shortCode: updatedShortenedUrl.shortCode,
        },
    };
};
export default { createShortUrl, getOriginalUrl, updateShortUrl };

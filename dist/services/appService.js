import prisma from "../database/prisma.js";
import { generateCode } from "../utils/utils.js";
const createShortUrl = async (req) => {
    const { url } = req.body;
    const stored_url = await prisma.url.findFirst({
        where: { url: url },
    });
    if (stored_url) {
        return { success: false, error: "URL already exists" };
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
        success: true,
        data: {
            url: shortenUrl.url,
            shortCode: shortenUrl.shortCode,
        },
    };
};
export default { createShortUrl };

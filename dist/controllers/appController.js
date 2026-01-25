import appService from "../services/appService.js";
const getPage = async (req, res, next) => {
    res.render("app.ejs");
};
const postUrl = async (req, res, next) => {
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
const getOriginalUrl = async (req, res, next) => {
    const serviceResponse = await appService.getOriginalUrl(req);
    switch (serviceResponse.type) {
        case 'failure':
            return res.status(404).json({ success: false, error: serviceResponse.error });
        case 'read':
            const originalUrl = serviceResponse.data.url;
            return res.status(200).redirect(originalUrl);
    }
};
const updateShortUrl = async (req, res, next) => {
    const serviceResponse = await appService.updateShortUrl(req);
    switch (serviceResponse.type) {
        case 'failure':
            return res.status(400).json({ success: false, error: serviceResponse.error });
        case 'update':
            return res.status(201).json({ success: true, data: serviceResponse.data });
    }
};
const deleteShortUrl = async (req, res, next) => { };
const getUrlStatistics = async (req, res, next) => { };
export default { getPage, postUrl, getOriginalUrl };

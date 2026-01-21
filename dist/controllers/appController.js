import appService from "../services/appService.js";
const getPage = async (req, res, next) => {
    res.render("app.ejs");
};
const postUrl = async (req, res, next) => {
    const serviceResponse = await appService.createShortUrl(req);
    if (false) {
        res.status(400).json({});
    }
    res.status(201).json({});
};
export default { getPage, postUrl };

const getPage = async (req, res, next) => {
    res.render("app.ejs");
};
export default { getPage };

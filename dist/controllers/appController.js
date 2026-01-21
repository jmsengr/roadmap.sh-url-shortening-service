const getPage = async (req, res, next) => {
    res.render("../views/main.ejs");
};
export default { getPage };

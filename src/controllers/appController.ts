import type { Request, Response, NextFunction } from "express";

const getPage = async (req: Request, res: Response, next: NextFunction) => {
	res.render("../views/main.ejs");
};

export default { getPage };

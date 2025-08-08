import type { NextFunction, Request, Response } from "express";
import 'dotenv/config';
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        // console.log("Req.body : ", req.body)
        const adminUserName = process.env.ADMIN_USERNAME
        const adminPassword = process.env.ADMIN_PASSWORD

        if (adminPassword != password || adminUserName != username) {
            return res.status(400).json({ message: "Inavlid username or Password", status: false })
        }
        if (adminPassword === password && adminUserName === username) next();




    } catch (error) {
        console.error(error);

    }
}
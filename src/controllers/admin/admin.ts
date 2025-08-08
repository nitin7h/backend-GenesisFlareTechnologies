import type { Request, Response } from "express";
import { Lead } from "../../model/lead.js";

export const adminLeads = async (req: Request, res: Response) => {

    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        // console.log("Admin Shows All leads : ", leads)
        res.status(200).json(leads)

    } catch (error) {
        res.status(400).json({ message: "Try Again Later", status: false })
    }
}
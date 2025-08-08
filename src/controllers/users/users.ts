import type { Request, Response } from "express";

import { Lead } from "../../model/lead.js";

import { sendMail } from "../../services/mailService.js";

export const home = (req: Request, res: Response) => {
    res.send("Hello From Server 👌")

}

export const leadData = async (req: Request, res: Response) => {
    // const data = req.body
    // console.log("Lead Data : ", data)
    try {

        const isUserExist = await Lead.findOne({ email: req.body.email })
        if (isUserExist) {
            console.log("❌ Email already exist!")
            return res.status(400).send({ message: "Email already exist", status: false })
        }
        //save data
        const lead = new Lead(req.body);
        await lead.save();
        console.log("✅ Lead submitted successfully!")


        //send mail 
        // const status = await sendMail(req.body)
        // console.log("status : ", status)

        res.status(200).json({ message: 'Lead submitted successfully!', status: true });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(400).json({ error: err.message, status: false });
        } else {
            res.status(500).json({ error: 'Unknown error occurred', status: false });
        }
    }

}



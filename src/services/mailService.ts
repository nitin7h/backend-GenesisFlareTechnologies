
import nodemailer from "nodemailer"

interface DataInterface {
    name: string;
    email: string;
    phone: number;
    businessType: string;
    message: string;



}
export const sendMail = async (data: DataInterface) => {




    try {
        const { name, email, phone, businessType, message } = data;
        // Setup transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Growly" <${process.env.EMAIL_USER}>`,
            to: "to: hr@geneisisflare.com", // hr email
            subject: "New Demo Request from Growly Landing Page",
            html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully 👍")

        return true
    } catch (err) {
        console.error("Email error 🤷‍♂️ : ", err);
        return false

    }
}


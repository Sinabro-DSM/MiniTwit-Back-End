import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname + "../../../.env") });

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL || "",
    pass: process.env.PASSWORD || "",
  },
});

export const setMailOption = (to, emailCode): object => {
  const mailOption = {
    from: process.env.EMAIL || "",
    to,
    subject: "Minitwit mail auth",
    text: emailCode,
  };
  return mailOption;
};

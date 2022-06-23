/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import {createTransport, SentMessageInfo, Transporter} from "nodemailer";
import {config} from "firebase-functions";

export class Email {
  mailTransport: Transporter<SentMessageInfo>;
  sendEmail: (
    from: string,
    to: string,
    bcc: string,
    subject: string,
    bodyHTML: string,
  ) => Promise<any>;
  constructor() {
    const userEmail = config().configuration.email;
    const passwordEmail = config().configuration.password;
    this.mailTransport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      tls: {rejectUnauthorized: false},
      auth: {
        user: userEmail,
        pass: passwordEmail,
      },
    });

    this.sendEmail = (from, to, bcc, subject, bodyHTML) => {
      const mailOptions = {
        from: from,
        to: to,
        bcc: bcc,
        subject,
        html: bodyHTML,
      };

      return this.mailTransport.sendMail(mailOptions);
    };
  }
}

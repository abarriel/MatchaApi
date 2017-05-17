import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apimatcha42@gmail.com',
    pass: 'funpasswordmatcha',
  }
});

const mailOptions = {
  from: 'matchaapp@gmail.com',
};

export const sendMail = (who, sub, message) => {
  const info = {
    to: who,
    subject: sub,
    text: message,
  }
  const options = Object.assign(mailOptions, info);
  transport.sendMail(options);
};

export const sendsMail = (to, send) => {
  transport.sendMail(Object.assign(mailOptions, to, send));
};

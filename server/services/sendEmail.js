const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transport = nodemailer.createTransport({
  service: 'gmail',
  hots: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'email.server.workhome@gmail.com',
    pass: 'uwccklzcsptbssoo',
  },
});

const sendEmail = (
  receiver = 'vladimis@amdocs.com',
  subject = 'Test Email',
  content = 'Email Content'
) => {
  //console.log('process.cwd(): ', process.cwd());

  ejs.renderFile(
    path.resolve('views/templates/email/index.ejs'),
    { receiver, content },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: 'beba@gmail.com',
          to: receiver,
          subject: subject,
          html: data,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
      }
    }
  );
};

module.exports = {
  sendEmail,
};

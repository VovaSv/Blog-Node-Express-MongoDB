const nodemailer = require('nodemailer');
const ejs = require('ejs');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email.server.workhome@gmail.com',
    pass: 'w8xzE6QEwJLE4Tgb',
  },
});

const sendEmail = (
  receiver = 'vladimis@amdocs.com',
  subject = 'Test Email',
  content = 'Email Content'
) => {
  ejs.renderFile(
    '/views/templates/email/index.ejs',
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

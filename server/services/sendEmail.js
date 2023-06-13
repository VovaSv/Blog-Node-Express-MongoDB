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
  receiverEmail = 'vladimis@amdocs.com',
  subject = 'This is a Email Verification From My Heart',
  content = 'Eto tebe pizdiuk bil poslan etot Email, but dobr proverit ego...',
  receiverName = 'Pizdiuk'
) => {
  //console.log('process.cwd(): ', process.cwd());

  ejs.renderFile(
    path.resolve('views/templates/email/index.ejs'),
    { receiver, content, receiverName },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: 'beba@gmail.com',
          to: `${receiverEmail}, vladimis@amdocs.com, palkin.andrew@gmail.com`,
          subject: subject,
          html: data,
          attachments: [
            // String attachment
            {
              filename: 'notes.txt',
              content: 'This is very secured info from My Heaer',
              contentType: 'text/plain', // optional, would be detected from the filename
            },
          ],
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

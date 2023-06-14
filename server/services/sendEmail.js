const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  hots: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'email.server.workhome@gmail.com',
    pass: 'uwccklzcsptbssoo',
  },
});

// Create a function to render the email body
const renderEmailBody = async (receiverName, content, confirmationCode) => {
  const data = { receiverName, content, confirmationCode };
  const html = await ejs.renderFile(
    path.resolve('views/templates/email/index.ejs'),
    data
  );
  return html;
};

// Create a function to create a mail instance
const createMail = (receiverEmail, subject = 'Default Email Subject', html) => {
  return {
    from: 'pupsik@gmail.com',
    to: `${receiverEmail}, vladimis@amdocs.com, palkin.andrew@gmail.com`,
    subject: subject,
    html,
    attachments: [
      // String attachment
      {
        filename: 'notes.txt',
        content: 'This is very secured info from My Heart',
        contentType: 'text/plain', // optional, would be detected from the filename
      },
    ],
  };
};

// Create a function to send the email
const sendEmail = async (
  receiverName,
  receiverEmail,
  subject,
  content,
  confirmationCode
) => {
  // Create a new mail instance
  const html = await renderEmailBody(receiverName, content, confirmationCode);

  const mail = createMail(receiverEmail, subject, html);

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    throw err;
  }
};

/*
const sendEmail = (
  receiverEmail = 'vladimis@amdocs.com',
  subject = 'This is a Email Verification From My Heart',
  content = 'Eto tebe pizdiuk bil poslan etot Email, but dobr proverit ego...',
  receiverName = 'Pizdiuk'
) => {
  //console.log('process.cwd(): ', process.cwd());

  ejs.renderFile(
    path.resolve('views/templates/email/index.ejs'),
    { content, receiverName },
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
              content: 'This is very secured info from My Heart',
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
*/
module.exports = {
  sendEmail,
};

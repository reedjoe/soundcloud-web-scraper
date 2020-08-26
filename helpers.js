const cheerio = require('cheerio');
const aws = require('aws-sdk');

const ses = new aws.SES({region: 'eu-west-2'});
const emailAddress = process.env.EMAIL_ADDRESS;
let $;

function getUpdatedStatus (html) {
    $ = cheerio.load(html, { xmlMode: true });
    const lastUpdatedDate = $('time').first().text().trim();
    return lastUpdatedDate.includes(new Date().toISOString().split('T')[0]);
}

function getLatestSongName () {
    return $('h2 ~ article > h2 > a').first().text().trim();
}

async function sendUpdateEmail(message) {
    var params = {
        Destination: {
            ToAddresses: [emailAddress]
        },
        Message: {
            Body: {
            Html: { Data: message }
            },
            Subject: { Data: "Smooth 4000 Web Scraper Update" }
        },
        Source: emailAddress,
        Tags: [
            {
              Name: 'source', /* required */
              Value: 'AWS' /* required */
            },
            /* more items */
        ]
    };
  
    try {
        const data = await ses.sendEmail(params).promise()
        return data
      } catch (err) {
        console.log(err);
        return err
      }
}
  
module.exports = {
    getUpdatedStatus,
    getLatestSongName,
    sendUpdateEmail
};
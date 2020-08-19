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

function sendUpdateEmail(message) {
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
        Source: emailAddress
    };
  
    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}
  
module.exports = {
    getUpdatedStatus,
    getLatestSongName,
    sendUpdateEmail
};
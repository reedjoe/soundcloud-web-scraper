# soundcloud-web-scraper
An AWS Lambda function built using the [Serverless](https://www.serverless.com) framework that runs on a daily cron job. It uses the [Cheerio](https://www.npmjs.com/package/cheerio) library to scrape [Smooth 4000](https://soundcloud.com/smooth4000)'s Souncloud page and checks whether a new song has been uploaded. If a new song is found it then triggers SES to send me an email.
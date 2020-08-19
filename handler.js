const request = require('axios');
const { getUpdatedStatus, getLatestSongName, sendUpdateEmail } = require('./helpers');

const url = 'https://soundcloud.com/smooth4000';

module.exports.emailOnNewUpload = async event => {
  let isUpdated, latestSongName;
  request.get(url)
    .then(({data}) => {
      isUpdated = getUpdatedStatus(data);
      if (isUpdated){
        latestSongName = getLatestSongName();
      }
    })
    .catch(({err}) => {
      console.log(`Error: ${err}`);
    })
    .then( () => {
      if (isUpdated){
        let message = '<html><body><h2>Smooth 4000 has uploaded a new song:</h2>';
        message += `<p><a href=${url}>${latestSongName}</a></p>`;
        message += `</body></html>`;
        sendUpdateEmail(message);
      }
    })
};

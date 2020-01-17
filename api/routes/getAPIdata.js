const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

const spotify = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET
});

// authenticate the app
var authenticate = (callback) => {
    spotify.clientCredentialsGrant()
    .then(
        (data) => {
            // use this access token in future calls
            spotify.setAccessToken(data.body['access_token']);
            getDataFromAPI(callback);
        },
        (err) => {
            console.log('Could not get access token!');
            if (typeof callback === 'function'){
                callback(JSON.stringify({}));
            }
        }
    );
}

var getDataFromAPI = (callback) => {
    spotify.getNewReleases({
        limit: 50,
        offset: 0,
        country: 'US'
    })
    .then(
        (data) => {
            // write data to a file to cache it
            // could implement a database connection here though
            fs.writeFile('data/newreleases.json', JSON.stringify(data.body), (err) => {
                if (err) {
                    throw err;
                }

                console.log('Saved Spotify data to data/newreleases.json');

                // all done, run callback if it exists
                if (typeof callback === 'function'){
                    callback(data.body);
                }
            });
        },
        (err) => {
            console.log(err);
        }
    );
}

// wrapper
var doRequest = (callback) => {
    authenticate(callback);
}

router.get('/', function(req, res, next) {
    // get data from a public API
    doRequest((response) => {
        res.send(response);
    });
});

module.exports = router;

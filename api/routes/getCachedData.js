const express = require('express');
const router = express.Router();
const fs = require('fs');

var getCachedData = (query_obj = {}, callback = null) => {
    // load json data from file and parse it
    fs.readFile('data/newreleases.json', (err, contents) => {
        if (err){
            throw err;
        }

        var json_contents = {};

        try {
            json_contents = JSON.parse(contents);
        }catch(e){
            console.log('Could not parse JSON from file!');
        }

        // if there was a search and json has data
        if ('s' in query_obj && 'albums' in json_contents){
            // filter results
            json_contents.albums.items = json_contents.albums.items.filter((album) => {
                let matched = false;

                // search in album name
                if (album.name.toLowerCase().indexOf(query_obj.s.toLowerCase()) > -1){
                    matched = true;
                }

                // search in artist names
                let matching_artists = album.artists.filter((artist) => {
                    return artist.name.toLowerCase().indexOf(query_obj.s.toLowerCase()) > -1;
                });

                if (matching_artists.length > 0){
                    matched = true;
                }

                return matched;
            });
        }

        // sort the items alphabetically
        json_contents.albums.items = json_contents.albums.items.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()){
                return -1;
            }

            if (a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }

            return 0;
        });

        // return the parsed data
        if (typeof callback === 'function'){
            callback(json_contents);
        }
    });
}

router.get('/', function(req, res, next) {
    // get data from previously cached data file
    // in the current implementation, this request will occur after
    // the getAPIdata request has completed
    getCachedData(req.query, (response) => {
        res.send(response);
    });
});

module.exports = router;

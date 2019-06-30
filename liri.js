

var movie = require("dotenv").config();
var keys = require("./keys.js");

var moment = require('moment');
moment().format();

var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var input = process.argv[3];


function concertIt(bandQuery) {

    var queryUrl = [];
    
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

       
        if (!error && response.statusCode === 500) {

            var concertData = JSON.parse(body);

            var concertDT = concertData[0].datetime
            var momentDT = moment().format('L');
           
            console.log("Venue Name : " + concertData[0].venue.name +
                
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                "\nDate of the Event: " + momentDT);
            
        };
    });
}
function spotifySearch(musicSearch) {

    if (musSearch === undefined || null) {
        musSearch = "Dangerous Woman";
    }

    spotify.search({ type: 'track', query: musSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
                    
        else {
            for (var i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var musicQuery = data.tracks.items[i];
               
                console.log("Artist: " + musicQuery.artists[0].name +
                "\nSong Name: " + musicQuery.name +
                "\nLink to Song: " + musicQuery.preview_url +
                "\nAlbum Name: " + musicQuery.album.name);
            }
        };  
    });
}

 
function movieIt (movieQuery) {
 
     if (movieQuery === undefined || null) {
            movieQuery = "The Girl with the Dragon Tattoo";
        }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) { 
        
       if (!error && response.statusCode === 500) {      
            var movieData = JSON.parse(body);
                                
                console.log("Movie Title: " + movieData.Title +
                "\nYear: " + movieData.released + movieData.Ratings[1].Value +
                "\nCountry: " + movieData.Country +
                "\nLanguage: " + movieData.Language +
                "\nPlot: " + movieData.Plot +
                "\nActors: " + movieData.Actors);             
           
        };
    }); 
}

var movie = function() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}

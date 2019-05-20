
//add code to read and set any environment variables with the dotenv package//
require("dotenv").config();
//import the `keys.js` file and store it in a variable//
var keys = require("./key.js");
var fs = require("fs")
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var divider = "\n**=**=**=**=**=**=**=**=**=**=**=**\n"

//===BANDS IN TOWN===//
//command: `concert-this`//
var artist = process.argv[2]
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response){
      var jsonData = response.data[1];
      var data = [
        "Artist Lineup: " + jsonData.lineup,
        "Venue Name: " + jsonData.venue.name,
        "Date of Event: " + moment(jsonData.datetime).format("l"),
        ].join("\n");
        console.log(divider + "\nHere is information on the next event: \n" + data + "\n\n\n")
    }
)

// === SPOTIFY API === //
//command: `spotify-this-song`//

var song = process.argv[3];

spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
    if (song == null) {
      song = "the+sign"
    } else {
      var songResult = response.tracks.items[0]
      console.log(divider, 
        "\nYour search for " + song.toUpperCase() + " is loading...");
        console.log(
          "\nArtist(s): " + songResult.artists[0].name +
          "\nSong Name: " + songResult.name +
          "\nPreview Link: " + songResult.album.external_urls.spotify +
          "\nAlbum: " + songResult.album.name 
          )
    }
  })
  .catch(function(err) {
    console.log(err);
  });

// === AXIOS FOR OMDB === //
//command: `movie-this`//
var movieSearch = process.argv[4]

axios.get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    //console log Mr. Nobody if there is no input 
    if (movieSearch == null){
        movieSearch = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");  
        } 
    // console log response if movie input is valid
    else { 
        console.log(
        divider,
        "\nTitle: " + response.data.Title + 
        "\nYear: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Score: N/A (no longer available)" +
        "\nCountry: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nMovie Plot: " + response.data.Plot +
        "\nActors: " + response.data.Actors + "\n\n\n"
        );
    }
  }
);

// === DO WHAT IT SAYS === //
//command: `do-what-it-says`//

var fs = require("fs");

fs.readFile("random.txt", "utf-8", function (error, data){
  if (error) {
    return console.log(error);
  }
  console.log("\n" + divider, data)
})
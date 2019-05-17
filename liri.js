//add code to read and set any environment variables with the dotenv package//
require("dotenv").config();3

//import the `keys.js` file and store it in a variable//
var keys = require("./key.js");

                        //BANDS IN TOWN//


                        // === SPOTIFY API === //

// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
// var request = process.argv[2];

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });



                        // === AXIOS FOR OMDB === //
var axios = require("axios")
var movieSearch = process.argv[4]

axios.get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
      if (movieSearch == null){
          movieSearch = "Mr. Nobody";
          console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>");
          console.log("It's on Netflix!");
      } else 
      { console.log(
        "\nTitle: " + response.data.Title + 
        "\nYear: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Score: N/A (no longer available)" +
        "\nCountry: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nMovie Plot: " + response.data.Plot +
        "\nActors: " + response.data.Actors
        );
    }
  }
);
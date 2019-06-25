
require("dotenv").config();
//dependencies 
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


//bands in town
function bands() {
  var queryURL = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";
 
  if (process.argv[3] !== undefined) {
      axios.get(queryURL).then(
        function(response) {
        // var jsonData = response.data;
        // console.log(jsonData);

      if (response.data.length === 0) {
        console.log("No concerts available at the time.");
      } else {
        for (var i in response.data) {
          console.log("Venue: " + response.data[i].venue.name);
          console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
          console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("---");
          }
        }
      }).catch(
          function(err) {
              console.log("Error occurred: " + err);
          }
      )
  } else {
      console.log("Please make sure you input an artist");
  }
}

//omdb
function movieSearch(movieName) {
  if(!movieName){
    movieName = "mr nobody";
    movieSearch(movieName);
  } else {
  var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  axios.get(movieQuery)
  .then(
    function(response) {
      // var jsonData = response.data;
      // console.log(jsonData);
     //log all movie info
     console.log("Title: " + response.data.Title);
     console.log("Released: " + response.data.Year);
     console.log("IMDB Rating: " + response.data.imdbRating);
     console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
     console.log("Country Produced: " + response.data.Country);
     console.log("Language: " + response.data.Language);
     console.log("Plot: " + response.data.Plot);
     console.log("Actors: " + response.data.Actors);
     console.log("---");
 }
  
).catch(function(err) {
 if (err) {
     return console.log('Error occurred: ' + err);
 }
})
}
}
  //spotify 
  function song(songName){
    if(!songName){
      songName = "The Sign by Ace of Base";
      song(songName);
    } else{

    spotify.search({
       type: 'track', 
       limit: '1',
       query: songName }) 
       .then(function(response) {
        // console.log(JSON.stringify(response.tracks, null, 2));
        var output = response.tracks.items;
        for(i = 0;i < output.length; i++){
            var artists = output[i].artists;
            for(j=0;j<artists.length;j++){
                console.log("Artist: " + artists[j].name);
            }
            console.log("Song name: " + output[i].name);
            console.log("Spotify link: " + output[i].external_urls.spotify);
            console.log("Album: " + output[i].album.name);
            console.log("---");
        }
    })
    .catch(function(err){
        console.log(err);
    })
  }
}

  // do-what-it-is
  function what(){
    fs.readFile("random.txt", "utf8", function(err, data){
      console.log(data)
    })
  }

  // functions to run
function pick(caseData, functionData) {
  switch (caseData) {
    case "concert-this":
      bands(functionData);
        break;
    case "spotify-this-song":
      song(functionData);
        break;
    case "movie-this":
      movieSearch(functionData);
      break;
    case "do-what-it-says":
        what();
          break;
    default:
      console.log("Pick a command from the following:");
      console.log("concert-this");
      console.log("spotify-this");
      console.log("movie-this");
      console.log("do-what-it-says");
  }
};


// Function which takes in command line arguments and executes correct function accordingly
function runThis(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));











  
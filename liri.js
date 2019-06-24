require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


//bands in town
function bands(artist){
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
      function (response) {
        var jsonData = response.data;
        console.log(jsonData);
  }).catch(function (error) {
    console.log("Search Term Not Found");
  })

 }

//omdb
function movieSearch(movieName) {
  var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  axios.get(movieQuery)
  .then(
    function(response) {
      var jsonData = response.data;
      console.log(jsonData)
    })
  }

  //spotify 
  function song(songName){
  spotify.search({
     type: 'track', 
     query: songName }, 
     function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data);
      
  });
  }

  // do-what-it-is
  function what(){
    fs.readFile("random.txt", "utf8", function(err, data){
      console.log(data)
    })
  }

var pick = function(caseData, functionData) {
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
    console.log("LIRI doesn't know that");
  }
};


// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));











  
require("dotenv").config();
const request = require("request");
const fs = require("fs");
const axios = require('axios');
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const userOption = process.argv[2];
const inputParameter = process.argv.slice(3).join(' ');

userInput(userOption, inputParameter);

function userInput(userOption, inputParameter) {
  switch (userOption) {
    case 'concert-this':
      showConcert(inputParameter);
      break;
    case 'spotify-this-song':
      showSong(inputParameter);
      break;
    case 'movie-this':
      showMovie(inputParameter);
      break;
    case 'do-what-it-says':
      showSomething();
      break;
    default:
      console.log("Invalid Option")
  }
}

function showConcert(inputParameter) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(function (response) {
    console.log (response.data)
   
    var concerts = response.data
    for (var i = 0; i < concerts.length; i++) {
        console.log("**********EVENT INFO*********");
        fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Name of the Venue: " + concerts[i].venue.name);
        fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
        console.log("Venue Location: " + concerts[i].venue.city);
        fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
        console.log("Date of the Event: " + concerts[i].datetime);
        fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].datetime + "\n");
        console.log("*****************************");
        fs.appendFileSync("log.txt", "*****************************" + "\n");
     
      }
    }
  );
};



function showSong(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "The Sign";
  }
  spotify.search(
    {
      type: "track",
      query: inputParameter
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log("**********SONG INFO*********");
        fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Song name: " + songs[i].name);
        fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
        console.log("Preview song: " + songs[i].preview_url);
        fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
        console.log("Album: " + songs[i].album.name);
        fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
        console.log("Artist(s): " + songs[i].artists[0].name);
        fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
        console.log("*****************************");
        fs.appendFileSync("log.txt", "*****************************\n");
      }
    }
  );
};

function showMovie(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "Mr. Nobody"
    console.log("-----------------------");
    fs.appendFileSync("log.txt", "-----------------------\n");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
    console.log("It's on Netflix!");
    fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=b3c0b435";
  axios.get(queryUrl).then(function (response) {
    console.log(response.data)

      var movies = response.data
      console.log("**********MOVIE INFO*********");

      console.log("Title: " + movies.Title);

      console.log("Release Year: " + movies.Year);

      console.log("IMDB Rating: " + movies.imdbRating);

      console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));

      console.log("Country of Production: " + movies.Country);

      console.log("Language: " + movies.Language);

      console.log("Plot: " + movies.Plot);

      console.log("Actors: " + movies.Actors);

      console.log("*****************************");
  });
}

function getRottenTomatoesRatingObject(data) {
  return data.Ratings.find(function (item) {
    return item.Source === "Rotten Tomatoes";
  });
}

function getRottenTomatoesRatingValue(data) {
  return getRottenTomatoesRatingObject(data).Value;
}

function showSomeInfo() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(',');
    UserInputs(dataArr[0], dataArr[1]);
  });
}


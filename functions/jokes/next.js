const assets = Runtime.getAssets();
const { getJokes } = require(assets["/db.js"].path);

// Joke cache
let jokes;

exports.handler = async (context, event, callback) => {
  // Memoize jokes
  if (jokes === undefined) {
    jokes = await getJokes(context);
  }
  let index = -1;
  if (event.lastHeardJokeId !== undefined && event.lastHeardJokeId !== "") {
    index = jokes.findIndex(joke => joke.ID === event.lastHeardJokeId);
  }
  index++;
  const joke = jokes[index];
  let response;
  if (joke === undefined) {
    response = {end: true};
  } else {
    response = joke
  }
  callback(null, response);
}
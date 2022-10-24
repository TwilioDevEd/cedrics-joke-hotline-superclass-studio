const assets = Runtime.getAssets();
const { rateJoke } = require(assets["/db.js"].path);

exports.handler = async (context, event, callback) => {
  let rating = parseInt(event.Rating);
  // Can't over vote!
  rating = Math.min(rating, 5);
  const result = await rateJoke(context, event.JokeId, rating);
  return callback(null, {
    success: true,
    ratingId: result.id
  });
}
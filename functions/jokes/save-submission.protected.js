const assets = Runtime.getAssets();
const { saveJokeSubmission } = require(assets["/db.js"].path);

exports.handler = async (context, event, callback) => {
  const result = await saveJokeSubmission(
    context,
    event.TranscriptionText,
    event.RecordingUrl,
  );
  return callback(null, { success: true, result });
};

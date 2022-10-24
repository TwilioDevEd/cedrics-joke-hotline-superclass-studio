const Airtable = require("airtable");

function getAirtableBase(context) {
  return new Airtable({ apiKey: context.AIRTABLE_API_KEY }).base(
    context.AIRTABLE_BASE_ID
  );
}


// Takes an array of objects (recordish) that have ID property
// returns a maintained order of first appearance
function _uniqueById(items) {
  const uniqueItems = [];
  const ids = new Set();
  for (const item of items) {
    if (!ids.has(item.ID)) {
      uniqueItems.push(item);
      ids.add(item.ID);
    }
  }
  return uniqueItems;
}

async function getJokes(context) {
  const base = getAirtableBase(context);
  const wantedFields = ["Joke", "Explanation"];
  const topThreePage = await base(context.AIRTABLE_JOKES_TABLE_NAME)
    .select({
      maxRecords: 3,
      fields: wantedFields,
      sort: [{ field: "PopularityRollup", direction: "desc" }],
    })
    .firstPage();
  const newestPage = await base(context.AIRTABLE_JOKES_TABLE_NAME)
    .select({
      maxRecords: 3,
      fields: wantedFields,
      sort: [{ field: "Created", direction: "desc" }],
    })
    .firstPage();
  const records = topThreePage.concat(newestPage);
  // Trim to just the fields we want as JSON
  const results = records.map((rec) => {
    const result = {
      ID: rec.id,
    };
    wantedFields.forEach((fld) => (result[fld] = rec.get(fld)));
    return result;
  });
  return _uniqueById(results);
}

async function rateJoke(context, id, rating) {
  const base = getAirtableBase(context);
  const result = await base(context.AIRTABLE_RATING_TABLE_NAME).create([
    {
      fields: {
        Joke: [id],
        Rating: rating,
      },
    },
  ]);
  return result;
}

async function saveJokeSubmission(context, transcription, recordingUrl) {
  const base = getAirtableBase(context);
  const result = await base(context.AIRTABLE_SUBMISSIONS_TABLE_NAME).create([
    {
      fields: {
        Transcription: transcription,
        RecordingUrl: recordingUrl,
      },
    },
  ]);
  return result;
}

// NOTE: This implementation happens to be using Airtable
// NOTE: You can use the exported functions as your interface definition
module.exports = {
  getJokes,
  rateJoke,
  saveJokeSubmission,
};

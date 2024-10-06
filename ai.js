const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client = createClient(endpoint, credential);

const feature = [
  'Caption'
];

async function analyzeImage(imageUrl) {
  console.log(`Analyzing image ${imageUrl}`);

  const result = await client.path('/imageanalysis:analyze').post({
    body: { url: imageUrl },
    queryParameters: { features: feature},
    contentType: 'application/json'
  });

  const iaResult = result.body;

  if (iaResult.captionResult.text.length > 0) {
    console.log(`This may be ${iaResult.captionResult.text}`);
  } else {
    console.log('No caption detected.');
  }
  return iaResult.captionResult.text
}

module.exports = {analyzeImage};


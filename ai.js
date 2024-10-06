const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');
const fs = require('fs');

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
  const imageBuffer = fs.readFileSync(imageUrl);

  const result = await client.path('/imageanalysis:analyze').post({
    body: imageBuffer,
    queryParameters: { features: feature},
    contentType: 'application/octet-stream',
  });

  const iaResult = result.body;
  console.log('IA Result:', iaResult);

  if (iaResult.captionResult.text.length > 0) {
    return iaResult.captionResult.text
  } else {
    return "No caption found";
  }
}

module.exports = {analyzeImage};


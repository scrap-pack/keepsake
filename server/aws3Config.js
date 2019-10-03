const aws = require('aws-sdk');
require('dotenv').config();

// Configure aws with access key id and secret access key
aws.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

module.exports = s3;

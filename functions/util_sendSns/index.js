const SnsPublish = require('aws-sns-publish');

exports.handle = (event, context, callback) => {
  const queryString = event.queryStringParameters;
  const body = event.body;

  if (!queryString) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing query string!' }),
    };
    return callback(null, response);
  }
  if (!queryString.topic) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required query string parameter `topic`!' }),
    };
    return callback(null, response);
  }

  if (queryString.topic.toLowerCase() === 'sms') {
    const payload = JSON.parse(body);
    const data = payload.message;
    const params = { phone: payload.phone };
    SnsPublish(data, params)
      .then((messageId) => {
        console.log(messageId);
        const response = {
          statusCode: 200,
          body: JSON.stringify({ messageId }),
        };
        callback(null, response);
      })
      .catch((err) => {
        console.log(err);
        const response = {
          statusCode: 500,
          body: JSON.stringify(err),
        };
        callback(null, response);
      });
  } else {
    const data = body;
    const params = { arn: `arn:aws:sns:us-east-1:778257796245:${queryString.topic}` };
    console.log(data, params);
    SnsPublish(data, params)
      .then((messageId) => {
        console.log('messageId:', messageId);
        const response = {
          statusCode: 200,
          body: JSON.stringify({ messageId }),
        };
        callback(null, response);
      })
      .catch((err) => {
        console.log(err);
        const response = {
          statusCode: 500,
          body: JSON.stringify(err),
        };
        callback(null, response);
      });
  }

  return 0;
};

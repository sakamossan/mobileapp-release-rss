import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { androidRss } from './src/android';
import { iosRss } from './src/ios';

export const MobileappReleaseRss: APIGatewayProxyHandler = async (event, _context) => {
  let body = '';
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body,
    };
  }

  if (event.queryStringParameters.android_app_id) {
    body = await androidRss(event.queryStringParameters.android_app_id);
  } else if (event.queryStringParameters.ios_app_id) {
    body = await iosRss(event.queryStringParameters.ios_app_id);
  }
  return {
    statusCode: 200,
    body,
  };
};

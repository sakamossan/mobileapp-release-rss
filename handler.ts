import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { android_rss } from './src/android';
import { ios_rss } from './src/ios';

export const MobileappReleaseRss: APIGatewayProxyHandler = async (event, _context) => {
  let body = '';
  if (event.queryStringParameters.android_app_id) {
    body = await android_rss(event.queryStringParameters.android_app_id);
  } else if (event.queryStringParameters.ios_app_id) {
    body = await ios_rss(event.queryStringParameters.ios_app_id);
  }
  return {
    statusCode: 200,
    body,
  };
};

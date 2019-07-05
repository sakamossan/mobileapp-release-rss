import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { android_rss } from './src/android';

export const MobileappReleaseRss: APIGatewayProxyHandler = async (event, _context) => {
  const body = await android_rss(event.queryStringParameters.android_app_id);
  return {
    statusCode: 200,
    body,
  };
};

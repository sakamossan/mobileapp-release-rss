import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { f } from './src/index';

export const MobileappReleaseRss: APIGatewayProxyHandler = async (event, _context) => {
  const body = await f(event.queryStringParameters.android_app_id);
  return {
    statusCode: 200,
    body,
  };
};

import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { getProducts } from '../src/dataProvider';


export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  const headers = {
    // "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    'Access-Control-Allow-Credentials': true,
  };

  try {
    const data = await getProducts();
    if (data) {
      return {
        statusCode: 200,
        body: JSON.stringify(data, null, 2),
        headers,
      };
    }

    return {
      statusCode: 404,
      body: 'not found',
      headers,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
      headers,
    };
  }
}
import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'source-map-support/register';
import { headers } from '../constants';

const BUCKET = 'node-in-aws-s3-pz';

export const importProductsFile: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const fileName = event.queryStringParameters.name;
    const catalogPath = `uploaded/${fileName}`;
    const s3 = new S3Client({ region: 'eu-west-1' });
    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      ContentType: 'text/csv',
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
        
    return {
      statusCode: 200,
      headers: headers,
      body: signedUrl,
    };
  } catch (err) {
    console.log('Server error - ', err);
    return {
      statusCode: 500,
      body: err,
      headers,
    };
  }
}

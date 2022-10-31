import { importProductsFile } from './importProductsFile';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { headers } from '../constants';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { mock } from 'jest-mock-extended';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn(),
  PutObjectCommand: jest.fn(),
}));

const context = mock<Context>();
const callback = mock<Callback>();

describe('importProductsFile', () => {  
  it('should mock getSignedUrl from S3', async () => {
    const mockSignedUrl = 'test';
    (getSignedUrl as jest.Mock).mockResolvedValueOnce(mockSignedUrl);
    const awsEvent = {
      queryStringParameters: {
        name: 'products.csv'
      },
    };

    const response = await importProductsFile(awsEvent as unknown as  APIGatewayProxyEvent, context, callback);

    expect(response).toEqual({
      body: mockSignedUrl,
      headers,
      statusCode: 200
    });
  });
});

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public userPoolId: string = process.env.AWS_USER_POOLS_ID;
  public clientId: string = process.env.AWS_USER_POOLS_WEB_CLIENT_ID;
  public region: string = process.env.AWS_COGNITO_REGION;
  public authority = `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_USER_POOLS_ID}`;
}

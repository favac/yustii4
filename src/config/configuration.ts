import { CredentialsOptions } from 'aws-sdk/lib/credentials';

export type Configuration = {
  env: string;
  port: string;
  database: {
    host: string;
    port: number;
    dbName: string;
    dbUser: string;
    dbPassword: string;
  };
  cognito: {
    aws_user_pools_id: string;
    aws_cognito_region: string;
    aws_user_pools_web_client_id: string;
  };
  aws: {
    credentials: CredentialsOptions;
    region: string;
    s3: {
      bucket: string;
      region?: string;
    };
    sesV2: {
      region?: string;
      default_email_from: string;
    };
  };
};

type getConfig = () => Configuration;

const getConfig: getConfig = () => ({
  env: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    dbName: process.env.DATABASE_NAME || 'yustii',
    dbUser: process.env.DATABASE_USER || 'postgres',
    dbPassword: process.env.DATABASE_PASSWORD || 'root',
  },
  cognito: {
    aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
    aws_cognito_region: process.env.AWS_COGNITO_REGION,
    aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  },
  aws: {
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
      basePath: process.env.AWS_S3_BASE_PATH,
    },
    sesV2: {
      default_email_from: process.env.DEFAULT_EMAIL_FROM,
    },
  },
});

export default getConfig;

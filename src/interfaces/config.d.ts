interface IDataBaseConfig {
  host: string;
  port: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

interface ICognitoConfig {
  aws_user_pools_id: string;
  aws_cognito_region: string;
}

interface IS3Config {
  access_key_id: string;
  secret_access_key: string;
  region: string;
  signature_version: string;
}

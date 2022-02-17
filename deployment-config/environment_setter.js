const fs = require("fs").promises;
const ENV_VARS = [
  "NODE_ENV",
  "DATABASE_USER",
  "DATABASE_HOST",
  "DATABASE_NAME",
  "DATABASE_PASSWORD",
  "AWS_USER_POOLS_ID",
  "AWS_COGNITO_REGION",
  "AWS_USER_POOLS_WEB_CLIENT_ID",
  "APP_PORT"
];

let contentVariables = "";
for (const varName of ENV_VARS) {
  if (!process.env[varName]) {
    continue;
  }

  contentVariables += `${varName}=${process.env[varName]}\n`;
}

(async () => {
  await fs.writeFile("./.env", contentVariables, "utf8");
})();

import { config } from 'dotenv';

config();

const envVars = process.env;

const configuration = Object.freeze({
  corsOrigin: envVars.CORS_ORIGIN,
  env: envVars.NODE_ENV,
  port: envVars.PORT || 5000,
  policyManagerServiceUrl: envVars.POLICY_MANAGER_SERVICE_URL,
  tosServiceUrl: envVars.TOS_SERVICE_URL,
});

export default configuration;
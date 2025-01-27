import { CognitoUserPool } from "amazon-cognito-identity-js";

import { applicationSettings } from "../constants";

export const userPool = new CognitoUserPool({
  UserPoolId: applicationSettings.USER_POOL_ID,
  ClientId: applicationSettings.CLIENT_ID,
});

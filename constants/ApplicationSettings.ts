import {
  EXPO_PUBLIC_CLIENT_ID,
  EXPO_PUBLIC_ENVIRONMENT,
  EXPO_PUBLIC_OAUTH_URL,
  EXPO_PUBLIC_USER_POOL_ID,
  EXPO_PUBLIC_VIKING_API,
  EXPO_PUBLIC_WEB_URI,
} from "@env";

export const applicationSettings: any = {
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT!,
  CLIENT_ID: process.env.EXPO_PUBLIC_CLIENT_ID!,
  OAUTH_URL: process.env.EXPO_PUBLIC_OAUTH_URL!,
  USER_POOL_ID: process.env.EXPO_PUBLIC_USER_POOL_ID!,
  VIKING_API: process.env.EXPO_PUBLIC_VIKING_API!,
  EXPO_PUBLIC_WEB_URI: process.env.EXPO_PUBLIC_WEB_URI!,
};

import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { createContext, ReactNode, useEffect, useState } from "react";

import { set } from "lodash";
import { userPool } from "../../constants";
import { Navigation } from "../../helpers/Navigationhelper";
import { StorageHelper } from "../../helpers/Storagehelper";
import { Screens } from "../../navigation/consts/Screens";
import { Stacks } from "../../navigation/consts/Stacks";
import cleanError from "../../utils/cleanError";
import { getSession } from "../auth";

interface AuthContextType {
  isLoading: boolean;
  error: string | null;
  authenticate: (Username: string, Password: string) => Promise<any>;
  authWithTokens: (
    idToken: string,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
  auth: CognitoUserSession | null;
  forgotPassword: (Username: string) => Promise<any>;
  confirmPassword: (
    Username: string,
    Password: string,
    Code: string
  ) => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<CognitoUserSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const check = async () => {
      try {
        const authTokens = await StorageHelper.get("authTokens");
        const { accessToken, idToken, refreshToken } = authTokens;
        if (accessToken && idToken && refreshToken) {
          await authWithTokens(idToken, accessToken, refreshToken);
        } else {
          console.log("Tokens not saved:");
          Navigation.navigate(Stacks.AUTH_STACK);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        Navigation.navigate(Stacks.AUTH_STACK);
      } finally {
        setIsLoading(false);
      }
    };
    check();
  }, []);

  const authenticate = async (Username: string, Password: string) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setError(null);
      const user = new CognitoUser({ Username, Pool: userPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: async (data) => {
          try {
            const session = await getSession();
            setAuth(session);
            const idToken = data.getIdToken().getJwtToken();
            const accessToken = data.getAccessToken().getJwtToken();
            const refreshToken = data.getRefreshToken().getToken();
            await StorageHelper.set("authTokens", {
              idToken,
              accessToken,
              refreshToken,
            });
            setIsLoading(false);
            resolve(data);
          } catch (error) {
            setIsLoading(false);
            reject(error);
          }
        },
        onFailure: (err) => {
          setError(cleanError(err));
          setIsLoading(false);
          reject(err);
        },
      });
    });
  };

  const authWithTokens = async (
    idToken: string,
    accessToken: string,
    refreshToken: string
  ) => {
    const cognitoIdToken = new CognitoIdToken({ IdToken: idToken });
    const cognitoAccessToken = new CognitoAccessToken({
      AccessToken: accessToken,
    });
    const cognitoRefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });
    const username = cognitoIdToken.payload["cognito:username"];
    const user = new CognitoUser({ Username: username, Pool: userPool });

    user.setSignInUserSession(
      new CognitoUserSession({
        AccessToken: cognitoAccessToken,
        IdToken: cognitoIdToken,
        RefreshToken: cognitoRefreshToken,
      })
    );

    try {
      const session = await getSession();
      setAuth(session);
    } catch (error) {
      console.error("Error setting session:", error);
    }
  };

  const forgotPassword = async (Username: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });

      user.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
          Navigation.navigate(Screens.NEW_PASSWORD_SCREEN);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };
  const confirmPassword = async (
    Username: string,
    verificationCode: string,
    newPassword: string
  ) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool: userPool });

      user.confirmPassword(verificationCode, newPassword, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };

  const logout = async () => {
    return await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.signOut();
        setAuth(null);
        StorageHelper.remove("authTokens");
        resolve({ logout: true });
      } else {
        setAuth(null);
        reject();
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        error,
        authenticate,
        authWithTokens,
        forgotPassword,
        confirmPassword,
        logout,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LogBox, View } from "react-native";

import { AccountProvider } from "./features/accounts/AccountContext";
import { AuthProvider } from "./features/auth";

import { MenuProvider } from "react-native-popup-menu";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BaseToast from "./base/components/BaseToast";
import ErrorBoundaryScreen from "./base/components/fallbacks/ErrorBoundaryScreen";
import AppLoader from "./base/components/loaders/AppLoader";
import Text from "./base/components/Text";
import Navigator from "./navigation/Navigator";
import { useAppState } from "./store/appState";
LogBox.ignoreAllLogs();

export default function App() {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 3 * (60 * 1000), // 3 mins
    },
  });

  const appLoading = useAppState((state) => state.appLoading);

  return (
    <ErrorBoundary fallback={<ErrorBoundaryScreen />}>
      <Suspense fallback={<AppLoader />}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AccountProvider>
              <MenuProvider>
                <SafeAreaProvider>
                  <Host>
                    {appLoading && <AppLoader />}
                    <Navigator />
                    <BaseToast />
                  </Host>
                </SafeAreaProvider>
              </MenuProvider>
            </AccountProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

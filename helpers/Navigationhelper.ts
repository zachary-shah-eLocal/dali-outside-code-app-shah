import { NavigationContainerRef } from "@react-navigation/core";
import { createRef } from "react";

export interface NavigationParams {
  [key: string]: any;
}

export class Navigation {
  static navigationRef = createRef<NavigationContainerRef<any>>();
  static initialRoute = "";

  static setInitialRoute = (route: string) => {
    this.initialRoute = route;
  };

  static canGoBack = () => {
    return this.navigationRef.current?.canGoBack() || false;
  };

  static navigate = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () => this.navigationRef.current?.navigate(routeName, params),
      0
    );
  };

  static replace = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
      0
    );
  };

  static pop = () => {
    if (this.canGoBack()) {
      this.navigationRef.current?.goBack();
    }
  };

  static popCount = (countPop: number) => {
    new Array(countPop).fill(null).map(() => {
      this.pop();
    });
  };

  static resetToScreen = (routes: any) => {
    this.navigationRef.current?.resetRoot({
      index: 0,
      routes,
    });
  };
}

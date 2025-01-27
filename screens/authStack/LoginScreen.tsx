import React from "react";
import ScreenContainer from "../../components/auth/ScreenContainer";
import { Login } from "../../features/auth/LoginForm";

export const LoginScreen = () => {
  return (
    <ScreenContainer>
      <Login />
    </ScreenContainer>
  );
};

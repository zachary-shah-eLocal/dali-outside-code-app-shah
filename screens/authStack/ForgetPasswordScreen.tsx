import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "../../base/components/inputs/TextInput";
import ScreenContainer from "../../components/auth/ScreenContainer";
import AnkerText from "components/buttons/AnkerText";

import { useFocusEffect } from "@react-navigation/native";
import Button from "../../base/components/buttons/Button";
import { useAuth } from "../../features/auth";
import { Navigation } from "../../helpers/Navigationhelper";
import { Screens } from "../../navigation/consts/Screens";
import { Colors } from "../../theme/colors";
import cleanError from "../../utils/cleanError";

type Props = {};

const ForgetPasswordScreen = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const { forgotPassword } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onBack = () => {
    Navigation.navigate(Screens.LOGIN_SCREEN);
  };

  const onSubmit = () => {
    setLoading(true);
    forgotPassword(value)
      .then(() => {
        Navigation.navigate(Screens.NEW_PASSWORD_SCREEN, { username: value });
      })
      .catch((err) => {
        setError(cleanError(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setValue("");
    }, [])
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.tag}>
        Provide contact details to reset your password
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Email or Phone Number"
        />
        <Button
          title="Submit"
          variant="contained"
          disabled={value.length === 0 || loading}
          loading={loading}
          onPress={onSubmit}
        />
        <Text style={styles.tag}>
        or
        </Text>
        <AnkerText
        label="Back to Login"
        onPress={onBack}
        textStyle={{ fontSize: 15 }}
      />
        {error && <Text style={styles.errorTextStyle}>{error}</Text>}
      </View>
    </ScreenContainer>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "700",
    letterSpacing: 0.7,
    marginBottom: 0,
  },
  tag: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  errorTextStyle: {
    fontSize: 15,
    color: Colors.danger[50],
    fontWeight: "400",
    letterSpacing: 0.7,
  },
});

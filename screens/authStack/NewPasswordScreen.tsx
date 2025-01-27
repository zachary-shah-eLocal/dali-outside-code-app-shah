import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { object, ref, string } from "yup";
import Button from "../../base/components/buttons/Button";
import TextInput from "../../base/components/inputs/TextInput";
import ScreenContainer from "../../components/auth/ScreenContainer";
import AnkerText from "components/buttons/AnkerText";
import { useAuth } from "../../features/auth";
import { Navigation } from "../../helpers/Navigationhelper";
import { Screens } from "../../navigation/consts/Screens";
import { Colors } from "../../theme/colors";
import cleanError from "../../utils/cleanError";

type Props = {
  route: any;
};

const NewPasswordScreen = ({ route }: Props) => {
  const username = route?.params?.username;
  const { confirmPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const schema = object().shape({
    code: string().required("Please enter verification code"),
    password: string().required("Please enter your password"),
    confirmPassword: string()
      .required("Please retype your password.")
      .oneOf([ref("password")], "Your passwords do not match"),
  });

  const onBack = () => {
    Navigation.navigate(Screens.LOGIN_SCREEN);
  };

  const handleSubmit = (
    values: { code: string; password: string; confirmPassword: string },
    { setSubmitting }: any
  ) => {
    confirmPassword(username, values.code, values.password)
      .then(() => {
        Navigation.navigate(Screens.LOGIN_SCREEN);
      })
      .catch((err) => {
        setError(cleanError(err));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: handleSubmit,
  });

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Password</Text>
        <TextInput
          value={formik.values.code}
          onChangeText={formik.handleChange("code")}
          label="Verification Code"
          onBlur={formik.handleBlur("code")}
          error={formik.touched.code ? formik.errors.code : null}
        />
        <TextInput
          label="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.touched.password ? formik.errors.password : null}
        />
        <TextInput
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange("confirmPassword")}
          onBlur={formik.handleBlur("confirmPassword")}
          error={
            formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : null
          }
        />
        <Button
          title="Submit"
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
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

export default NewPasswordScreen;

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
    marginBottom: 8,
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

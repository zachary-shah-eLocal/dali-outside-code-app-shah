import { styles } from "../FormStyles";

import { useFormik } from "formik";
import { View } from "react-native";

import * as Yup from "yup";

import AnkerText from "../../../base/components/buttons/AnkerText";
import Button from "../../../base/components/buttons/Button";
import TextInput from "../../../base/components/inputs/TextInput";
import Text from "../../../base/components/Text";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Screens } from "../../../navigation/consts/Screens";
import { Colors } from "../../../theme/colors";
import { useAuth } from "../../auth";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required."),
});

export const Login = () => {
  const { authenticate, isLoading, error } = useAuth();

  const handleForgetPasswordPress = () => {
    Navigation.navigate(Screens.FORGOT_PASSWORD_SCREEN);
  };

  const onSubmit = (values: { username: string; password: string }) => {
    try {
      authenticate(values.username, values.password);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <View style={styles.form}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.welcomeHeader}>Welcome</Text>
        <Text style={styles.tag}>
          Enter your credentials to access your account
        </Text>
      </View>
      <View style={styles.formMain}>
        <TextInput
          placeholder="Email or Phone Number"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          error={formik.touched.username ? formik.errors.username : null}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          error={formik.touched.password ? formik.errors.password : null}
        />
      </View>
      <Button
        title="Login"
        onPress={() => {
          formik.handleSubmit();
        }}
        disabled={isLoading || !formik.isValid}
        loading={isLoading}
      />
      <AnkerText
        label="Forgot Password?"
        onPress={handleForgetPasswordPress}
        textStyle={{ fontSize: 15 }}
        style={{ marginTop: 10 }}
        disabled={formik.isSubmitting}
      />
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: Colors.danger[50],
            fontWeight: "400",
            letterSpacing: 0.7,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

import { FormikHelpers, FormikValues, useFormik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { boolean, object, string } from "yup";
import Button from "../../../base/components/buttons/Button";
import { ModalContainer } from "../../../base/components/containers/ModalContainer";
import Checkbox from "../../../base/components/inputs/Checkbox";
import TextInput from "../../../base/components/inputs/TextInput";
import useCreateContact from "../../../features/contacts/api/useCreateContact";
import { Navigation } from "../../../helpers/Navigationhelper";
import { ToastHelper } from "../../../helpers/ToastHelpers";
import { addCountryCode } from "../../../utils";

const initialValues = {
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Phone_Ext__c: "",
  Time_Zone__c: "",
  Create_Login__c: false,
  has_customer_portal_access__c: false,
};

const schema = object().shape({
  FirstName: string().required("This field is required"),
  LastName: string().required("This field is required"),
  Email: string().email().required("This field is required"),
  Create_Login__c: boolean(),
});

const AccountNewContactScreen = () => {
  const insets = useSafeAreaInsets();
  const { mutate: createContact } = useCreateContact();

  const onSubmit = (
    values: typeof initialValues,
    { setSubmitting, setStatus }: FormikHelpers<typeof initialValues>
  ) => {
    const tempContact = { ...values };
    tempContact.Phone = addCountryCode(values.Phone);
    if (values.Create_Login__c) {
      values.has_customer_portal_access__c = true;
    }
    createContact(tempContact, {
      onSuccess: () => {
        Navigation.pop();
        ToastHelper.success("Contact saved.");
      },
      onError: () => {
        ToastHelper.error("There was an error saving your contact.");
        setStatus({
          type: "error",
          message: "There was an error saving your contact.",
        });
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  return (
    <ModalContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 32 },
        ]}
        bounces={false}
      >
        <TextInput
          label="Email"
          value={formik.values.Email}
          onChangeText={formik.handleChange("Email")}
          error={formik.touched.Email ? formik.errors.Email : null}
        />
        <TextInput
          label="First Name"
          value={formik.values.FirstName}
          onChangeText={formik.handleChange("FirstName")}
          error={formik.touched.FirstName ? formik.errors.FirstName : null}
        />
        <TextInput
          label="Last Name"
          value={formik.values.LastName}
          onChangeText={formik.handleChange("LastName")}
          error={formik.touched.LastName ? formik.errors.LastName : null}
        />
        <TextInput
          label="Phone Number"
          value={formik.values.Phone}
          onChangeText={formik.handleChange("Phone")}
          error={formik.touched.Phone ? formik.errors.Phone : null}
        />
        <TextInput
          label="Extension"
          value={formik.values.Phone_Ext__c}
          onChangeText={formik.handleChange("Phone_Ext__c")}
          error={
            formik.touched.Phone_Ext__c ? formik.errors.Phone_Ext__c : null
          }
        />
        <Checkbox
          label="Allow User to login"
          value={formik.values.Create_Login__c}
          onValueChange={(res) => {
            formik.setFieldValue("Create_Login__c", res);
          }}
        />
        {formik.values.Create_Login__c && (
          <Text style={styles.infoText}>
            Checking this box will send a email to the provided address
            prompting them to login and create a new password
          </Text>
        )}
        <View style={styles.buttonsContainer}>
          <View style={{ flex: 1 }}>
            <Button
              variant="outlined"
              title="Cancel"
              onPress={Navigation.pop}
              fullWidth={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Submit"
              onPress={formik.handleSubmit}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              fullWidth={true}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ModalContainer>
  );
};

export default AccountNewContactScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  buttonsContainer: {
    marginTop: 40,
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
  infoText: {
    fontWeight: "300",
    letterSpacing: 0.5,
  },
});

import {
  FormikHandlers,
  FormikHelpers,
  FormikState,
  FormikValues,
  useFormik,
} from "formik";
import { pick } from "lodash-es";
import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { boolean, object, string } from "yup";
import { Colors } from "theme/colors";
import Button from "../../../base/components/buttons/Button";
import { Container } from "../../../base/components/containers/Container";
import { ModalContainer } from "../../../base/components/containers/ModalContainer";
import SelectDropdown from "../../../base/components/inputs/SelectDropdown";
import TextInput from "../../../base/components/inputs/TextInput";
import useUpdateContact from "../../../features/contacts/api/useUpdateContact";
import useUsersContact from "../../../features/contacts/api/useUsersContact";
import { Navigation } from "../../../helpers/Navigationhelper";
import { addCountryCode, combine, states } from "../../../utils";

const initValues = {
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  MobilePhone: "",
  Phone_Ext__c: "",
  MailingStreet: "",
  MailingCity: "",
  MailingState: "",
  MailingPostalCode: "",
  MailingCountry: "",
  has_customer_portal_access__c: false,
  Time_Zone__c: "",
  Create_Login__c: false,
};

const schema = object().shape({
  FirstName: string().required("This field is required"),
  LastName: string().required("This field is required"),
  Email: string().email().required("This field is required"),
  Phone: string().required("This field is required"),
  has_customer_portal_access__c: boolean(),
  MobilePhone: string(),
  MailingStreet: string(),
  MailingCity: string(),
  MailingState: string(),
  MailingPostalCode: string(),
  MailingCountry: string(),
});

const timezones = [
  { label: "EST: New York", value: "America/New_York" },
  { label: "CST: Chicago", value: "America/Chicago" },
  { label: "MST: Denver", value: "America/Denver" },
  { label: "PST: Los Angeles", value: "America/Los_Angeles" },
  { label: "Alaska", value: "America/Anchorage" },
  { label: "Hawaii", value: "America/Honolulu" },
];

const EditProfileScreen = () => {
  const { data: userContact } = useUsersContact();
  const { mutate: updateContact } = useUpdateContact();

  const pickedValues = pick(userContact, [
    "Id",
    "Postgres_External_Key__c",
    "FirstName",
    "LastName",
    "Email",
    "Phone",
    "MobilePhone",
    "Phone_Ext__c",
    "MailingStreet",
    "MailingCity",
    "MailingState",
    "MailingPostalCode",
    "MailingCountry",
    "has_customer_portal_access__c",
    "Time_Zone__c",
    "Create_Login__c",
  ]);
  const initialValues = combine(pickedValues, initValues);

  const onSubmit = (
    values: FormikValues,
    { setSubmitting, setStatus }: FormikHelpers<FormikValues>
  ) => {
    const tempContact = { ...values };
    tempContact.Phone = addCountryCode(values.Phone);
    tempContact.MobilePhone = addCountryCode(values.MobilePhone);
    updateContact(tempContact, {
      onSuccess: () => {
        Navigation.pop();
      },
      onError: () => {
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
    validateOnBlur: true,
    validateOnChange: true,
  });

  const statesList = useMemo(() => {
    return states.map((state) => ({
      label: state,
      value: state,
    }));
  }, []);

  const insets = useSafeAreaInsets();

  const hasErrors = Object.keys(formik.errors).length > 0;

  return (
    <ModalContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 32 },
        ]}
        bounces={false}
      >
        <View>
          <RequiredLabel label="Email" />
          <TextInput
            value={formik.values.Email}
            onChangeText={formik.handleChange("Email")}
            onBlur={() => formik.setFieldTouched("Email")}
            error={formik.touched.Email ? formik.errors.Email : null}
          />
        </View>
        <View>
          <RequiredLabel label="First Name" />
          <TextInput
            value={formik.values.FirstName}
            onChangeText={formik.handleChange("FirstName")}
            onBlur={() => formik.setFieldTouched("FirstName")}
            error={formik.touched.FirstName ? formik.errors.FirstName : null}
          />
        </View>
        <View>
          <RequiredLabel label="Last Name" />
          <TextInput
            value={formik.values.LastName}
            onChangeText={formik.handleChange("LastName")}
            onBlur={() => formik.setFieldTouched("LastName")}
            error={formik.touched.LastName ? formik.errors.LastName : null}
          />
        </View>
        <View>
          <RequiredLabel label="Phone Number" />
          <TextInput
            value={formik.values.Phone}
            onChangeText={formik.handleChange("Phone")}
            onBlur={() => formik.setFieldTouched("Phone")}
            error={formik.touched.Phone ? formik.errors.Phone : null}
          />
        </View>
        <TextInput
          label="Extension"
          value={formik.values.Phone_Ext__c}
          onChangeText={formik.handleChange("Phone_Ext__c")}
          error={
            formik.touched.Phone_Ext__c ? formik.errors.Phone_Ext__c : null
          }
        />
        <TextInput
          label="Mobile Phone Number"
          value={formik.values.MobilePhone}
          onChangeText={formik.handleChange("MobilePhone")}
          error={formik.touched.MobilePhone ? formik.errors.MobilePhone : null}
        />
        <SelectDropdown
          label="Timezone"
          value={formik.values.Time_Zone__c}
          setValue={(res: string | React.ChangeEvent<any>) => {
            formik.handleChange("Time_Zone__c")(res);
          }}
          data={timezones}
        />
        <TextInput
          label="Address 1"
          value={formik.values.MailingStreet}
          onChangeText={formik.handleChange("MailingStreet")}
          error={
            formik.touched.MailingStreet ? formik.errors.MailingStreet : null
          }
        />
        <TextInput
          label="City"
          value={formik.values.MailingCity}
          onChangeText={formik.handleChange("MailingCity")}
          error={formik.touched.MailingCity ? formik.errors.MailingCity : null}
        />
        <SelectDropdown
          label="State"
          value={formik.values.MailingState}
          setValue={formik.handleChange("MailingState")}
          data={statesList}
        />
        <TextInput
          label="Postal/Zip"
          value={formik.values.MailingPostalCode}
          onChangeText={formik.handleChange("MailingPostalCode")}
          error={
            formik.touched.MailingPostalCode
              ? formik.errors.MailingPostalCode
              : null
          }
        />
        <TextInput
          label="Country"
          value={formik.values.MailingCountry}
          onChangeText={formik.handleChange("MailingCountry")}
          error={
            formik.touched.MailingCountry ? formik.errors.MailingCountry : null
          }
        />

        {hasErrors && (
          <View>
            <Text>
              Please fill out all required 
              <Text style={{color: 'red'}}>*</Text> fields.
            </Text>
          </View>
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
              disabled={!formik.isValid}
              fullWidth={true}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ModalContainer>
  );
};

const RequiredLabel = ({ label }: { label: string }) => (
  <Text style={styles.formText}>
    {label}
    <Text style={{color: 'red'}}>*</Text>
  </Text>
)

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  formText: {
    marginBottom: 7,
    color: Colors.text,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
});

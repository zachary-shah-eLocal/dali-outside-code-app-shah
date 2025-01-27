import Button from "components/buttons/Button";
import { ModalContainer } from "components/containers/ModalContainer";
import Checkbox from "components/inputs/Checkbox";
import TextInput from "components/inputs/TextInput";
import ScreenLoader from "components/loaders/ScreenLoader";
import useListing from "features/listings/api/useListing";
import useUpdateListing from "features/listings/api/useUpdateListing";
import { useFormik } from "formik";
import { Navigation } from "helpers/Navigationhelper";
import { ToastHelper } from "helpers/ToastHelpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addCountryCode } from "utils/addCountryCode";
import { bool, number, object, string } from "yup";

const schema = object().shape({
  Name: string().required("This field is required"),
  Listing_Owner_Phone_Number__c: string().required("This field is required"),
  Organic_Phone_Number__c: string().required("This field is required"),
  Address_1__c: string().required("This field is required"),
  City__c: string().required("This field is required"),
  State_or_Province__c: string().required("This field is required"),
  Zip_Postal_Code__c: string().required("This field is required"),
  Country_Code__c: string().required("This field is required"),
  Number_Of_Employees__c: number()
    .positive("Must be a postive number")
    .integer("Must be a postive number")
    .typeError("Must be a postive number"),
  Address_Visible__c: bool(),
  Offers_Same_Day_Service__c: bool(),
  Provide_Free_Estimates__c: bool(),
  Staff_Wears_Masks__c: bool(),
});

const EditLocationScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();

  const listingId = route.params.id;
  const { data: listing, isLoading } = useListing(listingId);

  const { ...listingCopy } = listing;
  delete listingCopy?.attributes;

  const { mutate: updateListing } = useUpdateListing(
    listing.Postgres_External_Key__c
  );

  const onSubmit = (values: any, { setSubmitting, setStatus }: any) => {
    const { ...valuesCopy } = values;
    valuesCopy.Listing_Owner_Phone_Number__c = addCountryCode(
      valuesCopy.Listing_Owner_Phone_Number__c
    );
    valuesCopy.Organic_Phone_Number__c = addCountryCode(
      valuesCopy.Organic_Phone_Number__c
    );
    setStatus(null);
    updateListing(values, {
      onSuccess: () => {
        ToastHelper.success("Listing has been updated");
      },
      onError: () => {
        ToastHelper.error("There was an error saving your listing");
      },
      onSettled: () => {
        setSubmitting(false);
        Navigation.pop();
      },
    });
  };

  const formik = useFormik({
    initialValues: listingCopy,
    validationSchema: schema,
    onSubmit,
  });

  if (isLoading)
    return (
      <ModalContainer>
        <ScreenLoader />
      </ModalContainer>
    );
  return (
    <ModalContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 32 },
        ]}
        bounces={false}
        enableAutomaticScroll
      >
        <Text style={styles.title}>{listing?.Name}</Text>
        <TextInput
          label="Name"
          value={formik.values.Name}
          onChangeText={formik.handleChange("Name")}
          error={formik.touched.Name ? formik.errors.Name : null}
        />
        <TextInput
          label="Owner Phone"
          value={formik.values.Listing_Owner_Phone_Number__c}
          onChangeText={formik.handleChange("Listing_Owner_Phone_Number__c")}
          error={
            formik.touched.Listing_Owner_Phone_Number__c
              ? formik.errors.Listing_Owner_Phone_Number__c
              : null
          }
        />
        <TextInput
          label="Organic Phone"
          value={formik.values.Organic_Phone_Number__c}
          onChangeText={formik.handleChange("Organic_Phone_Number__c")}
          error={
            formik.touched.Organic_Phone_Number__c
              ? formik.errors.Organic_Phone_Number__c
              : null
          }
        />
        <TextInput
          label="Address"
          value={formik.values.Address_1__c}
          onChangeText={formik.handleChange("Address_1__c")}
          error={
            formik.touched.Address_1__c ? formik.errors.Address_1__c : null
          }
        />
        <TextInput
          label="City"
          value={formik.values.City__c}
          onChangeText={formik.handleChange("City__c")}
          error={formik.touched.City__c ? formik.errors.City__c : null}
        />
        <TextInput
          label="State"
          value={formik.values.State_or_Province__c}
          onChangeText={formik.handleChange("State_or_Province__c")}
          error={
            formik.touched.State_or_Province__c
              ? formik.errors.State_or_Province__c
              : null
          }
        />
        <TextInput
          label="Zip"
          value={formik.values.Zip_Postal_Code__c}
          onChangeText={formik.handleChange("Zip_Postal_Code__c")}
          error={
            formik.touched.Zip_Postal_Code__c
              ? formik.errors.Zip_Postal_Code__c
              : null
          }
        />
        <TextInput
          label="Country Code"
          value={formik.values.Country_Code__c}
          onChangeText={formik.handleChange("Country_Code__c")}
          error={
            formik.touched.Country_Code__c
              ? formik.errors.Country_Code__c
              : null
          }
        />
        <TextInput
          label="About Us"
          value={formik.values.About_Us__c}
          onChangeText={formik.handleChange("About_Us__c")}
          error={formik.touched.About_Us__c ? formik.errors.About_Us__c : null}
          multiline
          inputStyles={{ height: 100 }}
          numberOfLines={4}
        />
        <TextInput
          label="Number of Employees"
          value={formik.values.Number_Of_Employees__c}
          onChangeText={formik.handleChange("Number_Of_Employees__c")}
          error={
            formik.touched.Number_Of_Employees__c
              ? formik.errors.Number_Of_Employees__c
              : null
          }
        />
        <Checkbox
          label="Address Visible"
          value={formik.values.Address_Visible__c}
          onValueChange={(res) => {
            formik.setFieldValue("Address_Visible__c", res);
          }}
        />
        <Checkbox
          label="Same Day Service"
          value={formik.values.Offers_Same_Day_Service__c}
          onValueChange={(res) => {
            formik.setFieldValue("Offers_Same_Day_Service__c", res);
          }}
        />
        <Checkbox
          label="Free Estimates"
          value={formik.values.Provide_Free_Estimates__c}
          onValueChange={(res) => {
            formik.setFieldValue("Provide_Free_Estimates__c", res);
          }}
        />
        <Checkbox
          label="Staff wears masks"
          value={formik.values.Staff_Wears_Masks__c}
          onValueChange={(res) => {
            formik.setFieldValue("Staff_Wears_Masks__c", res);
          }}
        />
        <Checkbox
          label="Is Closed"
          value={formik.values.Is_Closed__c}
          onValueChange={(res) => {
            formik.setFieldValue("Is_Closed__c", res);
          }}
        />
        <Button
          title="Submit"
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        />
        <Button
          title="Cancel"
          variant="outlined"
          containerStyle={{ marginTop: -5 }}
          onPress={() => {
            Navigation.pop();
          }}
          disabled={formik.isSubmitting}
        />
      </KeyboardAwareScrollView>
    </ModalContainer>
  );
};

export default EditLocationScreen;

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
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});

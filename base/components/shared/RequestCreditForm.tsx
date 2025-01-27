import { FormContainer } from "components/atoms";
import BaseBanner from "components/banners/BaseBanner";
import Button from "components/buttons/Button";
import BaseCard from "components/cards/BaseCard";
import Divider from "components/Divider";
import SelectDropdown from "components/inputs/SelectDropdown";
import TextInput from "components/inputs/TextInput";
import useContacts from "features/accounts/api/useContacts";
import { useAuth } from "features/auth";
import useUsersContact from "features/contacts/api/useUsersContact";
import useRequestCredit from "features/leads/requestCredit/api/useRequestCredit";
import useRequestCreditReasons from "features/leads/requestCredit/api/useRequestCreditReturnReasons";
import { Form, Formik, useFormik } from "formik";
import { ToastHelper } from "helpers/ToastHelpers";
import CloseIcon from "icons/CloseIcon";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { object, string } from "yup";

type Props = {
  supplyEventId: string;
  supplyEventType: string;
};

const schema = object().shape({
  supplyEventReturnReason: string().required("This field is required"),
  supplyEventReturnDescription: string().required("This field is required"),
});

const RequestCreditForm = ({ supplyEventId, supplyEventType }: Props) => {
  const { auth } = useAuth();
  const { data: contacts } = useContacts();
  const { data: userContact } = useUsersContact();
  const filteredContacts = contacts.filter((x: any) => x.User_Identity_Id__c);

  const { data: returnReasons } = useRequestCreditReasons({
    supplyEventType,
    supplyEventId,
  });

  const options = returnReasons?.data?.map((reason: any) => {
    reason.label = reason.Name.split("_")
      .map((word: any) => {
        const lowercase = word.toLowerCase();
        const newWord = lowercase[0].toUpperCase() + lowercase.substring(1);
        return newWord;
      })
      .join(" ");
    reason.value = reason.Id;
    return reason;
  });

  const filteredContactsOptions = filteredContacts.map((contact: any) => {
    contact.label = contact.FirstName + contact.LastName;
    contact.value = contact.Postgres_External_Key__c;
    return contact;
  });

  const { mutate: requestCredit } = useRequestCredit();

  const formik = useFormik({
    initialValues: {
      supplyEventId,
      supplyEventReturnReason: "",
      supplyEventReturnDescription: "",
      requesterId: "",
    },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, resetForm, setErrors }) => {
      if (!auth?.isAdmin) {
        values.requesterId = userContact.Postgres_External_Key__c;
      }
      if (!values.requesterId) {
        setSubmitting(false);
        ToastHelper.error("Missing requesterId");
        return;
      }
      if (values.requesterId)
        requestCredit(values, {
          onSuccess: () => {
            resetForm();
            ToastHelper.success("Your request has been submitted");
          },
          onError: () => {
            ToastHelper.error("There was an error saving your listing.");
          },
          onSettled: () => {
            setErrors({});
            setSubmitting(false);
            resetForm();
          },
        });
    },
  });
  return Array.isArray(options) && options?.length ? (
    <View style={styles.formContainer}>
      <SelectDropdown
        placeholder="Select Reason"
        data={options}
        value={formik.values.supplyEventReturnReason}
        setValue={(value: string) => {
          formik.setFieldValue("supplyEventReturnReason", value);
        }}
        label="Return Reason"
        dropDownStyles={{ paddingVertical: 7, fontSize: 14 }}
        renderLeftIcon={() =>
          formik.values.supplyEventReturnReason ? (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                formik.setFieldValue("supplyEventReturnReason", "");
              }}
            >
              <CloseIcon />
            </TouchableOpacity>
          ) : null
        }
        error={formik.errors.supplyEventReturnReason}
      />
      <SelectDropdown
        error={formik.errors.requesterId}
        data={filteredContactsOptions}
        value={formik.values.requesterId}
        placeholder="Select User"
        setValue={(value: string) => {
          formik.setFieldValue("requesterId", value);
        }}
        label="User"
        dropDownStyles={{ paddingVertical: 7, fontSize: 14 }}
        renderLeftIcon={() =>
          formik.values.requesterId ? (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                formik.setFieldValue("requesterId", "");
              }}
            >
              <CloseIcon />
            </TouchableOpacity>
          ) : null
        }
      />
      <TextInput
        multiline
        label="Reason for Return"
        value={formik.values.supplyEventReturnDescription}
        onChangeText={(text) => {
          formik.setFieldValue("supplyEventReturnDescription", text);
        }}
        placeholder="Write here..."
        inputStyles={{ height: 100 }}
        numberOfLines={4}
        onSubmitEditing={Keyboard.dismiss}
        error={formik.errors.supplyEventReturnDescription}
      />
      <Button
        title="Apply"
        onPress={() => {
          formik.handleSubmit();
        }}
      />
    </View>
  ) : (
    <BaseCard containerStyles={{ gap: 10 }}>
      <Text>Request Credit</Text>
      <Divider />
      <BaseBanner
        message={"Credit Unavailable. Lead is more than 4 days old."}
        type="info"
      />
    </BaseCard>
  );
};

export default RequestCreditForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
  },
});

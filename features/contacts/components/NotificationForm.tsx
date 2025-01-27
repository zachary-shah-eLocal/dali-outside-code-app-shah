import { pick } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Switch from "../../../base/components/inputs/Switch";
import { ToastHelper } from "../../../helpers/ToastHelpers";
import useUpdateAccountNotifications from "../api/useEditNotifications";

const pickFields = [
  "Id",
  "Postgres_External_Key__c",
  "Account_Record_Type__c",
  "Allow_Email__c",
  "Allow_SMS__c",
  "Allow_Voice__c",
  "Allow_WhatsApp__c",
  "Contact_Role__c",
];

type Props = {
  accountId: string;
  accountContact: any;
  userContact: any;
};

const NotificationForm = ({
  accountId,
  accountContact,
  userContact,
}: Props) => {
  const { mutate: updateNotification } = useUpdateAccountNotifications();

  const toggleNotification = (refer: string) => {
    const tempAc = { ...accountContact };
    const field = refer?.split(".").pop() || "";

    tempAc[field] = !tempAc[field];
    const pickedValued = pick(tempAc, pickFields);
    pickedValued.accountId = accountId;
    if (field === "Allow_SMS__c" && !userContact.MobilePhone) {
      ToastHelper.error(
        `Must have mobile phone number to turn on sms notifications`
      );
      return;
    }
    if (
      pickedValued.Allow_SMS__c === false &&
      pickedValued.Allow_Email__c === false
    ) {
      ToastHelper.error(
        `Must have at least one notification option selected for each account`
      );

      return;
    }
    if (field === "Allow_SMS__c") {
      setSmsActive((state) => !state);
    } else {
      setEmailActive((state) => !state);
    }
    updateNotification(pickedValued, {
      onError: () => {
        ToastHelper.error(`${field.split("_")[1]} was not updated`);
        console.log(`[ ERROR ] : ${field.split("_")[1]} was not updated`);
      },
    });
  };

  const [emailActive, setEmailActive] = useState<boolean>(
    accountContact.Allow_Email__c
  );
  const [smsActive, setSmsActive] = useState<boolean>(
    accountContact.Allow_SMS__c
  );

  return (
    <>
      <View style={{ flex: 0.25 }}>
        <Switch
          value={emailActive}
          onChange={() => {
            toggleNotification(
              `${accountContact.Id}.${accountContact.Contact_Role__c}.Allow_Email__c`
            );
          }}
        />
      </View>
      <View style={{ flex: 0.25 }}>
        <Switch
          value={smsActive}
          onChange={() => {
            toggleNotification(
              `${accountContact.Id}.${accountContact.Contact_Role__c}.Allow_SMS__c`
            );
          }}
        />
      </View>
    </>
  );
};

export default NotificationForm;

import AnkerText from "components/buttons/AnkerText";
import Button from "components/buttons/Button";
import EmptyCard from "components/cards/EmptyCard";
import { Container } from "components/containers/Container";
import PageView from "components/containers/PageView";
import BaseHeader from "components/headers/BaseHeader";
import ScreenLoader from "components/loaders/ScreenLoader";
import BaseModal from "components/modal/BaseModal";
import { applicationSettings } from "constants/ApplicationSettings";
import useBillingAccount from "features/billing/api/useBillingAccount";
import useMakeDefaultPayment from "features/billing/api/useMakeDefaultPayment";
import useRemovePaymentMethod from "features/billing/api/useRemovePaymentMethod";
import AddPaymentMethod from "features/billing/components/AddPaymentMethod";
import PaymentMethodCard from "features/billing/components/PaymentMethodCard";
import { LinkingHelper } from "helpers/LinkingHelpler";
import { Navigation } from "helpers/Navigationhelper";
import { ToastHelper } from "helpers/ToastHelpers";
import { set } from "lodash";
import { Screens } from "navigation/consts/Screens";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "theme/colors";
import { Header } from "../../../../components/sections/Header";

const ActionComponent = () => {
  const uri = applicationSettings.EXPO_PUBLIC_WEB_URI;
  return (
    <AnkerText
      style={{ marginLeft: "auto" }}
      label="+ Add new"
      onPress={() => {
        // Navigation.navigate(Screens.ADD_PAYMENT_METHOD_SCREEN);
        LinkingHelper.open(uri);
      }}
    />
  );
};

const SetDefaultPrompt = ({ id }: { id: string }) => {
  return (
    <Text style={{ fontSize: 18, fontWeight: "300" }}>
      Are you sure you want the payment method ending in {id} the default?
    </Text>
  );
};
const RemovePrompt = ({ id }: { id: string }) => {
  return (
    <Text style={{ fontSize: 18, fontWeight: "300" }}>
      Are you sure you want remove the payment method ending in{id}?
    </Text>
  );
};

const PaymentMethodsScreen = () => {
  const { data: billingAccount, isLoading } = useBillingAccount();

  const defaultPaymentMethod =
    billingAccount?.recurringPayments?.find((x: any) => x.auto_payment)
      ?.payment_method || {};

  const otherPaymentMethods = billingAccount?.recurringPayments
    ?.filter((x: any) => x.auto_payment === false)
    .map((x: any) => ({ billingId: x.id, ...x.payment_method }));

  const list = defaultPaymentMethod
    ? [defaultPaymentMethod, ...otherPaymentMethods]
    : [];

  const handleDefault = (paymentMethod: any) => {
    setModal({ visible: true, type: "default", method: paymentMethod });
  };
  const handleRemove = (paymentMethod: any) => {
    setModal({ visible: true, type: "remove", method: paymentMethod });
  };

  const initialModalState = {
    visible: false,
    type: null,
    method: null,
  };
  const [modal, setModal] = useState<{
    visible: boolean;
    type: "default" | "remove" | null;
    method: any;
  }>(initialModalState);

  const handleClose = () => {
    setModal(initialModalState);
  };

  const { mutate: removePaymentMethod, isPending: isRemoePending } =
    useRemovePaymentMethod();
  const { mutate: makeDefaultPayment, isPending: isDefaultPending } =
    useMakeDefaultPayment();

  const onRemove = (paymentMethod: any) => {
    removePaymentMethod(paymentMethod.billingId, {
      onError: () => ToastHelper.error("Payment Method could not be removed"),
      onSettled: () => handleClose(),
    });
  };

  const onDefault = (paymentMethod: any) => {
    makeDefaultPayment(paymentMethod.billingId, {
      onError: () =>
        ToastHelper.error("Payment method could not be set as default"),
      onSettled: () => handleClose(),
    });
  };

  const [newMethodModalVisible, setNewMethodModalVisible] = useState(false);

  return (
    <Container>
      <BaseHeader
        title="Payment Methods"
        safeTopInset
        renderActionComponent={<ActionComponent />}
      />
      <PageView>
        <FlatList
          data={list || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PaymentMethodCard
              paymentMethod={item}
              isDefault={defaultPaymentMethod.id === item.id}
              handleRemove={() => {
                handleRemove(item);
              }}
              handleDefault={() => {
                handleDefault(item);
              }}
            />
          )}
          ListFooterComponent={isLoading ? () => <ScreenLoader /> : undefined}
          ListEmptyComponent={<EmptyCard toRender={!isLoading} />}
          contentContainerStyle={styles.container}
        />
      </PageView>
      <BaseModal
        title={
          modal.type === "default"
            ? "Set Default Payment Method"
            : "Remove Payment Method"
        }
        show={modal.visible}
        handleClose={handleClose}
        onClose={() => {
          setModal({ ...modal, visible: false });
        }}
      >
        <>
          {modal.type === "default" ? (
            <SetDefaultPrompt id={modal?.method?.id || ""} />
          ) : (
            <RemovePrompt id={modal?.method?.id || ""} />
          )}
        </>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          <Button
            title="Cancel"
            onPress={handleClose}
            fullWidth={false}
            containerStyle={{
              flex: 1,
              borderWidth: 0.5,
            }}
            variant="outlined"
            textsStyle={{ color: Colors.text }}
          />
          <Button
            title={modal.type === "default" ? "Set Default" : "Remove"}
            onPress={() => {
              modal.type === "default"
                ? onDefault(modal.method)
                : onRemove(modal.method);
            }}
            fullWidth={false}
            containerStyle={{
              flex: 1,
            }}
            loading={isDefaultPending || isRemoePending}
          />
        </View>
      </BaseModal>
    </Container>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },
});

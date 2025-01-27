import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container } from "../../../../base/components/containers/Container";
import BaseHeader from "../../../../base/components/headers/BaseHeader";
import AppLoader from "../../../../base/components/loaders/AppLoader";

import MapView from "components/shared/MapView";
import RequestCreditForm from "components/shared/RequestCreditForm";
import CustomerInformationView from "features/calls/components/CustomerInformationView";
import BaseStatus from "../../../../base/components/statuses/BaseStatus";
import HistoryIcon from "../../../../base/icons/HistoryIcon";
import { useAccountId } from "../../../../features/accounts/AccountContext";
import useCall from "../../../../features/calls/api/useCall";
import { Colors } from "../../../../theme/colors";
import { format } from "../../../../utils";

type Props = {
  route: RouteProp<any>;
};

const CallDetailsScreen = ({ route }: Props) => {
  const supplyEventId = route.params?.supplyEventId;
  const { accountId, setAccountId } = useAccountId();
  const { data: call, isLoading } = useCall(supplyEventId);

  const StatusComponent = () => (
    <View style={{ marginLeft: "auto" }}>
      <BaseStatus
        label={call?.supplyEventStatus}
        type={
          call?.supplyEventStatus === "BILLABLE"
            ? "success"
            : call?.supplyEventStatus === "PENDING"
            ? "info"
            : "error"
        }
      />
    </View>
  );

  if (isLoading) return <AppLoader />;
  return (
    <Container>
      <BaseHeader
        title="Call Details"
        safeTopInset
        renderActionComponent={<StatusComponent />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.pageView}>
        <View style={styles.headContainer}>
          <View style={styles.pairs}>
            <Text style={{ fontWeight: "500", color: Colors.gray }}>
              Call ID:
            </Text>
            <Text style={{ fontWeight: "500" }}>{call.accountId}</Text>
          </View>
          <View style={styles.pairs}>
            <HistoryIcon />
            <Text style={{ fontWeight: "500", color: Colors.gray }}>
              {format.date(call.supplyEventStartDate, "PP")} |{" "}
              {format.date(call.supplyEventStartTime, "K:mm a")}
            </Text>
          </View>
        </View>
        <CustomerInformationView supplyEventId={supplyEventId} />
        <MapView zip={call.postalCode} title="Call Location" />
        <RequestCreditForm
          supplyEventId={supplyEventId}
          supplyEventType="CALL"
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CallDetailsScreen;

const styles = StyleSheet.create({
  pageView: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pairs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ContactCard from "../../../../base/components/cards/ContactCard";
import { Container } from "../../../../base/components/containers/Container";
import BaseHeader from "../../../../base/components/headers/BaseHeader";
import AppLoader from "../../../../base/components/loaders/AppLoader";
import AdditionalInformationView from "../../../../base/components/shared/AdditionalInformationView";
import CustomerInformationView from "../../../../base/components/shared/CustomerInformationView";
import MapView from "../../../../base/components/shared/MapView";
import RequestCreditView from "../../../../base/components/shared/RequestCreditView";
import ServiceRequestedView from "../../../../base/components/shared/ServiceRequestedView";
import BaseStatus from "../../../../base/components/statuses/BaseStatus";
import HistoryIcon from "../../../../base/icons/HistoryIcon";
import { useAccountId } from "../../../../features/accounts/AccountContext";
import useLead from "../../../../features/leads/api/useLead";
import { Colors } from "../../../../theme/colors";
import { format } from "../../../../utils";

type Props = {
  route: RouteProp<any>;
};

const LeadDetailsScreen = ({ route }: Props) => {
  const supplyEventId = route.params?.supplyEventId;
  const { accountId, setAccountId } = useAccountId();
  const { data: lead, isLoading } = useLead(supplyEventId);

  const StatusComponent = () => (
    <View style={{ marginLeft: "auto" }}>
      <BaseStatus
        label={lead?.supplyEventStatus}
        type={
          lead?.supplyEventStatus === "BILLABLE"
            ? "success"
            : lead?.supplyEventStatus === "PENDING"
            ? "info"
            : "error"
        }
      />
    </View>
  );

  if (isLoading) return <AppLoader />;
  if (!lead) return null;
  return (
    <Container>
      <BaseHeader
        title="Lead Details"
        safeTopInset
        renderActionComponent={<StatusComponent />}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.pageView}>
        <View style={styles.headContainer}>
          <View style={styles.pairs}>
            <Text style={{ fontWeight: "500", color: Colors.gray }}>
              Lead ID:
            </Text>
            <Text style={{ fontWeight: "500" }}>{lead.accountId}</Text>
          </View>
          <View style={styles.pairs}>
            <HistoryIcon />
            <Text style={{ fontWeight: "500", color: Colors.gray }}>
              {format.date(lead.supplyEventStartDate, "PP")} |{" "}
              {format.date(lead.supplyEventStartTime, "K:mm a")}
            </Text>
          </View>
        </View>
        <ContactCard
          name={`${lead.firstName}  ${lead.lastName}`}
          email={lead.email}
          phone={lead.phoneNumber}
        />
        <CustomerInformationView supplyEventId={supplyEventId} />
        <MapView zip={lead?.postalCode} title="Lead Location" />
        <ServiceRequestedView supplyEventId={supplyEventId} />
        <AdditionalInformationView supplyEventId={supplyEventId} />
        <RequestCreditView
          supplyEventId={supplyEventId}
          supplyEventType="WEB_LEAD"
          eventDate={lead.supplyEventStartTime}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LeadDetailsScreen;

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

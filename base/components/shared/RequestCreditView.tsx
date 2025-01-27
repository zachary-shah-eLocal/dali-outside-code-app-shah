import ULComponent from "components/ULComponent";
import { intervalToDuration } from "date-fns";
import React from "react";
import { StyleSheet, View } from "react-native";
import useLead from "../../../features/leads/api/useLead";
import { format } from "../../../utils";
import BaseBanner from "../banners/BaseBanner";
import BaseCard from "../cards/BaseCard";
import CustomTable from "../CustomTable";
import Divider from "../Divider";
import Text from "../Text";
import RequestCreditForm from "./RequestCreditForm";
type Props = {
  supplyEventId: string;
  supplyEventType: string;
  eventDate: string;
};

function getStatus(status: string) {
  if (status === "Approved") {
    return "Approved";
  }
  if (status === "Return_Rejected" || status === "Closed") {
    return "Rejected";
  }
  return "Pending";
}

const isLessThanFourDaysOld = (dateInterval: any) =>
  dateInterval.years === 0 &&
  dateInterval.months === 0 &&
  dateInterval.days < 10;

const RequestCreditView = ({
  supplyEventId,
  supplyEventType,
  eventDate,
}: Props) => {
  const { data: lead } = useLead(supplyEventId);
  const dateInterval = intervalToDuration({
    start: new Date(Date.now()),
    end: new Date(eventDate),
  });
  let showForm = false;
  if (isLessThanFourDaysOld(dateInterval)) {
    showForm = true;
  }
  const tableData = [
    [
      "Case Opened",
      format.date(lead.salesforceDTO.salesforceCaseOpenedTime, "PP"),
    ],
    ["Status", getStatus(lead.salesforceDTO.salesforceStatus)],
  ];
  return (
    <BaseCard>
      <Text style={styles.title}>Request Credit</Text>
      <Divider />
      <View style={styles.content}>
        {lead.salesforceDTO ? (
          <>
            <BaseBanner message="Your case has been submitted" type="info" />
            <CustomTable
              data={tableData}
              columnStyles={{ 0: { flex: 0.7 }, 1: { flex: 1 } }}
              columnTextStyles={{
                0: { fontWeight: "500", opacity: 0.4, fontSize: 14 },
                1: { fontSize: 16, fontWeight: "300" },
              }}
            />
          </>
        ) : (
          <>
            {showForm ? (
              <>
                <View
                  style={{
                    backgroundColor: "#fef7e8",
                    borderColor: "#f7c875",
                    borderRadius: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    gap: 5,
                  }}
                >
                  <Text style={{ color: "#3C4075" }}>
                    Credits for invalid leads must be requested within 4
                    calendar days. Invalid leads are as follows:
                  </Text>
                  <ULComponent
                    list={[
                      "Disconnected phone number",
                      "Wrong phone number",
                      "Outside coverage area",
                      "Wrong category",
                    ]}
                    textStyles={{ color: "#3C4075" }}
                  />
                  <Text style={{ color: "#3C4075" }}>
                    Please note that leads are still considered valid even if
                    the consumer does not call you back or does not answer their
                    phone.
                  </Text>
                  <Text style={{ color: "#3C4075" }}>
                    You can submit the form below to have us review your lead
                  </Text>
                </View>
                <RequestCreditForm
                  supplyEventId={supplyEventId}
                  supplyEventType={supplyEventType}
                />
              </>
            ) : (
              <Text>Credit Unvailable Lead is more then 4 days old</Text>
            )}
          </>
        )}
      </View>
    </BaseCard>
  );
};

export default RequestCreditView;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  content: {
    marginTop: 10,
    gap: 14,
  },
});

import Accordion from "components/accordions/Accordion";
import CustomTable from "components/CustomTable";
import Text from "components/Text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { format } from "utils/index";
import useCampaign from "../api/useCampaign";

type Props = { id: string };

const ScheduleAccordion = ({ id }: Props) => {
  const { data: campaign } = useCampaign(id);
  const schedule = campaign?.Ad_Campaign_Schedules__r.records;

  const getFormattedData = () => {
    const formattedData: any = [];
    schedule.forEach((row: any, index: any) => {
      let value = null;
      const { Start_Time_Slot_1__c, End_Time_Slot_1__c, Day_Of_Week__c } = row;
      if (
        Start_Time_Slot_1__c === "00:00:00.000Z" &&
        End_Time_Slot_1__c === "23:59:59.000Z"
      ) {
        value = "24 Hours";
      } else {
        const dateNotTime = new Date().toISOString().split("T")[0];
        const start = `${dateNotTime}T${Start_Time_Slot_1__c.split("Z")[0]}`;
        const end = `${dateNotTime}T${End_Time_Slot_1__c.split("Z")[0]}`;
        value = `${format.date(new Date(start), "p")} - ${format.date(
          new Date(end),
          "p"
        )}`;
      }
      formattedData.push([Day_Of_Week__c, value]);
    });
    return formattedData;
  };

  const tableData = getFormattedData();
  return (
    <Accordion renderExpandButton={false}>
      <Accordion.Header>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.accordionTitle}>Schedule</Text>
        </View>
      </Accordion.Header>
      <Accordion.Content>
        <View>
          <CustomTable data={tableData} />
        </View>
      </Accordion.Content>
    </Accordion>
  );
};

export default ScheduleAccordion;

const styles = StyleSheet.create({
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});

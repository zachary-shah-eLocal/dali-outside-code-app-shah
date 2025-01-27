import React from "react";
import { StyleSheet, View } from "react-native";
import useLead from "../../../features/leads/api/useLead";
import { LinkingHelper } from "../../../helpers/LinkingHelpler";
import { Colors } from "../../../theme/colors";
import AnkerText from "../buttons/AnkerText";
import BaseCard from "../cards/BaseCard";
import Divider from "../Divider";
import Text from "../Text";

type Props = {
  supplyEventId: string;
};

const QA = ({ q, a }: { q: string; a: string }) => {
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.key}>Q: {q}</Text>
      <Text style={styles.value}>A: {a}</Text>
    </View>
  );
};

const AdditionalInformationView = ({ supplyEventId }: Props) => {
  const { data: lead } = useLead(supplyEventId);
  console.log(lead);
  return (
    <BaseCard>
      <Text style={styles.title}>Additional Information</Text>
      <Divider />
      <View style={styles.content}>
        <Text style={styles.key}>Description</Text>
        <Text style={styles.value}>
          {lead.webLeadSupplyEventDTO?.webLeadSubmissionDescription || "N/A"}
        </Text>
        <Text style={styles.key}>Questions</Text>
        {lead.questionAnswer ? (
          lead.questionAnswer.map((i, k) => (
            <QA key={k} q={i.question} a={i.answer} />
          ))
        ) : (
          <Text style={styles.value}>N/A</Text>
        )}
      </View>
    </BaseCard>
  );
};

export default AdditionalInformationView;

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  key: {
    color: Colors.gray,
  },
  value: {
    fontWeight: "500",
  },
});

import BaseCard from "components/cards/BaseCard";
import ScreenLoader from "components/loaders/ScreenLoader";
import BaseModal from "components/modal/BaseModal";
import Text from "components/Text";
import ULComponent from "components/ULComponent";
import IOIcon from "icons/IOIcon";
import StatusInfoIcon from "icons/status/StatusInfoIcon";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { format } from "utils/index";
import useCampaign from "../api/useCampaign";

type Props = {
  id: string;
};

const CampaignTypeCard = ({ id }: Props) => {
  const { data: campaign, isLoading } = useCampaign(id);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(true);
  };

  return (
    <BaseCard>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
        >
          <IOIcon />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                width: "100%",
              }}
            >
              <Text style={{ fontSize: 16, lineHeight: 20, opacity: 0.5 }}>
                Type
              </Text>
              <StatusInfoIcon width={15} height={15} />
            </View>
            <Text style={{ fontSize: 16, lineHeight: 20, fontWeight: "600" }}>
              {format.campaignDetailsType(campaign.Product_VConfig__r?.Name)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <BaseModal
        show={isModalVisible}
        title="Campaign Details"
        handleClose={() => setIsModalVisible(false)}
      >
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          <View>
            <Text style={styles.header}>Valid Calls</Text>
            <Text style={styles.p}>
              Any call where the intent of the caller was to speak with a
              professional within your category and geographic service area or
              that has met the duration as specified in your campaign.
            </Text>
          </View>
          <View>
            <Text style={styles.header}>Duplicate Calls:</Text>
            <Text style={styles.p}>
              You will not be charged for duplicate calls from the same caller
              ID within a 30 day period of time.
            </Text>
            <Text style={styles.p}>
              For all Pay for Performance Plans, including those that measure
              Valid Calls using a time threshold, any call that goes unanswered,
              receives a busy signal, reaches a voice mail, or the caller is
              told that they will be called back will be considered a Valid Call
              even if the duration of the call did not otherwise meet the
              duration threshold.
            </Text>
          </View>
          <View>
            <Text style={styles.header}>
              Credits (if eligible) for invalid calls must be requested within 4
              calendar days. Invalid calls are as follows:
            </Text>
          </View>
          <ULComponent
            textStyles={styles.p}
            list={[
              "Wrong number",
              "Wrong category",
              "Wrong geography",
              "Solicitation",
            ]}
          />
        </ScrollView>
      </BaseModal>
    </BaseCard>
  );
};

export default CampaignTypeCard;

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
  },
  p: {
    fontSize: 14,
    lineHeight: 22.4,
    opacity: 0.8,
  },
});

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AnkerText from "../../../base/components/buttons/AnkerText";
import BaseCard from "../../../base/components/cards/BaseCard";
import BaseStatus from "../../../base/components/statuses/BaseStatus";
import Text from "../../../base/components/Text";
import MailIcon from "../../../base/icons/card/MailIcon";
import CategoryIcon from "../../../base/icons/CategoryIcon";
import CurrencyIcon from "../../../base/icons/CurrencyIcon";
import PhoneIcon from "../../../base/icons/headerMenu/PhoneIcon";
import ShowIcon from "../../../base/icons/ShowIcon";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Screens } from "../../../navigation/consts/Screens";
import { Colors } from "../../../theme/colors";
import { format } from "../../../utils";

type Props = {
  lead: any;
};

const LeadCard = ({ lead = {} }: Props) => {
  const {
    serviceName,
    phoneNumber,
    categoryName,
    email,
    price,
    supplyEventStatus,
    listingName,
    adCampaignName,
    supplyEventStartTime,
  } = lead;

  const handleShowLeadPress = () => {
    Navigation.navigate(Screens.SUMMERY_LEAD_DETAILS_SCREEN, {
      supplyEventId: lead.supplyEventId,
    });
  };
  const handleCampingPress = () => {};
  return (
    <BaseCard containerStyles={{ paddingBottom: 0, paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.head}>
          <Text style={styles.date}>
            {format.date(supplyEventStartTime, "MMM dd, yyyy | hh:ss")}
          </Text>
          <BaseStatus
            label={supplyEventStatus}
            type={
              supplyEventStatus === "BILLABLE"
                ? "success"
                : supplyEventStatus === "PENDING"
                ? "info"
                : "error"
            }
          />
        </View>
        <Text style={styles.title}>{serviceName}</Text>
        <View style={{ gap: 8, marginBottom: 12 }}>
          <View style={[styles.row]}>
            <View style={styles.pair}>
              <PhoneIcon />
              <Text style={styles.item}>{format.phoneNumber(phoneNumber)}</Text>
            </View>
            <View style={styles.pair}>
              <MailIcon />
              <Text style={styles.item}>{email}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.pair}>
              <CategoryIcon />
              <Text style={styles.item}>{categoryName}</Text>
            </View>
            <View style={styles.pair}>
              <CurrencyIcon />
              <Text style={styles.item}>{format.currency(price)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <AnkerText
              textStyle={styles.link}
              label={listingName}
              onPress={handleCampingPress}
            />
            <View style={styles.pair}>
              <ShowIcon />
              <AnkerText
                textStyle={styles.link}
                label={"View lead"}
                onPress={handleShowLeadPress}
              />
            </View>
            {/* <View style={styles.pair}></View> */}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleCampingPress}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{adCampaignName}</Text>
        </View>
      </TouchableOpacity>
    </BaseCard>
  );
};

export default LeadCard;

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pair: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  item: {},
  link: {
    color: "#e65333",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  footer: {
    backgroundColor: Colors.info[90],
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  date: {
    fontSize: 10,
    fontWeight: "500",
  },
  footerText: {
    fontWeight: "500",
  },
});

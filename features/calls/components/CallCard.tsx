import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AnkerText from "../../../base/components/buttons/AnkerText";
import BaseCard from "../../../base/components/cards/BaseCard";
import BaseStatus from "../../../base/components/statuses/BaseStatus";
import Text from "../../../base/components/Text";
import CategoryIcon from "../../../base/icons/CategoryIcon";
import CurrencyIcon from "../../../base/icons/CurrencyIcon";
import IncomingCallIcon from "../../../base/icons/IncomingCallIcon";
import Location2SIcon from "../../../base/icons/Location2SIcon";
import LocationIconS from "../../../base/icons/LocationIconS";
import ShowIcon from "../../../base/icons/ShowIcon";
import TimerIcon from "../../../base/icons/TimerIcon";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Screens } from "../../../navigation/consts/Screens";
import { Colors } from "../../../theme/colors";
import { format } from "../../../utils";

type Props = {
  call: any;
};

const CallCard = ({ call = {} }: Props) => {
  const {
    price,
    supplyEventStatus,
    adCampaignName,
    supplyEventStartTime,
    postalCode,
    supplyCallEventDTO,
  } = call;

  const handleShowCallPress = () => {
    Navigation.navigate(Screens.SUMMERY_CALL_DETAILS_SCREEN, {
      supplyEventId: call.supplyEventId,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <IncomingCallIcon />
          <Text style={styles.title}>
            {format.phoneNumber(supplyCallEventDTO?.callerNumber)}
          </Text>
        </View>
        <View style={{ gap: 8, marginBottom: 12 }}>
          <View style={[styles.row]}>
            <View style={styles.pair}>
              <LocationIconS />
              <Text style={styles.item}>{postalCode}</Text>
            </View>
            <View style={styles.pair}>
              <Location2SIcon />
              {/* TODO: correct field */}
              <Text style={styles.item}>{""}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.pair}>
              <TimerIcon />
              <Text style={styles.item}>
                {format.seconds(supplyCallEventDTO?.callDuration)} Min
              </Text>
            </View>
            <View style={styles.pair}>
              <CurrencyIcon />
              <Text style={styles.item}>{format.currency(price)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View />
            <View style={styles.pair}>
              <ShowIcon />
              <AnkerText
                textStyle={styles.link}
                label={"View Call Details"}
                onPress={handleShowCallPress}
              />
            </View>
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

export default CallCard;

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

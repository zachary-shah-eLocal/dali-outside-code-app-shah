import AnkerText from "components/buttons/AnkerText";
import BaseCard from "components/cards/BaseCard";
import Text from "components/Text";
import AmexIcon from "icons/AmexIcon";
import DiscoverIcon from "icons/DiscoverIcon";
import MastercardIcon from "icons/MastercardIcon";
import StarIcon from "icons/StarIcon";
import VisaIcon from "icons/VisaIcon";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "theme/colors";

const getCardLogo = (cardType: string) => {
  switch (cardType) {
    case "MASTERCARD":
      return <MastercardIcon />;
    case "VISA":
      return <VisaIcon />;
    case "DISCOVER":
      return <DiscoverIcon />;
    case "AMEX":
      return <AmexIcon />;
    default:
      return null;
  }
};

const PaymentMethodCard = ({
  paymentMethod,
  isDefault,
  handleRemove,
  handleDefault,
}: any) => {
  const {
    id,
    last_four,
    card_type,
    expiration_date,
    nickname,
    payment_method_type,
  } = paymentMethod;

  return (
    <BaseCard containerStyles={{ gap: 10 }}>
      <View style={styles.row}>
        {getCardLogo(card_type)}
        <Text
          style={{
            fontSize: 16,
            marginLeft: 8,
            color: Colors.gray,
            fontWeight: "500",
          }}
        >
          XXXX XXXX XXXX
        </Text>
        <Text style={{ fontSize: 16, marginLeft: 6, fontWeight: "600" }}>
          {last_four}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.gray,
            fontWeight: "500",
          }}
        >
          Exp Date:
        </Text>
        <Text style={{ fontSize: 16, marginLeft: 6, fontWeight: "600" }}>
          {expiration_date}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 20,
            color: Colors.gray,
            fontWeight: "500",
          }}
        >
          Type:
        </Text>
        <Text style={{ fontSize: 16, marginLeft: 6, fontWeight: "600" }}>
          {payment_method_type.includes("card")
            ? "Credit Card"
            : "Bank Account"}
        </Text>
      </View>
      {isDefault ? (
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Default</Text>
      ) : (
        <View style={styles.row}>
          <AnkerText
            icon={<StarIcon />}
            label="Set Default"
            textStyle={{ fontWeight: "500", color: Colors.text }}
            onPress={handleDefault}
          />
          <AnkerText
            label="Remove"
            textStyle={{ fontWeight: "500", color: Colors.text }}
            style={{ marginLeft: 20 }}
            onPress={handleRemove}
          />
        </View>
      )}
    </BaseCard>
  );
};

export default PaymentMethodCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    alignItems: "center",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import { LinkingHelper } from "../../../helpers/LinkingHelpler";
import { Colors } from "../../../theme/colors";
import MailIconC from "../../icons/MailIconC";
import PhoneIconC from "../../icons/PhoneIconC";
import Text from "../Text";
import RoundButton from "../buttons/RoundButton";

type Props = {
  name: string;
  phone: string;
  email: string;
};

const ContactCard = ({ name, phone, email }: Props) => {
  const handleMailPress = () => {
    LinkingHelper.open("mailto:" + email);
  };
  const handlePhonePress = () => {
    LinkingHelper.open("tel:" + phone);
  };
  return (
    <View style={styles.container}>
      <View style={{ gap: 1 }}>
        <Text style={{ color: "#DFE0ED", fontSize: 11, fontWeight: "500" }}>
          Customer Name
        </Text>
        <Text
          style={{
            color: "#DFE0ED",
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 22.5,
          }}
        >
          {name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <RoundButton icon={<MailIconC />} onPress={handleMailPress} />
        <RoundButton icon={<PhoneIconC />} onPress={handlePhonePress} />
      </View>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#067AAC",
    borderRadius: 15,
    padding: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

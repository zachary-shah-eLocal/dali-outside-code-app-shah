import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { StyleSheet, View } from "react-native";
import useLead from "../../../features/leads/api/useLead";
import { LinkingHelper } from "../../../helpers/LinkingHelpler";
import { Colors } from "../../../theme/colors";
import AnkerText from "../buttons/AnkerText";
import BaseCard from "../cards/BaseCard";
import Divider from "../Divider";
import Map from "../Map";
import Text from "../Text";

const API_KEY = "AIzaSyAxnnlhNNNh4uCkLEsgDcEKCZncFXFUiik";

type Props = {
  zip: string;
  title: string;
};

const MapView = ({ zip, title }: Props) => {
  const [center, setCenter] = useState<any>(null);

  useEffect(() => {
    Geocode.setApiKey(API_KEY);
    Geocode.enableDebug();
    Geocode.fromAddress(zip).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [zip]);

  if (!zip || !center) return null;
  return (
    <BaseCard>
      <Text style={styles.title}>{title}</Text>
      <Divider />
      {center && <Map region={center} />}
    </BaseCard>
  );
};

export default MapView;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
});

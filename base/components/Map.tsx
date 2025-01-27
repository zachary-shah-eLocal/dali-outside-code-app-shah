import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

const Map = ({ region }: Props) => {
  return (
    <View style={{ height: 200, width: "100%" }}>
      <MapView
        // provider="google"
        region={region}
        toolbarEnabled={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsUserLocation={false}
        style={{ ...StyleSheet.absoluteFillObject }}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;

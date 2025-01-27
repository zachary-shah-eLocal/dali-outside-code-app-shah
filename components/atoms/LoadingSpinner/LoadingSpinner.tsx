import React, { useEffect } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { styles } from "./LoadingSpinnerStyles";

export const LoadingSpinner = () => {
  const spinValue = new Animated.Value(0);

  // define animation function
  const startSpinner = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  // call function
  useEffect(() => {
    startSpinner();
    // if component stops
    return () => {
      spinValue.stopAnimation();
    };
  }, []);

  // define the actual motion
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.ldsRingContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <View style={styles.ldsRing} />
      </Animated.View>
    </View>
  );
};

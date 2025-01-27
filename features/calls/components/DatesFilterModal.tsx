import { end } from "@popperjs/core";
import { isEqual } from "date-fns";
import React, { useCallback, useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Portal } from "react-native-portalize";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../base/components/buttons/Button";
import ModalHeader from "../../../base/components/headers/ModalHeader";
import { Colors } from "../../../theme/colors";
import { format } from "../../../utils";
// today of type in string
const today = new Date().toISOString().split("T")[0];

type Props = {
  title: string;
  handleClose: () => void;
  filters: any;
  setFilters: any;
};

const { height, width } = Dimensions.get("window");

const DatesFilterModal = ({
  title,
  handleClose,
  filters,
  setFilters,
}: Props) => {
  const handleSubmit = () => {
    const made = {
      startDate,
      endDate,
    };
    setFilters({ ...filters, ...made });
    handleClose();
  };

  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  useEffect(() => {
    if (filters.startDate && !isEqual(filters.startDate, filters.endDate)) {
      setStartDate(format.date(filters.startDate, "yyyy-MM-dd"));
      setEndDate(format.date(filters.endDate, "yyyy-MM-dd"));
    }
  }, []);

  const handleDayPress = (day: any) => {
    if (day.dateString === startDate) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    if (startDate && !endDate) {
      if (new Date(startDate) < new Date(day.dateString)) {
        setEndDate(day.dateString);
      } else {
        setStartDate(day.dateString);
        setEndDate(null);
      }
    } else if (!startDate) {
      setStartDate(day.dateString);
    } else {
      setStartDate(day.dateString);
      setEndDate(null);
    }
  };
  const markedDates = useMemo(() => {
    let dates: any = {};
    if (startDate) {
      dates[startDate] = {
        startingDay: true,
        selected: true,
        color: Colors.secondary,
      };
    }
    if (endDate) {
      dates[endDate] = {
        endingDay: true,
        selected: true,
        color: Colors.secondary,
      };
      const start = startDate ? new Date(startDate) : new Date();
      const end = new Date(endDate);
      end.setDate(end.getDate() - 1);
      while (start < end) {
        start.setDate(start.getDate() + 1);
        dates[start.toISOString().split("T")[0]] = {
          color: "rgba(246, 252, 255, 1)",
          selected: true,
          textColor: Colors.black,
        };
      }
    }
    return dates;
  }, [startDate, endDate]);

  return (
    <Portal>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.modal}>
            <ModalHeader title={title} onPress={handleClose} />
            <View style={styles.modalContent}>
              <Calendar
                maxDate={today}
                theme={{
                  textDayFontSize: 12,
                  textDayFontWeight: "500",
                  "stylesheet.day.period": {
                    wrapper: {
                      alignItems: "center",
                      alignSelf: "stretch",
                      marginLeft: -2,
                      borderRadius: 2,
                      overflow: "hidden",
                    },
                    leftFiller: {
                      height: 26,
                      flex: 1,
                      marginLeft: 50,
                    },
                  },
                }}
                markedDates={markedDates}
                onDayPress={handleDayPress}
                markingType="period"
              />
              <View style={styles.buttonsContainer}>
                <View style={{ flex: 1 }}>
                  <Button
                    variant="outlined"
                    title="Cancel"
                    onPress={handleClose}
                    fullWidth={true}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    title="Submit"
                    onPress={handleSubmit}
                    fullWidth={true}
                  />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Portal>
  );
};

export default DatesFilterModal;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  safeContainer: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: "100%",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  modalContent: {
    marginVertical: 20,
    paddingHorizontal: 20,
    maxHeight: "88%",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
});

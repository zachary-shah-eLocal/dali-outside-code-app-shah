import ACDropDown from "components/inputs/ACDropDown";
import { useFormik } from "formik";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Portal } from "react-native-portalize";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../base/components/buttons/Button";
import ModalHeader from "../../../base/components/headers/ModalHeader";
import SelectDropdown from "../../../base/components/inputs/SelectDropdown";
import TextInputOptions from "../../../base/components/inputs/TextInputOptions";
import CloseIcon from "../../../base/icons/CloseIcon";
import useAccountFilterOptions from "../api/useAccountFilterOptions";

type Props = {
  title: string;
  filters: any;
  setFilters: any;
  handleClose: () => void;
  resetFilters: () => void;
};

const { height, width } = Dimensions.get("window");

const FilterModal = ({
  title,
  filters,
  setFilters,
  handleClose,
  resetFilters,
}: Props) => {
  const { data: filterOptions } = useAccountFilterOptions();
  const categories = filterOptions.categories.map((x: string) => ({
    label: x,
    value: x,
  }));
  const services = filterOptions.services.map((x: string) => ({
    label: x,
    value: x,
  }));

  const initialValues = {
    filterValue: filters.filterValue,
    filterKey: filters.filterKey,
    category: filters.category,
    service: filters.service,
    adCampaignName: filters.adCampaignName,
    listingName: filters.listingName,
  };

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const made = Object.keys(values).reduce(
      (acc: { [key: string]: any }, filterKey) => {
        const filterValue = values[filterKey];
        if (filterValue?.value) {
          acc[filterKey] = filterValue.value;
        } else {
          acc[filterKey] = filterValue;
        }
        return acc;
      },
      {}
    );

    setFilters({ ...filters, ...made });
    setSubmitting(false);
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleReset = () => {
    formik.resetForm({
      values: {
        filterValue: "",
        filterKey: "phonNumber",
        category: "",
        service: "",
        adCampaignName: "",
        listingName: "",
      },
    });
    resetFilters();
    handleClose();
  };

  const clearButton = (onPress: any) => {
    return (
      <TouchableOpacity
        style={{ transform: [{ scale: 0.5 }] }}
        onPress={onPress}
      >
        <CloseIcon />
      </TouchableOpacity>
    );
  };

  const fetchOptions = (inputValue: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
          { label: "Option 4", value: "option4" },
          { label: "Option 5", value: "option5" },
          { label: "Option 6", value: "option6" },
        ]);
      }, 1000);
    });
  };

  return (
    <Portal>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.modal}>
            <ModalHeader title={title} onPress={handleClose} />
            <View style={styles.modalContent}>
              <KeyboardAwareScrollView
                contentContainerStyle={{ gap: 20 }}
                bounces={false}
              >
                <TextInputOptions
                  label="Search"
                  optionsValue={formik.values.filterKey}
                  optionsOnchange={(res: any) => {
                    formik.setFieldValue("filterKey", res);
                  }}
                  defaultValue="phoneNumber"
                  optionsValues={[
                    { label: "Name", value: "name" },
                    { label: "Phone", value: "phoneNumber" },
                    { label: "Email", value: "email" },
                  ]}
                  value={formik.values.filterValue}
                  onChangeText={(value) => {
                    formik.setFieldValue("filterValue", value);
                  }}
                />
                <View
                  style={{
                    zIndex: 1000,
                  }}
                >
                  <ACDropDown
                    label="Campaign"
                    data={[]}
                    fetchOptions={fetchOptions}
                  />
                </View>
                {/* <SelectDropdown
                  label="Campaign"
                  data={[]}
                  dropDownStyles={{ paddingVertical: 7, fontSize: 14 }}
                /> */}
                <SelectDropdown
                  label="Listing"
                  data={[]}
                  dropDownStyles={{ paddingVertical: 7, fontSize: 14 }}
                />
                <SelectDropdown
                  label="Category"
                  dropDownStyles={{ paddingVertical: 7, fontSize: 14 }}
                  data={categories}
                  value={formik.values.category}
                  setValue={(value) => {
                    formik.setFieldValue("category", value);
                  }}
                  renderLeftIcon={() =>
                    formik.values.category ? (
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          formik.setFieldValue("category", "");
                        }}
                      >
                        <CloseIcon />
                      </TouchableOpacity>
                    ) : null
                  }
                />
                <SelectDropdown
                  data={services}
                  value={formik.values.service}
                  setValue={(value) => {
                    formik.setFieldValue("service", value);
                  }}
                  label="Service"
                  dropDownStyles={{ paddingVertical: 7, fontSize: 14 }}
                  renderLeftIcon={() =>
                    formik.values.service ? (
                      <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={() => {
                          formik.setFieldValue("service", "");
                        }}
                      >
                        <CloseIcon />
                      </TouchableOpacity>
                    ) : null
                  }
                />
                <View style={styles.buttonsContainer}>
                  <View style={{ flex: 1 }}>
                    <Button
                      variant="outlined"
                      title="Clear"
                      onPress={handleReset}
                      fullWidth={true}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button
                      title="Submit"
                      onPress={formik.handleSubmit}
                      fullWidth={true}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Portal>
  );
};

export default FilterModal;

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
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
});

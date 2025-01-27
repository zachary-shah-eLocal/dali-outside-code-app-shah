import OptionButton from "components/buttons/OptionButton";
import FiltersContainer from "components/filters/FiltersContainer";
import { useAccountId } from "features/accounts/AccountContext";
import DatesFilterModal from "features/calls/components/DatesFilterModal";
import ArrowDownOption from "icons/ArrowDownOption";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { format } from "utils/index";

type Props = {
  filters: any;
  setFilters: any;
};

const BillingFilters = ({ filters, setFilters }: Props) => {
  const [datesFilterActive, setDatesFilterActive] = useState(false);
  const openFilters = () => {
    setDatesFilterActive(true);
  };
  const closeFilters = () => {
    setDatesFilterActive(false);
  };

  const { accountId } = useAccountId();
  return (
    <FiltersContainer>
      <OptionButton
        label={`${format.date(
          filters.startDate,
          "MMM d, yyyy"
        )} - ${format.date(filters.endDate, "MMM d, yyyy")}`}
        onPress={() => {
          openFilters();
        }}
        iconEnd={<ArrowDownOption />}
      />

      {datesFilterActive && (
        <DatesFilterModal
          title="Dates"
          handleClose={closeFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </FiltersContainer>
  );
};

export default BillingFilters;

const styles = StyleSheet.create({});

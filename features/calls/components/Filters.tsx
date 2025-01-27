import * as FileSystem from "expo-file-system";
import { set } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as Sharing from "expo-sharing";
import OptionButton from "../../../base/components/buttons/OptionButton";
import FiltersContainer from "../../../base/components/filters/FiltersContainer";
import ArrowDownOption from "../../../base/icons/ArrowDownOption";
import CloseIcon from "../../../base/icons/CloseIcon";
import DocumentIconOption from "../../../base/icons/DocumentIconOption";
import FilterIconOption from "../../../base/icons/FilterIconOption";
import { ToastHelper } from "../../../helpers/ToastHelpers";
import { ArrowIcon } from "../../../svgs";
import { format } from "../../../utils";
import { useAccountId } from "../../accounts/AccountContext";
import { getCallsCSV } from "../api/getCallsCsv";
import DatesFilterModal from "./DatesFilterModal";
import FilterModal from "./FilterModal";

type Props = {
  filters: any;
  setFilters: any;
  resetFilters: any;
  calendarChanged: any;
};

const Filters = ({
  filters,
  setFilters,
  resetFilters,
  calendarChanged,
}: Props) => {
  const [filtersActive, setFiltersActive] = useState(false);
  const [datesFilterActive, setDatesFilterActive] = useState(false);

  const openFilters = (refer: string) => {
    refer === "dates" ? setDatesFilterActive(true) : setFiltersActive(true);
  };
  const closeFilters = () => {
    setFiltersActive(false);
    setDatesFilterActive(false);
  };
  const { accountId } = useAccountId();

  const handleExportCSV = async () => {
    try {
      const content = await getCallsCSV({ queryKey: [accountId, filters] });
      const path = `${FileSystem.documentDirectory}/calls.csv`;
      const tempFilePath = `${FileSystem.cacheDirectory}temp.csv`;
      await FileSystem.writeAsStringAsync(tempFilePath, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await FileSystem.downloadAsync(tempFilePath, path);
      ToastHelper.success("Successfully saved CSV file.");
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
      } else {
        ToastHelper.error("Sharing is not available on this device");
      }
    } catch (error) {
      ToastHelper.error("Failed to save CSV file.");
    }
  };

  const renderActiveFilterOptions = useMemo(() => {
    const keysTotUse = [
      "filterValue",
      "listingName",
      "category",
      "service",
      "campaignListingId",
      "campaignId",
      "adCampaignName",
    ];
    const activeFilters = keysTotUse
      .filter(
        (key) =>
          filters[key] !== undefined &&
          filters[key] !== null &&
          filters[key] !== ""
      )
      .map((key) => ({ key: key, value: filters[key] }));
    return activeFilters;
  }, [filters]);

  return (
    <FiltersContainer>
      <OptionButton
        label="Export CSV"
        onPress={handleExportCSV}
        icon={<DocumentIconOption />}
      />
      <OptionButton
        label="Filters"
        onPress={() => {
          openFilters("filters");
        }}
        icon={<FilterIconOption />}
        iconEnd={<ArrowDownOption />}
      />
      <OptionButton
        label={`${format.date(
          filters.startDate,
          "MMM d, yyyy"
        )} - ${format.date(filters.endDate, "MMM d, yyyy")}`}
        onPress={() => {
          openFilters("dates");
        }}
        iconEnd={<ArrowDownOption />}
      />
      {renderActiveFilterOptions.map((filter, index) => (
        <OptionButton
          containerStyles={{ backgroundColor: "#F4F5FE" }}
          key={index.toString()}
          label={filter.value}
          iconEnd={
            <TouchableOpacity
              onPress={() => {
                setFilters({ ...filters, [filter.key]: "" });
              }}
            >
              <CloseIcon width={14} height={14} />
            </TouchableOpacity>
          }
        />
      ))}
      {filtersActive && (
        <FilterModal
          title="Filters"
          filters={filters}
          setFilters={setFilters}
          handleClose={closeFilters}
          resetFilters={resetFilters}
        />
      )}
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

export default Filters;

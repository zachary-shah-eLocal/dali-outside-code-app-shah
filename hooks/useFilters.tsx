import { isEqual } from "lodash";
import { useState } from "react";

const inital = { page: 1, size: 20 };

function useFilters(
  initalState: any = {},
  onSetFilters?: (filters: any) => void
) {
  const [filters, setFilters] = useState({ ...inital, ...initalState });
  const [confirmedFilters, setConfirmedFilters] = useState(initalState);

  const handleSetFilters = (filterUpdate: any) => {
    const { ...tempFilters } = filters;
    setFilters({ ...tempFilters, ...filterUpdate });
    onSetFilters && onSetFilters({ ...tempFilters, ...filterUpdate });
  };

  const confirmFilters = () => setConfirmedFilters(filters);
  const cancelEdit = () => setFilters(confirmedFilters);
  const resetFilters = () => setFilters(initalState);

  return {
    filters,
    setFilters: handleSetFilters,
    confirmFilters,
    confirmedFilters,
    isEditing: !isEqual(filters, confirmedFilters),
    calendarChanged: !isEqual(
      { startDate: filters.startDate, endDate: filters.endDate },
      { startDate: initalState.startDate, endDate: initalState.endDate }
    ),
    cancelEdit,
    resetFilters,
  };
}

export default useFilters;

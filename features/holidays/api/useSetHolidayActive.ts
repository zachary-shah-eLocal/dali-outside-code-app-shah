import { useMutation, useQueryClient } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";

const fetchApi = createFetch(salesForceUrl);

function useSetHolidayActive() {
  const queryClient = useQueryClient();
  const { accountId } = useAccountId();

  return useMutation({
    mutationFn: async (holidays: any) => {
      holidays = holidays.map((x: any) => ({
        name: x.name,
        isActive: x.isActive,
        contactId: x.contactId,
      }));
      const response = await fetchApi(`/${accountId}/account_holidays`, {
        method: "PUT",
        body: JSON.stringify(holidays),
      });

      return response;
    },
    onMutate: async (newHolidays) => {
      const newHoliday = newHolidays[0];
      await queryClient.cancelQueries({ queryKey: [accountId, "holidays"] });

      const previousHolidays = queryClient.getQueryData([
        accountId,
        "holidays",
      ]);
      queryClient.setQueryData([accountId, "holidays"], (old: any) => {
        const { ...oldCopy } = old;
        oldCopy.pauses = old.pauses.map((x: any) =>
          x.name === newHoliday.name ? newHoliday : x
        );
        oldCopy.holidays = old.holidays.map((x: any) =>
          x.name === newHoliday.name ? newHoliday : x
        );
        return oldCopy;
      });
      return { previousHolidays };
    },
    onError: (_err, _newHoliday, context) => {
      queryClient.setQueryData(
        [accountId, "holidays"],
        context?.previousHolidays
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [accountId, "holidays"] });
    },
  });
}

export default useSetHolidayActive;

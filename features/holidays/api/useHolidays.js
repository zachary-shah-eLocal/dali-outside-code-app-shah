import { useQuery } from "@tanstack/react-query";
import { salesForceUrl } from "../../../api/api-url";
import createFetch from "../../../api/fetchApi";
import { useAccountId } from "../../accounts/AccountContext";
const fetchApi = createFetch(salesForceUrl);

async function getHolidays({ queryKey }) {
  const accountId = queryKey[0];

  const response = await fetchApi(`/${accountId}/account_holidays`);

  const allHolidays = response.holidayOptions
    .map((x) => {
      x.startDate = new Date(x.startDate);
      x.endDate = new Date(x.endDate);
      if (response.accountHolidays.find((y) => y.name === x.name)) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
      return x;
    })
    .reduce(
      (aggregate, x) => {
        if (x.holidayType === "CUSTOM") {
          aggregate.pauses.push(x);
        } else {
          aggregate.holidays.push(x);
        }
        return aggregate;
      },
      { pauses: [], holidays: [] }
    );
  const { allowedPauseDays, remainingPauseDaysByYear, rollingWindowDays } =
    response;
  return {
    allowedPauseDays,
    remainingPauseDaysByYear,
    rollingWindowDays,
    ...allHolidays,
  };
}

function useHolidays() {
  const { accountId } = useAccountId();

  const query = useQuery({
    queryKey: [accountId, "holidays"],
    queryFn: getHolidays,
    // suspense: true,
  });
  return query;
}

export default useHolidays;

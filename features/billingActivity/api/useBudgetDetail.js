import { useQuery } from '@tanstack/react-query'
import createFetch from 'api/fetchApi'
import { accountUrl } from 'api/api-url'
import { useAccountId } from 'features/accounts/AccountContext'
import supplyEventsKeys from './supplyEventsKeys'
import { format } from 'utils'
const fetchApi = createFetch(accountUrl)
const formatSting = 'yyyy-LL-dd'

const formatDate = (value) => {
	try {
		return format.date(value, formatSting)
	} catch {
		return null
	}
}

async function getBudgetDetail({ queryKey }) {
	const accountId = queryKey[0]
	const filters = queryKey.slice(-1)[0]
	if (!filters.startDate) {
		return []
	}
	const response = await fetchApi(`/supply-event/budget-detail`, {
		queryParams: {
			accountId,
			...filters,
			page: filters.page - 1,
			startDate: formatDate(filters.startDate),
			endDate: formatDate(filters.endDate)
		}
	})

	return response.response
}

function useBudgetDetail(filters) {
	const { accountId } = useAccountId()

	const query = useQuery({
		queryKey: [accountId, 'budget-detail', ...supplyEventsKeys.list(filters)],
		queryFn: getBudgetDetail,
		suspense: true
	})
	return query
}

export default useBudgetDetail

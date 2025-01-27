import { useQuery } from '@tanstack/react-query'
import createFetch from 'api/fetchApi'
import { gtvUrl } from 'api/api-url'
import invoiceKeys from './invoiceKeys'
import { useAccountId } from 'features/accounts/AccountContext'
import { format } from 'utils'

const fetchApi = createFetch(gtvUrl)
const formatSting = 'yyyy-LL-dd'

export async function getInvoices({ queryKey }) {
	const accountId = queryKey[0]
	const { page, size, startDate, endDate } = queryKey.slice(-1)[0]
	const filter =
		startDate && endDate ? `occurred_on GTE '${format.date(startDate, formatSting)}' AND occurred_on LTE '${format.date(endDate, formatSting)}'` : ''
	try {
		const response = await fetchApi(`/${accountId}/invoices`, {
			queryParams: { pageNumber: page, pageSize: size, filter }
		})
		return response
	} catch (err) {
		if (err.message.includes('Gtv billing account details not present for viking account')) {
			return {
				response: [],
				pageable: {}
			}
		}
	}
}

export default function useInvoices(filters) {
	const { accountId } = useAccountId()
	return useQuery({
		queryKey: [accountId, ...invoiceKeys.list(filters)],
		queryFn: getInvoices,
		suspense: true
	})
}

import { useQuery } from '@tanstack/react-query'
import listingKeys from './listingKeys'
import createFetch from 'api/fetchApi'
import { salesForceUrl } from 'api/api-url'
import { useAccountId } from 'features/accounts/AccountContext'

const fetchApi = createFetch(salesForceUrl)

async function getListing({ queryKey }) {
	const accountId = queryKey[0]
	const listingId = queryKey.slice(-1)[0]
	try {
		const response = await fetchApi(`/${accountId}/listings/${listingId}`)

		return response.records[0]
	} catch (error) {
		throw new Error('Error finding listing')
	}
}

export default function useListing(listingId, suspense = true) {
	const { accountId } = useAccountId()
	return useQuery({
		queryKey: [accountId, ...listingKeys.detail(listingId)],
		queryFn: getListing,
		suspense
	})
}

import { useQueryClient, useMutation } from '@tanstack/react-query'
import createFetch from 'api/fetchApi'
import listingKeys from './listingKeys'
import { useAccountId } from 'features/accounts/AccountContext'
import { salesForceUrl } from 'api/api-url'
const fetchApi = createFetch(salesForceUrl)

const updateListing = (accountId) => async (listing) => {
	const listingId = listing.Postgres_External_Key__c
	const response = await fetchApi(`/${accountId}/listings/${listingId}`, {
		method: 'PUT',
		body: JSON.stringify(listing)
	})

	return response
}

export default function useUpdateListing(listingId) {
	const { accountId } = useAccountId()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateListing(accountId),
		suspense: true,
		onSuccess: () => {
			queryClient.invalidateQueries([accountId, ...listingKeys.detail(listingId)])
		}
	})
}

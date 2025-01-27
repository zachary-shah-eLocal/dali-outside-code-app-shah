import { useQueryClient, useMutation } from '@tanstack/react-query'
import createFetch from 'api/fetchApi'
import { useAccountId } from 'features/accounts/AccountContext'
import { gtvUrl } from 'api/api-url'
const fetchApi = createFetch(gtvUrl)

const makeDetaultPayment = (accountId) => async (recurringPaymentId) => {
	const res = await fetchApi(`/${accountId}/payment-method/${recurringPaymentId}/activate-auto-payment`, { method: 'POST' })
	return res.response
}

export default function useAddPaymentMethod() {
	const { accountId } = useAccountId()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: makeDetaultPayment(accountId),
		suspense: true,
		onSuccess: () => {
			queryClient.invalidateQueries([accountId, 'billing'])
		}
	})
}

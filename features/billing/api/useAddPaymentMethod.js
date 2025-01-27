import { useQueryClient, useMutation } from '@tanstack/react-query'
import createFetch from 'api/fetchApi'
import { useAccountId } from 'features/accounts/AccountContext'
import { gtvPaymentUrl } from 'api/api-url'
const fetchApi = createFetch(gtvPaymentUrl)

const addPaymentMethod = (accountId) => async (paymentData) => {
	const res = await fetchApi(`/${accountId}/payment-method`, {
		method: 'POST',
		body: JSON.stringify(paymentData)
	})
	return res.response
}

export default function useAddPaymentMethod() {
	const { accountId } = useAccountId()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addPaymentMethod(accountId),
		suspense: true,
		onSuccess: () => {
			queryClient.invalidateQueries([accountId, 'billing'])
		}
	})
}

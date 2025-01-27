import React from 'react'

const displayWithComma = (value) => {
	if (value) {
		return `${value}, `
	}
	return ''
}
export function AddressDisplay({ lead }) {
	const { street1, street2, city, state, country, postalCode } = lead

	return (
		<>
			{displayWithComma(street1)}
			{displayWithComma(street2)}
			{displayWithComma(city)}
			{state} {postalCode} {country}
		</>
	)
}

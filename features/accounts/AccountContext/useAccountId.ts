import { useContext } from 'react'

import { AccountContext } from './AccountContext'

export function useAccountId() {
  const context = useContext(AccountContext)

  if (context === undefined) {
    throw new Error('useAccountId must be used inside AccountProvider')
  }

  return context
}
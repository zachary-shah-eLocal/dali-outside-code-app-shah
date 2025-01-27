import { CognitoUserSession } from 'amazon-cognito-identity-js'

import { userPool } from '../../constants'

export async function getSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser()

    if (!user) {
      resolve(null)
    }

    user?.getSession((err: Error, session: CognitoUserSession | null) => {
      if (err) {
        console.error(err)
        const error = new Error('Error getting user Session')
        reject(error)
      }
      resolve(session)
    })
  })
}

export async function getJwtToken(): Promise<string | null> {
  const session = await getSession()
  const jwtToken = session?.getAccessToken()?.getJwtToken()
  return jwtToken!
}
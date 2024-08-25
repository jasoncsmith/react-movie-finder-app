import { BASE_URL } from './constants'

export async function getAuth(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/auth/token`)
    const data = await response.json()

    localStorage.setItem('authToken', data.token)
  } catch (err) {
    throw new Error('We could not authenticate, please try again' + err)
  }
}

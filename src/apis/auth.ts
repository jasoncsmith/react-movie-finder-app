import { BASE_URL, TOKEN_STORAGE_KEY } from './constants'

export async function getAuth(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/auth/token`)
    const data = await response.json()

    localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
  } catch (err) {
    throw new Error('We could not authenticate, please try again' + err)
  }
}

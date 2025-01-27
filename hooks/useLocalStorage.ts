import { useState } from 'react'

export function useLocalStorage<T = unknown>(storageKey: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(storageKey)

      if (value) {
        return JSON.parse(value) as T
      } else {
        localStorage.setItem(storageKey, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      return defaultValue
    }
  })
  const setValue = (newValue: T) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newValue))
    } catch (error) {
      console.error(error)
    }
    setStoredValue(newValue)
  }
  return [storedValue, setValue]
}
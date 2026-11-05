import { createContext, useContext } from 'react'
import { api } from './api.js'
import { useApi } from './hooks/useApi.js'
import { fallbackProfile } from './data/fallback.js'

const ProfileContext = createContext(fallbackProfile)

export function ProfileProvider({ children }) {
  const { data } = useApi(api.profile, fallbackProfile)
  return <ProfileContext.Provider value={data || fallbackProfile}>{children}</ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)

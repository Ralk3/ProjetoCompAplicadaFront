
import React, { createContext, useContext } from 'react'

const AuthContext = createContext()


export function AuthProvider({ children }) {
  const value = {
    user: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function useAuth() {
  return useContext(AuthContext)
}

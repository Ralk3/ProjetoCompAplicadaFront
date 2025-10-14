import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // {email: '...'}

  useEffect(() => {
    const token = localStorage.getItem('sf_token')
    const email = localStorage.getItem('sf_email')
    if (token && email) setUser({ email })
  }, [])

  const login = (email) => {
    localStorage.setItem('sf_token', 'demo-token')
    localStorage.setItem('sf_email', email)
    setUser({ email })
  }

  const logout = () => {
    localStorage.removeItem('sf_token')
    localStorage.removeItem('sf_email')
    setUser(null)
  }

  const value = { user, login, logout, isAuthenticated: !!user }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

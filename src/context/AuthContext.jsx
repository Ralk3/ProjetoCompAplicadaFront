import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // {email: '...'}

  useEffect(() => {
    let token = localStorage.getItem('sf_token')
    let email = localStorage.getItem('sf_email')

    //Modo dev: simula login automático
    if (!token && import.meta.env.DEV) {
      token = 'dev-token'
      email = 'dev@servicofacil.local'
      localStorage.setItem('sf_token', token)
      localStorage.setItem('sf_email', email)
      console.log('Modo desenvolvimento: login automático habilitado')
    }

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

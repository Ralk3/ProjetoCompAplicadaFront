import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './router/ProtectedRoute.jsx'

// PUBLIC PAGES
import Home from './pages/Home/Home.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'

// PRIVATE PAGES
import Services from './pages/Services/Services.jsx'
import MyServices from './pages/MyServices/MyServices.jsx'
import Payments from './pages/Payments/Payments.jsx'
import Profile from './pages/Profile/Profile.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app/servicos" element={<Services />} />
          <Route path="/app/meus-servicos" element={<MyServices />} />
          <Route path="/app/pagamentos" element={<Payments />} />
          <Route path="/app/perfil" element={<Profile />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  )
}

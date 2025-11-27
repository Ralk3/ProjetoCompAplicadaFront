import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { loginWithCredentials, loading } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await loginWithCredentials(email, password)

    if (res.ok) {
      const from = location.state?.from?.pathname || '/app/servicos'
      navigate(from, { replace: true })
    } else {
      setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="sf-login">
      <HeaderPublic />

      <div className="sf-login__pagehead">
        <div className="sf-login__pagehead-inner">
          <div className="sf-login__titles">
            <h1>Entrar</h1>
            <p>Acesse sua conta para continuar.</p>
          </div>
        </div>
      </div>

      <div className="sf-login__container">
        <div className="sf-login__card sf-login__col"></div>

        <div className="sf-login__card sf-login__col">
          <h2 className="sf-login__formtitle">Bem-vindo de volta</h2>

          <form onSubmit={onSubmit} className="sf-login__form">
            <label className="sf-login__label">E-mail</label>
            <div className="sf-login__field">
              <span className="sf-login__icon">✉️</span>
              <input
                className="sf-login__input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="sf-login__label" style={{ marginTop: 12 }}>Senha</label>
            <div className="sf-login__field">
              <span className="sf-login__icon">🔒</span>
              <input
                className="sf-login__input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="sf-login__error">{error}</div>}

            <button className="sf-login__btn" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="sf-login__register">
            Novo por aqui? <Link to="/register">Criar conta</Link>
          </div>
        </div>
      </div>

      <div className="sf-login__footerbar">
        <Link to="/politica-de-privacidade" className="sf-login__privacy">Política de privacidade</Link>
      </div>
    </div>
  )
}
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
  const { loginWithCredentials, loading } = useAuth() // mantém o padrão atual de JS

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await loginWithCredentials(email, password) // chama seu endpoint /auth/login
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

      {/* cabeçalho interno da página */}
      <div className="sf-login__pagehead">
        <div className="sf-login__pagehead-inner">
          <div className="sf-login__titles">
            <h1>Entrar</h1>
            <p>Acesse sua conta para continuar.</p>
          </div>
        </div>
      </div>

      {/* conteúdo em duas colunas */}
      <div className="sf-login__container">
        {/* coluna esquerda (banner + chips) */}
        <div className="sf-login__card sf-login__col">
          <img
            className="sf-login__banner"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop"
            alt="Banner"
          />
          <div className="sf-login__ctaRow">
            <button className="sf-login__chip sf-login__chip--ghost">Saiba mais</button>
          </div>
          <div className="sf-login__chips">
            <span className="sf-login__chip">5000+ anuncios ativos</span>
            <span className="sf-login__chip">Verificados e avaliados</span>
            <span className="sf-login__chip">Atendimento rapido</span>
          </div>
        </div>

        {/* coluna direita (formulário) */}
        <div className="sf-login__card sf-login__col">
          <h2 className="sf-login__formtitle">Bem-vindo de volta</h2>

          <form onSubmit={onSubmit} className="sf-login__form">
            <label className="sf-login__label">E-mail</label>
            <div className="sf-login__field">
              <span className="sf-login__icon" aria-hidden>✉️</span>
              <input
                className="sf-login__input"
                type="email"
                placeholder="seuemail@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="sf-login__label" style={{ marginTop: 12 }}>Senha</label>
            <div className="sf-login__field">
              <span className="sf-login__icon" aria-hidden>🔒</span>
              <input
                className="sf-login__input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="sf-login__error">{error}</div>}

            <button className="sf-login__btn sf-login__btn--primary" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="sf-login__register">
            Novo por aqui? <Link to="/register">Criar conta</Link>
          </div>
        </div>
      </div>

      {/* barra inferior com link de política */}
      <div className="sf-login__footerbar">
        <Link to="/politica-de-privacidade" className="sf-login__privacy">Política de privacidade</Link>
      </div>
    </div>
  )
}

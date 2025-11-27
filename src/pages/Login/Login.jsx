import React, { useState } from 'react'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

          <form className="sf-login__form">
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

            <button className="sf-login__btn">Entrar</button>
          </form>
        </div>
      </div>

      <div className="sf-login__footerbar">
        <a className="sf-login__privacy">Política de privacidade</a>
      </div>
    </div>
  )
}
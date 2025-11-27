import React from 'react'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import './Login.css'

export default function Login() {
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
        <div className="sf-login_card sf-login_col"></div>
        <div className="sf-login_card sf-login_col"></div>
      </div>

      <div className="sf-login__footerbar">
        <a className="sf-login__privacy">Política de privacidade</a>
      </div>
    </div>
  )
}
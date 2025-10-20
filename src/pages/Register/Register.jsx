import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import './Register.css'

export default function Register() {
  return (
    <div className="sf-register">
      <HeaderPublic />

      <div className="sf-register__pagehead">
        <div className="sf-register__pagehead-inner">
          <div className="sf-register__titles">
            <h1>Criar conta</h1>
            <p>Comece gratuitamente publicando ou contratando serviços</p>
          </div>
        </div>
      </div>

      <div className="sf-register__container">
        {/* coluna esquerda */}
        <div className="sf-register__card sf-register__col">
          <img
            className="sf-register__banner"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop"
            alt="Banner"
          />
          <div className="sf-register__ctaRow">
            <button className="sf-register__chip sf-register__chip--ghost">Saiba mais</button>
          </div>
          <div className="sf-register__chips">
            <span className="sf-register__chip">5000+ anúncios ativos</span>
            <span className="sf-register__chip">Verificados e avaliados</span>
            <span className="sf-register__chip">Atendimento rápido</span>
          </div>
        </div>
      </div>
    </div>
  )
}
//teste
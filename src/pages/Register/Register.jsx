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
        <div className="sf-register_card sf-register_col">
          <p>Conteúdo inicial aqui...</p>
        </div>
      </div>
    </div>
  )
}
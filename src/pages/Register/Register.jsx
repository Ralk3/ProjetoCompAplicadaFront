import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import './Register.css'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Register() {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    celular: '',
    cpf: '',
    senha: '',
    codigoPagseguro: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithCredentials } = useAuth()
  const API_URL = import.meta.env.VITE_API_URL || ''

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validaSenha(s) {
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(s)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (!validaSenha(form.senha)) {
      setError('A senha deve ter no mínimo 8 caracteres, com letra e número.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        nome: form.nome.trim(),
        sobrenome: form.sobrenome.trim(),
        email: form.email.trim(),
        celular: form.celular.trim(),
        cpf: form.cpf.trim(),
        codigoPagseguro: form.codigoPagseguro ? Number(form.codigoPagseguro) : 0,
        senha: form.senha
      }

      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Falha no cadastro')
      await loginWithCredentials(form.email, form.senha)
      navigate('/app/servicos', { replace: true })
    } catch (err) {
      setError(err.message || 'Erro ao criar conta.')
    } finally {
      setLoading(false)
    }
  }

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
        {/* esquerda */}
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

        {/* direita */}
        <div className="sf-register__card sf-register__col">
          <h2 className="sf-register__formtitle">Crie sua conta</h2>
          <form onSubmit={onSubmit} className="sf-register__form">
            <label>Nome</label>
            <input name="nome" value={form.nome} onChange={onChange} required />
            <label>Email</label>
            <input name="email" value={form.email} onChange={onChange} required />
            <label>Senha</label>
            <input name="senha" type="password" value={form.senha} onChange={onChange} required />
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
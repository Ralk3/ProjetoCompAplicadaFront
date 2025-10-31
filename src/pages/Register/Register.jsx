import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import './Register.css'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Register() {
  // campos do formulário
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
  const { loginWithCredentials } = useAuth() // para logar após cadastro

  const API_URL = import.meta.env.VITE_API_URL || ''

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validaSenha(s) {
    // mínimo 8, ao menos uma letra e um número (mensagem do mock)
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

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Falha no cadastro (HTTP ${res.status})`)
      }

      // após cadastrar, autentica e vai para a área interna
      await loginWithCredentials(form.email, form.senha)
      navigate('/app/servicos', { replace: true })
    } catch (err) {
      setError(err.message || 'Não foi possível criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sf-register">
      <HeaderPublic />

      {/* cabeçalho interno */}
      <div className="sf-register__pagehead">
        <div className="sf-register__pagehead-inner">
          <div className="sf-register__titles">
            <h1>Criar conta</h1>
            <p>Comece gratuitamente publicando ou contratando serviços</p>
          </div>
        </div>
      </div>

      <div className="sf-register__container">
        {/* coluna esquerda: banner + chips */}
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
            <span className="sf-register__chip">5000+ anuncios ativos</span>
            <span className="sf-register__chip">Verificados e avaliados</span>
            <span className="sf-register__chip">Atendimento rapido</span>
          </div>
        </div>

        {/* coluna direita: formulário */}
        <div className="sf-register__card sf-register__col">
          <h2 className="sf-register__formtitle">Crie sua conta</h2>

          <form onSubmit={onSubmit} className="sf-register__form">
            <div className="sf-register__row">
              <div className="sf-register__col2">
                <label className="sf-register__label">Nome</label>
                <div className="sf-register__field">
                  <span className="sf-register__icon" aria-hidden>👤</span>
                  <input
                    className="sf-register__input"
                    name="nome"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="sf-register__col2">
                <label className="sf-register__label">Sobrenome</label>
                <div className="sf-register__field">
                  <span className="sf-register__icon" aria-hidden>👤</span>
                  <input
                    className="sf-register__input"
                    name="sobrenome"
                    placeholder="Seu sobrenome"
                    value={form.sobrenome}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>

            <label className="sf-register__label">E-mail</label>
            <div className="sf-register__field">
              <span className="sf-register__icon" aria-hidden>✉️</span>
              <input
                className="sf-register__input"
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="sf-register__row">
              <div className="sf-register__col2">
                <label className="sf-register__label">CPF:</label>
                <div className="sf-register__field">
                  <span className="sf-register__icon" aria-hidden>🧳</span>
                  <input
                    className="sf-register__input"
                    name="cpf"
                    placeholder="CPF"
                    value={form.cpf}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="sf-register__col2">
                <label className="sf-register__label">Celular:</label>
                <div className="sf-register__field">
                  <span className="sf-register__icon" aria-hidden>📱</span>
                  <input
                    className="sf-register__input"
                    name="celular"
                    placeholder="Celular"
                    value={form.celular}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* opcional - PagSeguro */}
            <label className="sf-register__label">Código Mercado Pago (opcional)</label>
            <div className="sf-register__field">
              <span className="sf-register__icon" aria-hidden>💳</span>
              <input
                className="sf-register__input"
                name="codigoPagseguro"
                type="number"
                placeholder="Ex.: 123456789"
                value={form.codigoPagseguro}
                onChange={onChange}
              />
            </div>

            <label className="sf-register__label">Senha</label>
            <div className="sf-register__field">
              <span className="sf-register__icon" aria-hidden>🔒</span>
              <input
                className="sf-register__input"
                name="senha"
                type="password"
                value={form.senha}
                onChange={onChange}
                required
              />
            </div>
            <p className="sf-register__hint">Mínimo 8 caracteres, com letra e número.</p>

            {error && <div className="sf-register__error">{error}</div>}

            <button className="sf-register__btn sf-register__btn--primary" type="submit" disabled={loading}>
              {loading ? 'Criando...' : <>👤 Criar conta</>}
            </button>
          </form>
        </div>
      </div>

      <div className="sf-register__footerbar">
        <Link to="/politica-de-privacidade" className="sf-register__privacy">Política de privacidade</Link>
      </div>
    </div>
  )
}

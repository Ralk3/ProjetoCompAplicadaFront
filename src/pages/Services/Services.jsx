import { useState } from 'react'
import HeaderPrivate from '../../components/HeaderPrivate.jsx'
import './Services.css'

export default function Services() {
  const [query, setQuery] = useState('')
  const [nome, setNome] = useState('')

  const onSearch = (e) => {
    e.preventDefault()
    setNome(query.trim())
  }

  return (
    <div className="sf-services">
      <HeaderPrivate />

      <section className="sf-services__hero">
        <div className="sf-services__hero-inner">
          <div className="sf-services__hero-text">
            <h1>Encontre serviços perto de você</h1>
            <p>Explore categorias e encontre profissionais confiáveis.</p>
            <form className="sf-services__search" onSubmit={onSearch}>
              <input
                className="sf-services__input"
                placeholder="O que você procura?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="sf-services__btn" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </section>

      <div className="sf-services__container">
        <h2>Resultados para: {nome || 'Todos os serviços'}</h2>
      </div>
    </div>
  )
}

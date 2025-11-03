import { useEffect, useState } from 'react'
import HeaderPrivate from '../../components/HeaderPrivate.jsx'
import './Services.css'

export default function Services() {
  const [query, setQuery] = useState('')
  const [nome, setNome] = useState('')
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState({ totalPages: 1, number: 0 })

  const API_URL = import.meta.env.VITE_API_URL || ''
  const token = localStorage.getItem('sf_token') || ''

  async function fetchPage(p = 0) {
    const res = await fetch(`${API_URL}/servicos?page=${p}&nome=${nome}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setRows(data.content || [])
    setMeta({ totalPages: data.totalPages, number: data.number })
  }

  useEffect(() => { fetchPage() }, [nome, page])

  const onSearch = (e) => { e.preventDefault(); setNome(query.trim()) }
  const goTo = (p) => { if (p >= 0 && p < meta.totalPages) setPage(p) }

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
        {rows.length === 0 ? (
          <p className="sf-services__empty">Nenhum serviço encontrado.</p>
        ) : (
          <div className="sf-services__list">
            {rows.map(item => (
              <article key={item.id} className="sf-services__item">
                <h3 className="sf-services__title">{item.nome}</h3>
                <p className="sf-services__desc">{item.descricao}</p>
              </article>
            ))}
          </div>
        )}

        <div className="sf-services__pager">
          <button disabled={page === 0} onClick={() => goTo(page - 1)}>Anterior</button>
          <span>Página {page + 1} de {meta.totalPages}</span>
          <button disabled={page + 1 >= meta.totalPages} onClick={() => goTo(page + 1)}>Próximo</button>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import HeaderPrivate from '../../components/HeaderPrivate.jsx'
import './Services.css'
import searchImg from "../../assets/sf-servicos-pesquisar.png";

export default function Services() {
  // ---- estado ----
  const [query, setQuery] = useState('')
  const [nome, setNome] = useState('')
  const [page, setPage] = useState(0)
  const [size] = useState(5)
  const [sort] = useState('id,desc')
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState({ totalPages: 0, first: true, last: true, number: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // modal
  const [open, setOpen] = useState(false)
  const [mdlLoading, setMdlLoading] = useState(false)
  const [mdlErr, setMdlErr] = useState('')
  const [detail, setDetail] = useState(null)   // serviço
  const [owner, setOwner] = useState(null)     // usuário (opcional)

  // ---- config ----
  const API_URL = import.meta.env.VITE_API_URL || ''
  const token = localStorage.getItem('sf_token') || ''

  const fmtPreco = (n) => {
    try { return n?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) } catch { return `R$ ${n}` }
  }
  const fmtData = (iso) => {
    try { return new Date(iso).toLocaleString('pt-BR') } catch { return '' }
  }
  const imgSrc = (x) => x?.imagem?.secureUrl || 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1200&auto=format&fit=crop'

  // ---- fetch list ----
  async function fetchPage(p = page, t = nome) {
    setLoading(true); setError('')
    try {
      const url = new URL(`${API_URL}/servicos`)
      if (t) url.searchParams.set('nome', t)
      url.searchParams.set('page', String(p))
      url.searchParams.set('size', String(size))
      url.searchParams.set('sort', sort)

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setRows(Array.isArray(data.content) ? data.content : [])
      setMeta({ totalPages: data.totalPages ?? 0, first: data.first ?? true, last: data.last ?? true, number: data.number ?? 0 })
      setPage(data.number ?? 0)
    } catch (e) {
      setError(e.message || 'Falha ao carregar serviços.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchPage() }, [nome, page])

  const onSearch = (e) => { e.preventDefault(); setNome(query.trim()); setPage(0) }
  const goTo = (p) => { if (p >= 0 && p < meta.totalPages) setPage(p) }

  const pages = useMemo(() => {
    const total = meta.totalPages || 0, cur = page, max = 5
    if (total <= max) return Array.from({ length: total }, (_, i) => i)
    const start = Math.max(0, Math.min(cur - 2, total - max))
    return Array.from({ length: max }, (_, i) => start + i)
  }, [meta.totalPages, page])

  // ---- modal ----
  async function openDetail(id) {
    setOpen(true); setMdlLoading(true); setMdlErr(''); setDetail(null); setOwner(null)
    try {
      const res = await fetch(`${API_URL}/servicos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const serv = await res.json()
      setDetail(serv)

      if (serv?.ativo && serv?.idUsuario) {
        const ures = await fetch(`${API_URL}/usuarios/${serv.idUsuario}`, { headers: { Authorization: `Bearer ${token}` } })
        if (ures.ok) setOwner(await ures.json())
      }
    } catch (e) {
      setMdlErr(e.message || 'Não foi possível carregar os detalhes.')
    } finally {
      setMdlLoading(false)
    }
  }

  return (
    <div className="sf-services">
      <HeaderPrivate />

      {/* hero / busca */}
      <section className="sf-services__hero">
        <div className="sf-services__hero-inner">
          <div className="sf-services__hero-text">
            <h1>Encontre serviços perto de voce</h1>
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
          <div className="sf-services__hero-art">
            <img src={searchImg} alt="Pesquisar serviços" />
          </div>
        </div>
      </section>

      {/* lista */}
      <div className="sf-services__container">
        {error && <div className="sf-services__error">{error}</div>}

        <h2 className="sf-services__section-title">Serviços</h2>
        <p className="sf-services__muted">Resultados:</p>

        {loading ? (
          <div className="sf-services__skeleton">
            {Array.from({ length: size }, (_, i) => (
              <div key={i} className="sf-services__item sf-services__item--sk">
                <div className="sk sk--text" />
                <div className="sk sk--price" />
                <div className="sk sk--img" />
              </div>
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="sf-services__empty">Nenhum serviço encontrado.</div>
        ) : (
          <div className="sf-services__list">
            {rows.map(item => (
              <article key={item.id} className="sf-services__item" onClick={() => openDetail(item.id)}>
                <div className="sf-services__info">
                  <span className={`sf-services__badge ${item.ativo ? 'is-on' : 'is-off'}`}>{item.ativo ? 'Ativo' : 'Inativo'}</span>
                  <h3 className="sf-services__title">{item.nome}</h3>
                  <p className="sf-services__desc">{item.descricao}</p>

                  <div className="sf-services__meta">
                    <span>{item.cidade}, {item.uf}</span>
                    <span>Outros Serviços</span>
                    <span>{fmtData(item.dataHora)}</span>
                  </div>
                </div>

                <div className="sf-services__price">
                  <span className="sf-services__chip">{fmtPreco(item.preco)}</span>
                </div>

                <img className="sf-services__img" src={imgSrc(item)} alt={item.nome} />
              </article>
            ))}
          </div>
        )}

        {/* paginação */}
        {!loading && meta.totalPages > 0 && (
          <div className="sf-services__pager">
            <button className="sf-services__pg-btn" disabled={meta.first} onClick={() => goTo(page - 1)}>Anterior</button>
            {pages.map(p => (
              <button key={p} className={`sf-services__pg-index ${p === page ? 'is-active' : ''}`} onClick={() => goTo(p)}>{p + 1}</button>
            ))}
            <button className="sf-services__pg-btn" disabled={meta.last} onClick={() => goTo(page + 1)}>Próximo</button>
          </div>
        )}

      </div>

      {/* MODAL */}
      {open && (
        <div className="sf-modal" role="dialog" aria-modal="true">
          <div className="sf-modal__backdrop" onClick={() => setOpen(false)} />
          <div className="sf-modal__panel">
            <div className="sf-modal__head">
              <strong>Detalhes do serviço</strong>
              <button className="sf-modal__close" onClick={() => setOpen(false)}>✕</button>
            </div>

            {mdlLoading ? (
              <div className="sf-modal__body">Carregando…</div>
            ) : mdlErr ? (
              <div className="sf-modal__body sf-services__error">{mdlErr}</div>
            ) : detail ? (
              <div className="sf-modal__body">
                <div className="sf-modal__status">
                  <span className={`sf-services__badge ${detail.ativo ? 'is-on' : 'is-off'}`}>
                    {detail.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <h3 className="sf-modal__title">{detail.nome}</h3>

                <img className="sf-modal__img" src={imgSrc(detail)} alt={detail.nome} />

                <p className="sf-modal__desc">{detail.descricao}</p>

                <div className="sf-modal__price">{fmtPreco(detail.preco)}</div>

                <div className="sf-modal__meta">
                  <span>📍 {detail.bairro}, {detail.cidade}/{detail.uf}</span>
                  <span>📂 {detail.categoria || 'Outros Serviços'}</span>
                  <span>🕒 {fmtData(detail.dataHora)}</span>
                </div>

                {detail.ativo && owner && (
                  <>
                    <h4 className="sf-modal__sub">Contato do Anunciante</h4>
                    <ul className="sf-modal__contact">
                      <li><strong>Nome:</strong> {owner.nome}</li>
                      <li><strong>Cel:</strong> {owner.celular}</li>
                      <li><strong>E-mail:</strong> {owner.email}</li>
                    </ul>
                  </>
                )}

                <button className="sf-modal__action" onClick={() => setOpen(false)}>Fechar</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import HeaderPublic from '../../components/HeaderPublic.jsx'
import './Home.css'

const destaque = [
  { id: 1, titulo: 'Limpeza Residencial', desc: 'Pacotes semanais e avulsos, Produtos inclusos.', preco: 120, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, titulo: 'Conserto de Celular', desc: 'Troca de tela e bateria no mesmo dia.', preco: 99, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, titulo: 'Aulas de Matemática', desc: 'Reforço escolar e vestibulares.', preco: 50, img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop' },
]

const categorias = ['Limpeza', 'Reparos', 'Aulas', 'Jardim', 'Fotografia', 'Gastronomia']

export default function Home() {
  return (
    <div className="sf-home">
      <HeaderPublic />
      <section className="sf-home__hero">
        <img
          className="sf-home__hero-img"
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
          alt="Equipe reunida"
        />
        <div className="sf-home__container">
          <div className="sf-home__overlay">
            <h1>Encontre e anuncie serviços com rapidez</h1>
            <p>Profissionais e clientes reais em um só lugar. Publique seu anúncio ou localize o serviço ideal em minutos.</p>
            <div className="sf-home__cta">
              <Link className="sf-home__btn sf-home__btn--primary" to="/app/servicos">Pesquisar serviços</Link>
              <Link className="sf-home__btn sf-home__btn--light" to="/register">Anunciar agora</Link>
            </div>
          </div>
        </div>
      </section>  

      <section className="sf-home__section">
        <div className="sf-home__container">
          <div className="sf-home__section-head">
            <div>
              <h2>Vitrines em destaque</h2>
              <p className="sf-home__muted">Uma seleção de serviços populares na sua região</p>
            </div>
            <Link to="/app/servicos" className="sf-home__ver-todos">Ver todos</Link>
          </div>

          <div className="sf-home__grid-3">
            {destaque.map((card) => (
              <article key={card.id} className="sf-home__card">
                <img src={card.img} alt={card.titulo} className="sf-home__card-img" />
                <div className="sf-home__card-body">
                  <div className="sf-home__card-top">
                    <h3>{card.titulo}</h3>
                    <span className="sf-home__price">R$ {card.preco}</span>
                  </div>
                  <p className="sf-home__muted">{card.desc}</p>
                  <span className="sf-home__badge sf-home__badge--active">Ativo</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>  
    </div>
  )
}
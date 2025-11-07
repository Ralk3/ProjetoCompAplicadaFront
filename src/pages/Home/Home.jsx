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
    </div>
  )
}
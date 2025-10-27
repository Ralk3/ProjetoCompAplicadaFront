import HeaderPrivate from '../../components/HeaderPrivate.jsx'
import './Services.css'

export default function Services() {
  return (
    <div className="sf-services">
      <HeaderPrivate />
      <section className="sf-services__hero">
        <div className="sf-services__hero-inner">
          <div className="sf-services__hero-text">
            <h1>Encontre serviços perto de você</h1>
            <p>Explore categorias e encontre profissionais confiáveis.</p>
            <form className="sf-services__search">
              <input className="sf-services__input" placeholder="O que você procura?" />
              <button className="sf-services__btn" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

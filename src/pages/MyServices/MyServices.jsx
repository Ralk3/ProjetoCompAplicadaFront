import React from "react";
import HeaderPublic from "../../components/HeaderPublic.jsx";
import { Link } from "react-router-dom";
import "./MyServices.css";


export default function MyServices() {
  return (
    <div className="sf-services">
      <HeaderPublic />

      <section className="sf-services__header">
        <div className="sf-services__container">
          <h1>Meus Serviços</h1>
          <p className="sf-home__muted">
            Gerencie seus anúncios e acompanhe o status
          </p>

          <Link
  className="sf-home__btn sf-home__btn--primary"
  to="/app/novo-servico"
>
  + Criar novo serviço
</Link>
        </div>
      </section>

      <section className="sf-services__list">
        <div className="sf-services__container">
          {meusServicos.length === 0 ? (
            <p className="sf-home__muted">Você ainda não possui serviços publicados.</p>
          ) : (
            <div className="sf-home__grid-3">
              {meusServicos.map((card) => (
                <article key={card.id} className="sf-home__card">
                  <img
                    src={card.img}
                    alt={card.titulo}
                    className="sf-home__card-img"
                  />

                  <div className="sf-home__card-body">
                    <h3>{card.titulo}</h3>
                    <p className="sf-home__muted">{card.desc}</p>

                    <span
                      className={`sf-home__badge ${
                        card.status === "Ativo"
                          ? "sf-home__badge--active"
                          : "sf-home__badge--paused"
                      }`}
                    >
                      {card.status}
                    </span>

                    <div className="sf-services__actions">
                      <button className="sf-services__btn">Editar</button>
                      <button className="sf-services__btn sf-services__btn--danger">
                        Remover
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

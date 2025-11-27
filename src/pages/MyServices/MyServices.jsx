import React from "react";
import HeaderPublic from "../../components/HeaderPublic.jsx";
import { Link } from "react-router-dom";
import "./MyServices.css";

const meusServicos = [
  {
    id: 1,
    titulo: "Limpeza Residencial",
    desc: "Pacotes semanais e avulsos, produtos inclusos.",
    status: "Ativo",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    titulo: "Limpeza Pós-Obra",
    desc: "Equipe especializada para remoção de resíduos.",
    status: "Ativo",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    titulo: "Conserto de Celular",
    desc: "Troca de tela e bateria no mesmo dia.",
    status: "Pausado",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    titulo: "Manutenção de Notebook",
    desc: "Troca de pasta térmica e limpeza interna.",
    status: "Ativo",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    titulo: "Aulas de Matemática",
    desc: "Reforço escolar e preparação para vestibular.",
    status: "Ativo",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    titulo: "Aulas de Inglês Online",
    desc: "Conversação e preparação para entrevistas.",
    status: "Pausado",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    titulo: "Jardinagem e Paisagismo",
    desc: "Poda, manutenção e criação de jardins.",
    status: "Ativo",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    titulo: "Fotografia Profissional",
    desc: "Eventos, ensaios e fotografia de produtos.",
    status: "Ativo",
    img: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    titulo: "Cozinha Sob Encomenda",
    desc: "Marmitas fitness e doces para eventos.",
    status: "Pausado",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
  },
];


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

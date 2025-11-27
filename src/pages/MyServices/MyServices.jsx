import React from "react";
import HeaderPublic from "../../components/HeaderPublic.jsx";
import "./MyServices.css";
import { Link } from "react-router-dom";
import searchImg from "../assets/sf-servicos-pesquisar.png";


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

    </div>
  );
}

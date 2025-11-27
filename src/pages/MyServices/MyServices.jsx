import React from "react";
import HeaderPublic from "../../components/HeaderPublic.jsx";
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
        </div>
      </section>
    </div>
  );
}

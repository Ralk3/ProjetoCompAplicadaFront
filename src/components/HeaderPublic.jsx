import React from "react";
import { Link } from "react-router-dom";
import "./HeaderPublic.css";
import logo from "../assets/sf-logo.png"; // ajuste o caminho se necessário

export default function HeaderPublic() {
  return (
    <header className="sf-header-public">
      <div className="sf-container sf-header-public__wrap">
        <Link to="/" className="sf-header-public__brand" aria-label="Serviço Fácil - Início">
          <img
            src={logo}
            alt="Logo Serviço Fácil"
            className="sf-header-public__logo-img"
            width="50"
            height="50"
            loading="eager"
          />
          <span className="sf-header-public__brand-text">Serviço Fácil</span>
        </Link>

        <nav className="sf-header-public__nav" aria-label="Acesso">
          <Link to="/register" className="sf-btn sf-btn--link">Cadastre-se</Link>
          <Link to="/login" className="sf-btn sf-btn--primary">Entrar</Link>
        </nav>
      </div>
    </header>
  );
}

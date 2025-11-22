import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./HeaderPrivate.css";
import logo from "../assets/sf-logo.png";

/**
 * HeaderPrivate
 * Cabeçalho que aparece quando o usuário está logado.
 * Inclui navegação principal e botão de logout.
 */
export default function HeaderPrivate() {
  const [open, setOpen] = useState(false); // controla o menu mobile

  const closeMenu = () => setOpen(false); // fecha o menu ao clicar em um link

  return (
    <header className="sf-header-private">
      <div className="sf-container sf-header-private__wrap">

{/* Marca / logo */}
        <Link
          to="/app"
          className="sf-header-private__brand"
          onClick={closeMenu}
          aria-label="Voltar para a página inicial"
        >
          <img
            src={logo}
            alt="Logo Serviço Fácil"
            className="sf-header-private__logo-img"
            width="50"
            height="50"
          />
          <span className="sf-header-private__brand-text">Serviço Fácil</span>
        </Link>
                {/* Botão hambúrguer (menu mobile) */}
        <button
          className={`sf-burger ${open ? "is-open" : ""}`}
          aria-label="Abrir ou fechar menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        {/* Navegação principal */}
        <nav
          className={`sf-header-private__nav ${open ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          <NavLink
            to="/app/servicos"
            className={({ isActive }) =>
              `sf-navlink${isActive ? " is-active" : ""}`
            }
            onClick={closeMenu}
          >
            Serviços
          </NavLink>

          <NavLink
            to="/app/anunciar"
            className={({ isActive }) =>
              `sf-navlink${isActive ? " is-active" : ""}`
            }
            onClick={closeMenu}
          >
            Anunciar
          </NavLink>

          <NavLink
            to="/app/pagamentos"
            className={({ isActive }) =>
              `sf-navlink${isActive ? " is-active" : ""}`
            }
            onClick={closeMenu}
          >
            Pagamentos
          </NavLink>

          <NavLink
            to="/app/perfil"
            className={({ isActive }) =>
              `sf-navlink${isActive ? " is-active" : ""}`
            }
            onClick={closeMenu}
          >
            Perfil
          </NavLink>
          {/* Botão de logout (sempre vermelho) */}
          <Link to="/logout" className="sf-btn-logout" onClick={closeMenu}>
            Sair
          </Link>
        </nav>
      </div>
    </header>
  );
}

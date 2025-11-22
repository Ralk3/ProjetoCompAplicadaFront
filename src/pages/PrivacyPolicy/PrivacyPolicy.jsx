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

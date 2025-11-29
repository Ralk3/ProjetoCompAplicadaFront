import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeaderPrivate from "../../components/HeaderPrivate.jsx";
import "./Profile.css";

/** URL base da API (fica igual ao resto do app) */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/** Pega o token de onde ele existir */
function useToken() {
  return useMemo(
    () =>
      localStorage.getItem("sf_token") ||
      sessionStorage.getItem("sf_token") ||
      localStorage.getItem("token") ||
      "",
    []
  );
}

/** fetch com Authorization automaticamente quando houver token */
async function authFetch(input, init = {}) {
  const t =
    localStorage.getItem("sf_token") ||
    sessionStorage.getItem("sf_token") ||
    localStorage.getItem("token") ||
    "";
  const headers = {
    ...(init.headers || {}),
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
  };
  return fetch(input, { ...init, headers, credentials: "include" });
}

/** máscaras simples usadas no formulário */
const maskPhone = (v = "") =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (m, a, b, c) =>
      [a && `(${a}`, a && ") ", b, c && `-${c}`].filter(Boolean).join("")
    );

const maskCPF = (v = "") =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (m, a, b, c, d) =>
      [a, b, c].join(".") + (d ? "-" + d : "")
    );

export default function Profile() {
  const token = useToken();

  /** estado de carregamento + dados da API */
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);

  /** estado de edição do formulário (inline) */
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    celular: "",
    codigoMercadoPago: "",
    email: "",
    cpf: "",
  });
}

  /** controle de envio */
  const [saving, setSaving] = useState(false);

  /** redireciona se não tiver token */
  useEffect(() => {
    if (!token) window.location.href = "/login";
  }, [token]);

  /** busca /auth/me ao montar */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await authFetch(`${API_URL}/auth/me`);
        if (!res.ok) throw new Error("Falha ao carregar perfil");
        const data = await res.json();
        setMe(data);
        /** prepara formulário com os valores “mascarados” já prontos pro usuário */
        setForm({
          nome: data?.nome || "",
          sobrenome: data?.sobrenome || "",
          celular: maskPhone(data?.celular || ""),
          codigoMercadoPago: data?.codigoMercadoPago || "",
          email: data?.email || "",
          cpf: maskCPF(data?.cpf || ""),
        });
      } catch (e) {
        console.error(e);
        alert("Não foi possível carregar seu perfil.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /** submit do formulário (PUT /auth/me) */
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const body = JSON.stringify({
        nome: form.nome.trim(),
        sobrenome: form.sobrenome.trim(),
        celular: form.celular.replace(/\D/g, ""),
        codigoMercadoPago: form.codigoMercadoPago.trim(),
      });
      const res = await authFetch(`${API_URL}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Falha ao salvar");
      }
      /** refaz GET pra refletir o que salvou */
      const updated = await authFetch(`${API_URL}/auth/me`);
      const data = await updated.json();
      setMe(data);
      setForm((f) => ({
        ...f,
        nome: data?.nome || "",
        sobrenome: data?.sobrenome || "",
        celular: maskPhone(data?.celular || ""),
        codigoMercadoPago: data?.codigoMercadoPago || "",
      }));
      alert("Perfil atualizado!");
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar: " + e.message);
    } finally {
      setSaving(false);
    }
  }
  /** volta o formulário para os dados originais (efeito do botão Cancelar) */
  function handleCancel() {
    setForm({
      nome: me?.nome || "",
      sobrenome: me?.sobrenome || "",
      celular: maskPhone(me?.celular || ""),
      codigoMercadoPago: me?.codigoMercadoPago || "",
      email: me?.email || "",
      cpf: maskCPF(me?.cpf || ""),
    });
  }

  if (loading) {
    return (
      <>
        <HeaderPrivate />
        <div className="sf-prof-page">
          <p className="sf-muted">Carregando…</p>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderPrivate />

      {/* Faixa azul (full-bleed) com título e link “Voltar” */}
      <section className="sf-head">
        <div className="sf-head__inner">

          <div className="sf-head__titles">
            <h1>Perfil</h1>
            <p>Atualize suas informações básicas.</p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="sf-prof-page">
        <form className="sf-card sf-form" onSubmit={handleSubmit}>
          <h3 className="sf-card-title">Informações do perfil</h3>

          {/* Nome + Sobrenome */}
          <div className="sf-grid-2">
            <div className="sf-field">
              <label>Nome</label>
              <div className="sf-field__wrap">
                <span className="sf-field__icon" aria-hidden="true">👤</span>
                <input
                  className="sf-input"
                  value={form.nome}
                  onChange={(e) => setForm((s) => ({ ...s, nome: e.target.value }))}
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="sf-field">
              <label>Sobrenome</label>
              <div className="sf-field__wrap">
                <span className="sf-field__icon" aria-hidden="true">👤</span>
                <input
                  className="sf-input"
                  value={form.sobrenome}
                  onChange={(e) => setForm((s) => ({ ...s, sobrenome: e.target.value }))}
                  placeholder="Seu sobrenome"
                />
              </div>
            </div>
          </div>

          {/* Celular */}
          <div className="sf-field">
            <label>Celular</label>
            <div className="sf-field__wrap">
              <span className="sf-field__icon" aria-hidden="true">📞</span>
              <input
                className="sf-input"
                value={form.celular}
                onChange={(e) =>
                  setForm((s) => ({ ...s, celular: maskPhone(e.target.value) }))
                }
                placeholder="(11) 90000-0000"
              />
            </div>
          </div>

          {/* Código Mercado Pago */}
          <div className="sf-field">
            <label>Código Mercado Pago</label>
            <div className="sf-field__wrap">
              <span className="sf-field__icon" aria-hidden="true">🔗</span>
              <input
                className="sf-input"
                value={form.codigoMercadoPago}
                onChange={(e) =>
                  setForm((s) => ({ ...s, codigoMercadoPago: e.target.value }))
                }
                placeholder="TESTE-123..."
              />
            </div>
            <small className="sf-muted">
              Use o código vinculado à sua conta do Mercado Pago.
            </small>
          </div>

          {/* E-mail (readOnly) */}
          <div className="sf-field">
            <label>E-mail</label>
            <div className="sf-field__wrap">
              <span className="sf-field__icon" aria-hidden="true">✉️</span>
              <input className="sf-input" value={form.email} readOnly />
            </div>
          </div>

          {/* CPF (readOnly) */}
          <div className="sf-field">
            <label>CPF</label>
            <div className="sf-field__wrap">
              <span className="sf-field__icon" aria-hidden="true">🪪</span>
              <input className="sf-input" value={form.cpf} readOnly />
            </div>
          </div>

          {/* Ações */}
          <div className="sf-form__actions">
            <button
              type="button"
              className="sf-btn sf-btn--light"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className="sf-btn sf-btn--primary" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );

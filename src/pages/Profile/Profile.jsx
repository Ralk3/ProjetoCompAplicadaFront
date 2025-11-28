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
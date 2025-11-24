import React from "react";
import HeaderPrivate from "../../components/HeaderPrivate.jsx";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <>
      <HeaderPrivate />

      {/* ===== Faixa azul com título ===== */}
      <section className="sf-head">
        <div className="sf-head__inner">
          <div className="sf-head__titles">
            <h1>Política de Privacidade</h1>
            <p>
              Como coletamos, usamos e protegemos seus dados no Serviço Fácil.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Conteúdo principal ===== */}
      <div className="sf-privacy-page">

        {/* 1. Dados que coletamos */}
        <section className="sf-privacy-card">
          <h3>1. Dados que coletamos</h3>
          <ul>
            <li>Informações de conta: nome, e-mail, telefone e preferências.</li>
            <li>Dados de uso: páginas visitadas, buscas por serviços e interações.</li>
            <li>Dados de pagamento processados por parceiros conforme necessário.</li>
          </ul>
        </section>

        {/* 2. Finalidades do uso */}
        <section className="sf-privacy-card">
          <h3>2. Finalidades do uso</h3>
          <ul>
            <li>Prestar e melhorar nossos serviços e recomendações.</li>
            <li>Comunicar atualizações, segurança e suporte.</li>
            <li>Cumprir obrigações legais (LGPD) e prevenção a fraudes.</li>
          </ul>
        </section>

        {/* 3. Compartilhamento */}
        <section className="sf-privacy-card">
          <h3>3. Compartilhamento</h3>
          <p>
            Compartilhamos dados com prestadores e processadores de pagamento apenas quando
            necessário para a execução do serviço, sempre sob contratos e medidas de segurança.
          </p>
        </section>

        {/* 4. Seus direitos */}
        <section className="sf-privacy-card">
          <h3>4. Seus direitos</h3>
          <ul>
            <li>Acessar, corrigir ou excluir seus dados.</li>
            <li>Portabilidade e informação sobre o compartilhamento.</li>
            <li>Revogar consentimento a qualquer momento.</li>
          </ul>
        </section>

        {/* 5. Segurança */}
        <section className="sf-privacy-card">
          <h3>5. Segurança</h3>
          <p>
            Aplicamos criptografia, controles de acesso e monitoramento contínuo. 
            Em caso de incidente, notificaremos conforme a legislação vigente.
          </p>
          <div className="sf-security-box">🔒 SSL ativo e auditorias periódicas</div>
        </section>

        {/* 6. Termos de uso */}
        <section className="sf-privacy-card">
          <h3>6. Termos de Uso</h3>
          <p>
            O uso do Serviço Fácil implica aceitação desta Política e dos Termos de Uso. 
            É proibido utilizar a plataforma para fins ilícitos, falsos ou que violem direitos de terceiros. 
            Reservamo-nos o direito de suspender contas que infrinjam nossas políticas.
          </p>
        </section>

        {/* 7. Contato do DPO */}
        <section className="sf-privacy-card">
          <h3>7. Contato do DPO</h3>
          <p>
            E-mail: <a href="mailto:privacidade@servicofacil.app">privacidade@servicofacil.app</a>
          </p>
        </section>

      </div>
    </>
  );
}

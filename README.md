# Serviço Fácil - Front (Modelo React + Vite)

## Como rodar
1. Abra o projeto no VSCode.
2. No terminal: `npm install`
3. Rodar: `npm run dev`
4. Abra o endereço que aparecer (ex.: http://localhost:5173).

## Estrutura
- `src/pages/*/` → cada página tem seu próprio `.jsx` e `.css` com **namespace** (sf-home-*, sf-login-*, etc.) para evitar conflitos.
- `src/components/HeaderPublic.jsx` → topo público (Home/Política/Login/Cadastro).
- `src/components/HeaderPrivate.jsx` → topo interno (Serviços/Anunciar/Pagamentos/Perfil).
- `src/context/AuthContext.jsx` → autenticação fake (localStorage) para proteger rotas.
- `src/router/ProtectedRoute.jsx` → guarda de rotas privadas.
- `src/styles/globals.css` → estilos base/variáveis.

## Próximos passos
- Conectar Login/Cadastro a sua API.
- Popular listagens com dados reais.
- Ajustar estilos conforme os Figma finais.

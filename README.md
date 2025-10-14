# Serviço Fácil - Front React + Vite

## Como rodar
1. No terminal: `npm install`
3. Rodar: `npm run dev`
4. Abra o endereço que aparecer (ex.: http://localhost:5173).

## Estrutura Planejada
- `src/pages/*/` cada página tem seu próprio `.jsx` e `.css` com **namespace** (sf-home-*, sf-login-*, etc.) para evitar conflitos.

- `src/components/HeaderPublic.jsx` topo público (Home/Política/Login/Cadastro).
- `src/components/HeaderPrivate.jsx` topo interno (Serviços/Anunciar/Pagamentos/Perfil).
- `src/context/AuthContext.jsx` autenticação fake (localStorage) para proteger rotas.
- `src/router/ProtectedRoute.jsx` guarda de rotas privadas.
- `src/styles/globals.css` estilos base (Evitaremos usar).

## Próximos passos
- Participar da **call** toda **quinta-feira às 20h**. Link: https://meet.google.com/tna-kjkp-sxg
- Desenvolver suas **tarefas semanalmente**, conforme combinado.  

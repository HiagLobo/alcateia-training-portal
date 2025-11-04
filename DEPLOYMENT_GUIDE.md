# Guia de Deployment - Portal de Treinamento Alcateia

## Visão Geral

Este projeto foi transformado de um HTML estático com localStorage para uma aplicação full-stack com backend Node.js/Express e banco de dados MySQL. Agora as alterações do admin são **permanentemente salvas no banco de dados** e portáveis entre diferentes ambientes.

## O que foi implementado

### Backend (Node.js/Express + tRPC)
- **API REST via tRPC** com endpoints para persistência de dados
- **Banco de dados MySQL** com 4 tabelas:
  - `users` - Usuários do sistema
  - `training_paths` - Trilhas de treinamento (editáveis pelo admin)
  - `user_progress` - Progresso dos usuários
  - `ranking` - Dados de ranking dos consultores

### Frontend
- **Portal HTML** (`/portal.html`) com painel administrativo
- **API Adapter** (`/api-adapter.js`) que intercepta localStorage e sincroniza com a API
- Todas as alterações do admin são automaticamente salvas no banco de dados

## Como Usar Localmente

### 1. Instalação
```bash
cd alcateia_training_portal
pnpm install
```

### 2. Configurar Banco de Dados
```bash
pnpm db:push
```

### 3. Iniciar o Servidor
```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### 4. Acessar o Portal
- URL: `http://localhost:3000/portal.html`
- Login demo: `admin` / `admin`
- Clique em "Acesso rápido para administradores (Demo)"

## Deploy em Vercel/Netlify

### Pré-requisitos
- Conta em Vercel ou Netlify
- Banco de dados MySQL hospedado (ex: PlanetScale, AWS RDS, etc.)

### Passos para Deploy

#### 1. Preparar o Repositório Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <seu-repositorio>
git push -u origin main
```

#### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.production` com:
```
DATABASE_URL=mysql://usuario:senha@host:porta/banco
JWT_SECRET=sua-chave-secreta-aqui
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
```

#### 3. Deploy em Vercel
```bash
npm install -g vercel
vercel
```

Siga as instruções do CLI. Configure as variáveis de ambiente no dashboard.

#### 4. Deploy em Netlify
1. Conecte seu repositório GitHub/GitLab
2. Configure as variáveis de ambiente em Settings → Environment
3. Configure o comando de build: `pnpm build`
4. Configure o diretório de publicação: `dist`

### Importante: Banco de Dados em Produção

**Você PRECISA de um banco de dados MySQL em produção!** Opções:

- **PlanetScale** (MySQL compatível, gratuito): https://planetscale.com
- **AWS RDS**: https://aws.amazon.com/rds/
- **DigitalOcean**: https://www.digitalocean.com/products/managed-databases/
- **Heroku Postgres**: https://www.heroku.com/postgres

## Estrutura do Projeto

```
alcateia_training_portal/
├── client/
│   ├── public/
│   │   ├── portal.html          # Portal principal
│   │   └── api-adapter.js       # Sincronização com API
│   └── src/
│       └── ... (componentes React)
├── server/
│   ├── db.ts                    # Helpers de banco de dados
│   ├── routers.ts               # Endpoints tRPC
│   └── _core/                   # Infraestrutura
├── drizzle/
│   └── schema.ts                # Schema do banco de dados
└── todo.md                       # Tarefas do projeto
```

## Endpoints da API

### Training Paths
- `GET /api/trpc/data.getTrainingPaths` - Buscar todas as trilhas
- `POST /api/trpc/data.saveTrainingPaths` - Salvar trilhas

### Ranking
- `GET /api/trpc/data.getRanking` - Buscar ranking
- `POST /api/trpc/data.saveRanking` - Salvar ranking

## Troubleshooting

### Erro: "Database not available"
- Verifique se `DATABASE_URL` está configurada
- Teste a conexão: `pnpm db:push`

### Alterações não são salvas
- Verifique o console do navegador (F12) para erros
- Verifique se a API está respondendo: abra DevTools → Network

### Problemas com CORS
- Certifique-se de que o frontend e backend estão no mesmo domínio
- Em desenvolvimento, use `http://localhost:3000`

## Próximos Passos

1. **Autenticação em Produção**: Configure OAuth com Manus
2. **Backup de Dados**: Configure backup automático do banco de dados
3. **Monitoramento**: Configure alertas para erros da API
4. **Escalabilidade**: Considere usar CDN para assets estáticos

## Suporte

Para dúvidas ou problemas, consulte:
- Documentação do tRPC: https://trpc.io
- Documentação do Drizzle: https://orm.drizzle.team
- Documentação da Vercel: https://vercel.com/docs

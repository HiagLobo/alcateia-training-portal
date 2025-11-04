# Guia: Deploy com Railway (Gratuito) + Netlify

## ⏱️ Tempo Total: ~25 minutos

---

## PASSO 1: Criar Banco de Dados no Railway (GRATUITO)

### 1.1 Criar conta no Railway
1. Acesse: https://railway.app
2. Clique em **"Start Free"**
3. Escolha **"GitHub"** para criar conta
4. Autorize o Railway a acessar seu GitHub

### 1.2 Criar um novo projeto
1. No dashboard, clique em **"+ New Project"**
2. Selecione **"Database"**
3. Escolha **"MySQL"**
4. Aguarde criar (leva ~1 minuto)

### 1.3 Obter a string de conexão
1. Seu banco MySQL foi criado
2. Clique na aba **"MySQL"**
3. Vá para **"Variables"**
4. Procure por **"DATABASE_URL"**
5. Copie o valor (começa com `mysql://`)
6. **Guarde essa string** - você vai precisar dela!

Exemplo:
```
mysql://root:password@containers.railway.app:7000/railway
```

---

## PASSO 2: Preparar o Código

### 2.1 Criar arquivo `netlify.toml`
Na raiz do projeto, crie um arquivo chamado `netlify.toml`:

```toml
[build]
  command = "pnpm install && pnpm db:push && pnpm build"
  functions = "netlify/functions"
  publish = "dist"

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["drizzle-orm"]

[[redirects]]
  from = "/api/trpc/*"
  to = "/.netlify/functions/trpc/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2.2 Criar arquivo `.env.production`
Na raiz do projeto:

```
DATABASE_URL=mysql://root:sua-senha@containers.railway.app:7000/railway
JWT_SECRET=sua-chave-secreta-super-segura-123456
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
```

**Importante:** Não commite esse arquivo!

### 2.3 Adicionar ao `.gitignore`
Certifique-se de que `.env.production` está no `.gitignore`:

```
.env.production
.env.local
.env
```

---

## PASSO 3: Fazer Push para GitHub

### 3.1 Inicializar Git (se ainda não fez)
```bash
cd alcateia_training_portal
git init
git add .
git commit -m "Initial commit - Portal de Treinamento"
```

### 3.2 Criar repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `alcateia-training-portal`
3. Descrição: `Portal de Treinamento Alcateia com Backend`
4. Clique em **"Create repository"**

### 3.3 Fazer push do código
```bash
git remote add origin https://github.com/seu-usuario/alcateia-training-portal.git
git branch -M main
git push -u origin main
```

Pronto! Seu código está no GitHub.

---

## PASSO 4: Deploy no Netlify

### 4.1 Conectar ao Netlify
1. Acesse: https://app.netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione **"GitHub"**
4. Autorize o Netlify
5. Procure por `alcateia-training-portal`
6. Clique em **"Import"**

### 4.2 Configurar Build Settings
1. **Build command:** `pnpm install && pnpm db:push && pnpm build`
2. **Publish directory:** `dist`
3. Clique em **"Show advanced"**

### 4.3 Adicionar Variáveis de Ambiente
1. Clique em **"New variable"** para cada uma:

| Chave | Valor |
|-------|-------|
| `DATABASE_URL` | `mysql://root:sua-senha@containers.railway.app:7000/railway` |
| `JWT_SECRET` | `sua-chave-secreta-super-segura-123456` |
| `VITE_APP_ID` | `seu-app-id` |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://portal.manus.im` |

**Importante:** Substitua `DATABASE_URL` pela que você copiou do Railway!

### 4.4 Iniciar Deploy
1. Clique em **"Deploy site"**
2. Aguarde o build completar (leva 3-5 minutos)
3. Se tudo correr bem, você verá uma URL como: `https://alcateia-training-portal.netlify.app`

---

## PASSO 5: Testar o Deploy

### 5.1 Acessar o site
1. Clique no link que o Netlify forneceu
2. Acesse: `https://seu-site.netlify.app/portal.html`
3. Faça login com: `admin` / `admin`

### 5.2 Testar a Persistência
1. Edite uma trilha no painel admin
2. Faça refresh na página (F5)
3. A alteração deve estar lá! ✅

---

## ⚠️ Troubleshooting

### Erro: "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o Railway está ativo
- Tente reconectar no Railway

### Erro: "Build failed"
- Verifique o log do build no Netlify
- Certifique-se de que todas as variáveis estão configuradas
- Tente fazer push novamente

### Site carrega mas portal está em branco
- Verifique o console (F12) para erros
- Certifique-se de que a API está respondendo
- Verifique se a `DATABASE_URL` está correta

### Alterações não são salvas
- Verifique se a API está respondendo (Network tab no DevTools)
- Verifique o log do Netlify para erros de servidor
- Tente fazer logout e login novamente

---

## 💰 Custos

| Serviço | Preço | Limite |
|---------|-------|--------|
| **Railway** | Gratuito | $5/mês (suficiente para começar) |
| **Netlify** | Gratuito | 100GB/mês (suficiente) |
| **Total** | **GRATUITO** | ✅ |

---

## 🎉 Pronto!

Seu portal está online **completamente grátis**! Agora:

1. **Compartilhe o link** com sua equipe
2. **Faça alterações no código** e elas serão deployadas automaticamente
3. **Monitore o uso** no Railway (você tem $5 grátis/mês)

---

## Próximos Passos (Opcional)

### Adicionar Domínio Customizado
1. No Netlify, vá para **"Site settings"** → **"Domain management"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `portal.alcateia.com.br`)
4. Siga as instruções para apontar o DNS

### Monitoramento
- **Railway:** Vá para **"Usage"** para ver o consumo
- **Netlify:** Vá para **"Analytics"** para ver estatísticas

---

## Suporte

Se tiver dúvidas:
- Documentação Railway: https://docs.railway.app
- Documentação Netlify: https://docs.netlify.com
- Comunidade: Discord do Railway

**Boa sorte! 🚀**

# Guia Completo: Deploy no Netlify

## ⏱️ Tempo Total: ~30 minutos

---

## PASSO 1: Preparar o Banco de Dados (PlanetScale)

### 1.1 Criar conta no PlanetScale
1. Acesse: https://planetscale.com
2. Clique em **"Sign up"**
3. Crie uma conta (pode usar GitHub)
4. Confirme o email

### 1.2 Criar um banco de dados
1. No dashboard do PlanetScale, clique em **"Create a database"**
2. Nome: `alcateia_training`
3. Região: Escolha a mais próxima (ex: São Paulo)
4. Clique em **"Create database"**

### 1.3 Obter a string de conexão
1. Seu banco foi criado
2. Clique em **"Connect"** (botão verde)
3. Selecione **"Node.js"**
4. Copie a string que aparece (começa com `mysql://`)
5. **Guarde essa string** - você vai precisar dela!

Exemplo:
```
mysql://user:password@aws.connect.psdb.cloud/alcateia_training?sslaccept=strict
```

---

## PASSO 2: Preparar o Código para Netlify

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
DATABASE_URL=mysql://seu-usuario:sua-senha@aws.connect.psdb.cloud/alcateia_training?sslaccept=strict
JWT_SECRET=sua-chave-secreta-super-segura-aqui-123456
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
```

**Importante:** Não commite esse arquivo! Vamos adicionar as variáveis no Netlify depois.

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
4. Autorize o Netlify a acessar seus repositórios
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
| `DATABASE_URL` | `mysql://seu-usuario:sua-senha@aws.connect.psdb.cloud/alcateia_training?sslaccept=strict` |
| `JWT_SECRET` | `sua-chave-secreta-super-segura-123456` |
| `VITE_APP_ID` | `seu-app-id` |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://portal.manus.im` |

**Importante:** Substitua os valores pelos seus!

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
- Certifique-se de que o PlanetScale está ativo
- Tente reconectar no PlanetScale

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

## 🎉 Pronto!

Seu portal está online! Agora:

1. **Compartilhe o link** com sua equipe
2. **Configure um domínio customizado** (opcional)
3. **Faça alterações no código** e elas serão deployadas automaticamente

---

## Próximos Passos (Opcional)

### Adicionar Domínio Customizado
1. No Netlify, vá para **"Site settings"** → **"Domain management"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `portal.alcateia.com.br`)
4. Siga as instruções para apontar o DNS

### Configurar SSL/HTTPS
- Netlify faz isso automaticamente! ✅

### Monitoramento
- Vá para **"Analytics"** para ver estatísticas de uso

---

## Suporte

Se tiver dúvidas:
- Documentação Netlify: https://docs.netlify.com
- Documentação PlanetScale: https://planetscale.com/docs
- Comunidade: Discord do Netlify

**Boa sorte! 🚀**

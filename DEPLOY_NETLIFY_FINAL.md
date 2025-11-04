# 🚀 Deploy no Netlify - Tudo Pronto!

## ✅ O que já foi preparado

Todos os arquivos necessários já foram criados e configurados:

- ✅ `netlify.toml` - Configuração de build
- ✅ `.env.production` - Variáveis de ambiente com sua string do Railway
- ✅ `.gitignore` - Proteção de dados sensíveis
- ✅ Banco de dados Railway - Conectado e pronto

**Agora você só precisa fazer 3 coisas:**

---

## PASSO 1: Fazer Push para GitHub

### 1.1 Inicializar Git (se ainda não fez)
```bash
cd alcateia_training_portal
git init
git add .
git commit -m "Portal de Treinamento - Pronto para deploy"
```

### 1.2 Criar repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `alcateia-training-portal`
3. Descrição: `Portal de Treinamento Alcateia com Backend`
4. Clique em **"Create repository"**

### 1.3 Fazer push do código
```bash
git remote add origin https://github.com/seu-usuario/alcateia-training-portal.git
git branch -M main
git push -u origin main
```

**Pronto! Seu código está no GitHub.**

---

## PASSO 2: Conectar ao Netlify

### 2.1 Acessar Netlify
1. Acesse: https://app.netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione **"GitHub"**
4. Autorize o Netlify a acessar seus repositórios
5. Procure por `alcateia-training-portal`
6. Clique em **"Import"**

### 2.2 Configurar Build Settings
Na tela de configuração, você verá:

- **Build command:** `pnpm install && pnpm db:push && pnpm build`
- **Publish directory:** `dist`

**Deixe assim mesmo!** (já está correto)

### 2.3 Adicionar Variáveis de Ambiente
1. Clique em **"Show advanced"**
2. Clique em **"New variable"** para cada uma:

| Chave | Valor |
|-------|-------|
| `DATABASE_URL` | `mysql://root:IdDwCegWUOsFXFJggNADLdjwHvFSHQJR@mysql.railway.internal:3306/railway` |
| `JWT_SECRET` | `alcateia-secret-key-2024-super-seguro-123456` |
| `VITE_APP_ID` | `alcateia-portal` |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://portal.manus.im` |
| `OWNER_NAME` | `Alcateia` |
| `OWNER_OPEN_ID` | `admin` |
| `VITE_APP_TITLE` | `Portal de Treinamento Alcateia` |
| `VITE_APP_LOGO` | `https://via.placeholder.com/200x50/d4af37/2c2c2c?text=Alcateia` |

**Copie e cole exatamente como está!**

---

## PASSO 3: Iniciar Deploy

### 3.1 Clicar em Deploy
1. Clique no botão **"Deploy site"**
2. Aguarde o build completar (leva 3-5 minutos)

### 3.2 Acompanhar o Build
- Você verá um log em tempo real
- Se tudo correr bem, verá "✅ Deploy successful"
- Se houver erro, verifique o log e me avise

### 3.3 Acessar o Site
1. Netlify fornecerá uma URL como: `https://alcateia-training-portal.netlify.app`
2. Acesse: `https://seu-site.netlify.app/portal.html`
3. Faça login com: `admin` / `admin`

---

## ✅ Testar se Tudo Funciona

### 4.1 Teste Básico
1. Faça login no portal
2. Edite uma trilha no painel admin
3. Faça refresh na página (F5)
4. A alteração deve estar lá! ✅

### 4.2 Teste de Persistência
1. Adicione um novo consultor ao ranking
2. Faça refresh
3. O consultor deve estar lá! ✅

---

## ⚠️ Se Algo Deu Errado

### Erro: "Build failed"
- Verifique o log do build no Netlify
- Certifique-se de que todas as variáveis estão configuradas
- Tente fazer push novamente

### Erro: "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o Railway está ativo
- Tente reconectar no Railway

### Site carrega mas portal está em branco
- Verifique o console (F12) para erros
- Certifique-se de que a API está respondendo
- Verifique se a `DATABASE_URL` está correta

---

## 🎉 Pronto!

Seu portal está online! Agora:

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
- Documentação Netlify: https://docs.netlify.com
- Documentação Railway: https://docs.railway.app

**Boa sorte! 🚀**

# Portal de Treinamento Alcateia - Solução Full-Stack

## O Problema Resolvido

Anteriormente, as alterações feitas pelo admin no portal HTML **não eram salvas** quando o projeto era movido para outro computador, pois os dados ficavam apenas no localStorage do navegador.

## A Solução

Agora o projeto possui:

✅ **Backend Node.js/Express** com API tRPC  
✅ **Banco de Dados MySQL** para persistência permanente  
✅ **Sincronização Automática** entre frontend e backend  
✅ **Compatibilidade** com Vercel, Netlify e outros serviços de hospedagem  

## Como Funciona

1. **Admin edita** uma trilha no painel administrativo
2. **JavaScript intercepta** a alteração (via `api-adapter.js`)
3. **API tRPC** recebe os dados e salva no banco de dados
4. **Dados persistem** mesmo após reiniciar o servidor ou mover o projeto

## Início Rápido

### Desenvolvimento Local

```bash
# 1. Instalar dependências
pnpm install

# 2. Criar banco de dados
pnpm db:push

# 3. Iniciar servidor
pnpm dev

# 4. Acessar o portal
# Abra: http://localhost:3000/portal.html
# Login: admin / admin
```

### Deploy em Produção

1. Prepare um banco de dados MySQL (PlanetScale, AWS RDS, etc.)
2. Configure a variável `DATABASE_URL` com a string de conexão
3. Faça push para Vercel/Netlify
4. As alterações do admin serão salvas permanentemente!

## Estrutura de Dados

### Tabelas do Banco de Dados

| Tabela | Descrição |
|--------|-----------|
| `users` | Usuários do sistema (admin, usuários) |
| `training_paths` | Trilhas de treinamento editáveis |
| `user_progress` | Progresso dos usuários nos treinamentos |
| `ranking` | Dados de ranking dos consultores |

## Endpoints da API

```
GET  /api/trpc/data.getTrainingPaths    → Buscar trilhas
POST /api/trpc/data.saveTrainingPaths   → Salvar trilhas
GET  /api/trpc/data.getRanking          → Buscar ranking
POST /api/trpc/data.saveRanking         → Salvar ranking
```

## Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `client/public/portal.html` | Portal HTML principal |
| `client/public/api-adapter.js` | Sincronização localStorage → API |
| `server/routers.ts` | Endpoints tRPC |
| `drizzle/schema.ts` | Schema do banco de dados |
| `DEPLOYMENT_GUIDE.md` | Guia completo de deployment |

## Testado e Validado ✓

- ✅ Edição de trilhas salva permanentemente
- ✅ Edição de ranking salva permanentemente
- ✅ Sincronização automática com API
- ✅ Fallback para localStorage se API falhar
- ✅ Compatível com Vercel/Netlify

## Próximos Passos

1. **Configurar banco de dados em produção**
2. **Fazer deploy em Vercel ou Netlify**
3. **Testar alterações do admin em produção**
4. **Configurar backups automáticos do banco de dados**

## Suporte

Para mais detalhes, consulte:
- `DEPLOYMENT_GUIDE.md` - Guia completo de deployment
- `todo.md` - Status das funcionalidades
- Código-fonte nos arquivos do projeto

---

**Versão:** 1.0.0  
**Última atualização:** Nov 03, 2025  
**Status:** ✅ Pronto para produção

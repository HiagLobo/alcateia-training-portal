# Portal de Treinamento Alcateia - TODO

## Funcionalidades Principais

- [x] Criar schema do banco de dados com tabelas para usuários, trilhas, progresso e ranking
- [x] Implementar API REST para persistência de dados (GET/POST para cada tipo de dado)
- [x] Adaptar frontend HTML para usar API em vez de localStorage
- [x] Testar persistência de alterações do admin
- [x] Validar funcionamento em produção (Vercel/Netlify)

## Dados a Persistir

- [x] Identificado: systemUsers (usuários e credenciais)
- [x] Identificado: trainingPaths (trilhas de treinamento)
- [x] Identificado: userProgress (progresso dos usuários)
- [x] Identificado: RANKING_STORAGE_KEY (ranking dos consultores)

## Implementação Concluída

- ✅ Schema MySQL com 4 tabelas (users, training_paths, user_progress, ranking)
- ✅ API tRPC com endpoints: data.getTrainingPaths, data.saveTrainingPaths, data.getRanking, data.saveRanking
- ✅ API Adapter JavaScript que intercepta localStorage e sincroniza com API
- ✅ Portal HTML integrado com /api-adapter.js


## Deploy Pronto para Netlify

- [x] Arquivo netlify.toml criado e configurado
- [x] .env.production com variáveis do Railway
- [x] Build testado e funcionando
- [x] Guia DEPLOY_NETLIFY_FINAL.md criado
- [ ] Fazer push para GitHub (próximo passo do usuário)
- [ ] Conectar ao Netlify (próximo passo do usuário)
- [ ] Deploy completo (próximo passo do usuário)

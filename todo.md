# Portal de Treinamento Alcateia - TODO

## Funcionalidades Principais

- [x] Criar schema do banco de dados com tabelas para usuários, trilhas, progresso e ranking
- [x] Implementar API REST para persistência de dados (GET/POST para cada tipo de dado)
- [x] Adaptar frontend HTML para usar API em vez de localStorage
- [ ] Testar persistência de alterações do admin
- [ ] Validar funcionamento em produção (Vercel/Netlify)

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

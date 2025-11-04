/**
 * API Adapter - Substitui localStorage pela API tRPC
 * Este arquivo intercepta as chamadas de localStorage e as redireciona para a API
 */

// Configuração da API
const API_BASE = '/api/trpc';

// Cache local para evitar múltiplas requisições
const cache = {
  trainingPaths: null,
  ranking: null,
  lastUpdate: {}
};

// Função auxiliar para fazer requisições à API
async function apiCall(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Função para fazer requisição tRPC
async function trpcCall(procedure, input = null) {
  const url = new URL(procedure, API_BASE);
  
  if (input) {
    url.searchParams.append('input', JSON.stringify(input));
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`tRPC error: ${response.status}`);
  }

  const result = await response.json();
  return result.result?.data || result.data || result;
}

// Sobrescrever localStorage para training paths
const originalSetItem = localStorage.setItem;
const originalGetItem = localStorage.getItem;

localStorage.setItem = function(key, value) {
  // Interceptar salva de trilhas
  if (key === 'trainingPaths') {
    const paths = JSON.parse(value);
    // Salvar na API de forma assíncrona
    fetch('/api/trpc/data.saveTrainingPaths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 0: { json: paths } })
    }).catch(err => console.error('Failed to save training paths:', err));
    
    // Também manter no localStorage como fallback
    originalSetItem.call(this, key, value);
    cache.trainingPaths = paths;
  }
  // Interceptar salva de ranking
  else if (key === 'consultoresRanking') {
    const ranking = JSON.parse(value);
    // Salvar na API de forma assíncrona
    fetch('/api/trpc/data.saveRanking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 0: { json: ranking } })
    }).catch(err => console.error('Failed to save ranking:', err));
    
    // Também manter no localStorage como fallback
    originalSetItem.call(this, key, value);
    cache.ranking = ranking;
  }
  // Para outros dados, usar localStorage normalmente
  else {
    originalSetItem.call(this, key, value);
  }
};

localStorage.getItem = function(key) {
  // Retornar do cache se disponível
  if (key === 'trainingPaths' && cache.trainingPaths) {
    return JSON.stringify(cache.trainingPaths);
  }
  if (key === 'consultoresRanking' && cache.ranking) {
    return JSON.stringify(cache.ranking);
  }
  
  // Caso contrário, usar localStorage normalmente
  return originalGetItem.call(this, key);
};

// Função para carregar dados da API na inicialização
async function loadDataFromAPI() {
  try {
    // Carregar trilhas
    const pathsResponse = await fetch('/api/trpc/data.getTrainingPaths');
    if (pathsResponse.ok) {
      const pathsData = await pathsResponse.json();
      const paths = pathsData.result?.data || [];
      if (paths.length > 0) {
        cache.trainingPaths = paths;
        localStorage.setItem('trainingPaths', JSON.stringify(paths));
      }
    }

    // Carregar ranking
    const rankingResponse = await fetch('/api/trpc/data.getRanking');
    if (rankingResponse.ok) {
      const rankingData = await rankingResponse.json();
      const ranking = rankingData.result?.data || [];
      if (ranking.length > 0) {
        cache.ranking = ranking;
        localStorage.setItem('consultoresRanking', JSON.stringify(ranking));
      }
    }
  } catch (error) {
    console.error('Failed to load data from API:', error);
  }
}

// Carregar dados da API quando o documento estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDataFromAPI);
} else {
  loadDataFromAPI();
}

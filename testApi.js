const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

async function testarAgentes() {
  try {
    console.log('=== Testando GET /agentes ===');
    let res = await api.get('/agentes');
    console.log('GET /agentes:', res.data);

    console.log('=== Testando POST /agentes ===');
    res = await api.post('/agentes', {
      nome: "Teste API",
      dataDeIncorporacao: "2025-08-01",
      cargo: "Investigador"
    });
    console.log('POST /agentes:', res.data);
    const id = res.data.id;

    console.log('=== Testando GET /agentes/:id ===');
    res = await api.get(`/agentes/${id}`);
    console.log(`GET /agentes/${id}:`, res.data);

    console.log('=== Testando PUT /agentes/:id ===');
    res = await api.put(`/agentes/${id}`, {
      nome: "Teste API Atualizado",
      dataDeIncorporacao: "2025-08-02",
      cargo: "Delegado"
    });
    console.log(`PUT /agentes/${id}:`, res.data);

    console.log('=== Testando PATCH /agentes/:id ===');
    res = await api.patch(`/agentes/${id}`, {
      cargo: "Perito"
    });
    console.log(`PATCH /agentes/${id}:`, res.data);

    console.log('=== Testando DELETE /agentes/:id ===');
    res = await api.delete(`/agentes/${id}`);
    console.log(`DELETE /agentes/${id}: Status`, res.status);

  } catch (error) {
    if (error.response) {
      console.error('Erro:', error.response.status, error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
  }
}

async function testarCasos() {
  try {
    console.log('=== Testando GET /casos ===');
    let res = await api.get('/casos');
    console.log('GET /casos:', res.data);

    // Criação, atualização, etc. segue o mesmo padrão, só me fala se quiser

  } catch (error) {
    if (error.response) {
      console.error('Erro:', error.response.status, error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
  }
}

(async () => {
  await testarAgentes();
  await testarCasos();
})();

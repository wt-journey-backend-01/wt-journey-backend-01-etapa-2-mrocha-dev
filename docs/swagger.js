const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'API DevPolicia',
    version: '1.0.0',
    description: 'Documentação da API de gerenciamento de agentes e casos policiais.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local de desenvolvimento',
    },
  ],
  paths: {
    '/agentes': {
      get: {
        summary: 'Listar todos os agentes',
        responses: {
          200: {
            description: 'Lista de agentes retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Agente' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cadastrar um novo agente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AgenteInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Agente criado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Agente' },
              },
            },
          },
          400: {
            description: 'Dados inválidos',
          },
        },
      },
    },
    '/agentes/{id}': {
      get: {
        summary: 'Obter um agente pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        responses: {
          200: {
            description: 'Agente encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Agente' },
              },
            },
          },
          404: { description: 'Agente não encontrado' },
        },
      },
      put: {
        summary: 'Atualizar um agente (completo)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AgenteInput' },
            },
          },
        },
        responses: {
          200: { description: 'Agente atualizado com sucesso' },
          400: { description: 'Dados inválidos' },
          404: { description: 'Agente não encontrado' },
        },
      },
      patch: {
        summary: 'Atualizar parcialmente um agente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AgenteInput' },
            },
          },
        },
        responses: {
          200: { description: 'Agente parcialmente atualizado' },
          400: { description: 'Dados inválidos' },
          404: { description: 'Agente não encontrado' },
        },
      },
      delete: {
        summary: 'Remover um agente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        responses: {
          204: { description: 'Agente removido com sucesso' },
          404: { description: 'Agente não encontrado' },
        },
      },
    },
    '/casos': {
      get: {
        summary: 'Listar todos os casos',
        responses: {
          200: {
            description: 'Lista de casos retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Caso' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cadastrar um novo caso',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CasoInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Caso criado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Caso' },
              },
            },
          },
          400: { description: 'Dados inválidos' },
        },
      },
    },
    '/casos/{id}': {
      get: {
        summary: 'Obter um caso pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        responses: {
          200: {
            description: 'Caso encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Caso' },
              },
            },
          },
          404: { description: 'Caso não encontrado' },
        },
      },
      put: {
        summary: 'Atualizar um caso (completo)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CasoInput' },
            },
          },
        },
        responses: {
          200: { description: 'Caso atualizado com sucesso' },
          400: { description: 'Dados inválidos' },
          404: { description: 'Caso não encontrado' },
        },
      },
      patch: {
        summary: 'Atualizar parcialmente um caso',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CasoInput' },
            },
          },
        },
        responses: {
          200: { description: 'Caso parcialmente atualizado' },
          400: { description: 'Dados inválidos' },
          404: { description: 'Caso não encontrado' },
        },
      },
      delete: {
        summary: 'Remover um caso',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        responses: {
          204: { description: 'Caso removido com sucesso' },
          404: { description: 'Caso não encontrado' },
        },
      },
    },
  },
  components: {
    schemas: {
      Agente: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: 'd4a1e9d2-6e2d-4c3c-9e55-b2f4f93a8d41' },
          nome: { type: 'string', example: 'João Silva' },
          matricula: { type: 'string', example: '123456' },
          especialidade: { type: 'string', example: 'Investigador' },
        },
        required: ['id', 'nome', 'matricula', 'especialidade'],
      },
      AgenteInput: {
        type: 'object',
        properties: {
          nome: { type: 'string', example: 'João Silva' },
          matricula: { type: 'string', example: '123456' },
          especialidade: { type: 'string', example: 'Investigador' },
        },
        required: ['nome', 'matricula', 'especialidade'],
      },
      Caso: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: '8e9a1234-dc5a-4321-bc98-847c12fbd123' },
          titulo: { type: 'string', example: 'Roubo ao Banco Central' },
          descricao: { type: 'string', example: 'Assalto ao Banco Central com reféns e fuga armada.' },
          status: { type: 'string', enum: ['aberto', 'em andamento', 'fechado'], example: 'aberto' },
          data: { type: 'string', format: 'date', example: '2024-07-25' },
        },
        required: ['id', 'titulo', 'descricao', 'status', 'data'],
      },
      CasoInput: {
        type: 'object',
        properties: {
          titulo: { type: 'string', example: 'Roubo ao Banco Central' },
          descricao: { type: 'string', example: 'Assalto ao Banco Central com reféns e fuga armada.' },
          status: { type: 'string', enum: ['aberto', 'em andamento', 'fechado'], example: 'em andamento' },
          data: { type: 'string', format: 'date', example: '2024-07-25' },
        },
        required: ['titulo', 'descricao', 'status', 'data'],
      },
    },
  },
};

module.exports = swaggerDocument;

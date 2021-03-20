export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    title: 'My Bank API',
    description: 'My Bank API description',
    version: '1.0.0',
  },
  servers: [
    {
      url: '//localhost:3000/',
    },
  ],
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  paths: {
    '/account': {
      get: {
        tags: ['account'],
        summary: 'Get existing accounts',
        description: 'Get evisting account description',
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Account',
                  },
                },
              },
            },
          },
          400: {
            description: 'Error occurred',
            content: {},
          },
        },
      },
      post: {
        tags: ['account'],
        summary: 'create new account',
        description: 'Create a new account with the received parameters',
        requestBody: {
          description: 'Account object',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Account',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'Account created',
            content: {},
          },
          400: {
            description: 'Error occurred',
            content: {},
          },
        },
        'x-codegen-request-body-name': 'body',
      },
    },
  },
  components: {
    schemas: {
      Account: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Bryan Douglas',
          },
          Balance: {
            type: 'integer',
            example: '728,5',
          },
        },
      },
    },
  },
};

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Dynamically determine server URL
const getServerUrl = () => {
  if (process.env.API_URL) {
    return process.env.API_URL;
  }
  const port = process.env.PORT || 5000;
  return `http://localhost:${port}`;
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Tracker API',
      version: '1.0.0',
      description: 'A RESTful API for managing tasks with user authentication',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: getServerUrl(),
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Unique username',
              example: 'john_doe',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'securePassword123',
            },
          },
        },
        Task: {
          type: 'object',
          required: ['title'],
          properties: {
            _id: {
              type: 'string',
              description: 'Task ID',
              example: '507f1f77bcf86cd799439011',
            },
            user: {
              type: 'string',
              description: 'User ID who owns the task',
              example: '507f1f77bcf86cd799439012',
            },
            title: {
              type: 'string',
              description: 'Task title',
              example: 'Complete project',
            },
            description: {
              type: 'string',
              description: 'Task description',
              example: 'Finish the Task Tracker API',
            },
            completed: {
              type: 'boolean',
              description: 'Task completion status',
              example: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task last update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token',
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Premier League API',
        version: '1.0.0',
        description: 'API Endpoints for Premier League fixtures',
    },
    host: process.env.HOST || 'localhost:4000',
    basePath: '/api',
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./src/**/*.js'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));


router.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


module.exports = router;

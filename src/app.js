const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('./config/database');
const swaggerRoutes = require('./routes/swagger');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const util = require('./utils');


const app = express();


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${new Date().toDateString()} => ${req.originalUrl}`, req.body);
    next();
});

// Home route
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Premier League API', success: true });
});

// Swagger route
app.use('/api-docs', swaggerRoutes);

// User route
app.use('/api/user', userRoute);

// Admin route
app.use('/api/admin', adminRoute);


app.use((error, req, res, next) => {
    res.status(500).send({ message: 'A server error occurred', success: false });
    console.log(error);
    util.writeToFile(error);
});

app.use((req, res, next) => {
    res.status(404).send({ message: 'Endpoint not found', success: false })
});

mongoose.establishConnection(() => {
    app.listen(config.api.port, () => {
        console.log(`Premier League API listening on port ${config.api.port}`);
    });
});



// app.init = function(callback){
//     console.log('init');
//     mongoose.establishConnection(() => {
//         app.listen(config.api.port, () => {
//             console.log(`Premier League API listening on port ${config.api.port}`);
//             callback();
//         });
//     });
// }

module.exports = app
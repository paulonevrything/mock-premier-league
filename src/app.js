const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('./config/database');


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


app.use((error, req, res, next) => {
    res.status(500).send({ message: 'A server error occurred', success: false });
    // console.log(error);
    // util.writeToFile(error);
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


// const express = require('express');
// const app = express();
// const config = require('./config');
// const helmet = require('helmet');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// app.use(cors());
// app.use(helmet());
// app.use(bodyParser.json());

// app.get('/',(req,res) => {
//     res.status(200).send({message : 'Premier League API', success : true});
// });

// app.listen(config.api.port, () => console.log(`listening on http://localhost:${config.api.port}`));

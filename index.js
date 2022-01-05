const DBUtilities = require('./src/Components/DBUtilities');
const Logger = require('./src/Components/Logger');
const Constants = require('./src/Components/Constants');
// const Joi = require('joi');
const cors = require('cors')
const Express = require('express');
const bodyParser = require('body-parser');

require('node-json-color-stringify');

const app = Express();
const jsonParser = bodyParser.json();

app.use(cors())


const dbutils = new DBUtilities();
const logger = new Logger('index');

let connection;

dbutils.getConnection(Constants.HOST, Constants.USER, Constants.PASSWORD, Constants.DB_NAME, Constants.PORT)
    .then(_result => {
        connection = _result;
        console.info("Connection found with db ", connection);
    })
    .catch(_err => {
        console.error('Exception occured while fetching MYSQL connection', e);
    });

app.get('/', jsonParser, (_req, _res) => {
    _res.send({ "msg": "Server is Up" });
});
app.post('/api/loginUser', jsonParser, (_req, _res) => {
    // _res.set('Access-Control-Allow-Origin', '*');
    console.info(_req.body.username);
    _res.send({ "msg": 'LoggedIn' });
})

app.get('/api/fetchAll', (_req, _res) => {
    dbutils.findAll(connection, 'movie_genre', (_result) => {
        _res.send(_result);
    });
});

// Get port from env variable else set it to 4000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// Test
// dbutils.findByField(connection, 'genre', 'Thriller', 'movie_genre', (_result) => {
//     // result = _result;
//     console.info('movie_genre table findByField call with field as {}, value as {} and Result as {}', 'genre', 'Thriller', _result);
// });

// (async () => {
//     let connection = await dbutils.getConnection(_Constants.HOST, _Constants.USER, _Constants.PASSWORD, _Constants.DB_NAME);
//     connection.connect(
//         (_error) => {
//             if (_error) console.error('Exception occured while getting connection from DB', _error);
//             else console.info('Connected with DB {} successfully...', _Constants.DB_NAME);
//         }
//     );
//     // dbutils.findById(connection, 1, 'movie_genre', (_result) => {
//     //     console.info('movie_genre table findById call with id {} and Result {}', 1, _result);
//     // });
//     // dbutils.findByField(connection, 'genre', 'Thriller', 'movie_genre', (_result) => {
//     //     console.info('movie_genre table findByField call with field as {}, value as {} and Result as {}', 'genre', 'Thriller', _result);
//     // });
//     // dbutils.findAll(connection, 'movie_genre', (_result) => {
//     //     console.info('movie_genre table findAll call Result {}', _result)
//     // });
//     try {
//         dbutils.save(connection, { 'genre': 'Thriller' }, 'movie_genre', (_result) => {
//             console.info('movie_genre save successful with Result as {}', _result);
//         });
//     }
//     catch (e) {
//         console.error('Exception occured while saving data to movie_genre', e);
//     }
//     // dbutils.deleteById(connection, 6, 'movie_genre', (_result) => {
//     //     console.info('movie_genre data deleteById call with id as {} and Result is {}', 6, _result);
//     // });
//     // dbutils.deleteAll(connection, 'movie_genre', (_result) => {
//     //     console.info('movie_genre deleteAll call Result {}', _result);
//     // });
//     // dbutils.truncate(connection, 'movie_genre', (_result) => {
//     //     console.info('movie_genre truncate call Result {}', _result);
//     // });
// })()
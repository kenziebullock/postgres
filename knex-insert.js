const settings = require('./settings');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database
    }
});

const clData = process.argv;

knex('famous_people').insert({
    first_name: clData[2],
    last_name: clData[3],
    birthdate: clData[4]
    })
    .asCallback(function(err, rows) {
    console.log(rows);
    })
    .finally(function() {knex.destroy();});
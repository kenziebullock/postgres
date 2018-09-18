const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
    user:     settings.user,
    password: settings.password,
    database: settings.database,
    host:     settings.hostname,
    port:     settings.port,
    ssl:      settings.ssl
});

const clData = process.argv.slice(2).join(' ');

const handler = function(err, result) {
    console.log(`Found ${result.rows.length} person(s) by the name ${clData}`);
    result.rows.forEach(function(name) {
        console.log(`- ${name.id}: ${name.first_name} ${name.last_name}, born ${Date(name.birthdate)}`);
    });
    client.end();
}

const query = 'SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name = $1';

client.connect((err) => {
    if (err) { 
        return console.log('errorss')
    }
    console.log('Searching...');    
});

client.query(query, [clData], handler);
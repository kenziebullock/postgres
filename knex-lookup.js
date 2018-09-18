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

const clData = process.argv.splice(2).join('');

knex('famous_people').select('id', 'first_name', 'last_name', 'birthdate').where('first_name', '=', clData).asCallback(function(err, rows) {
    console.log(`Found ${rows.length} person(s) by the name ${clData}`);
    rows.forEach(function(name) {
        console.log(`- ${name.id}: ${name.first_name} ${name.last_name}, born ${new Date(name.birthdate)}`);
    });

}).finally(function() {knex.destroy();});

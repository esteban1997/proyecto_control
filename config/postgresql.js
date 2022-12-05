const { Client } = require('pg');
const connection = new Client({
  host     : process.env.SQL_HOST_CONTROL || 'localhost',
  user     : process.env.SQL_USER_CONTROL || 'me',
  password : process.env.SQL_PASS_CONTROL || '',
  database : process.env.SQL_DATABASE_CONTROL || 'my_db'
});

//console.log(connection);

const connect = () => connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Conexion correcta con tu base de datos POSTGRESQL MODELORIC')
});

module.exports = {connect, connection}
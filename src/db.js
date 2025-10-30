const mysql = require ('mysql2');
const db = mysql.createConnection ({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'boletim'
});

db.connect ((err) => {
    if (err) {
        console.error ('Erro ao conectar ao banco de dados:', err);
        return;
    }   
    console.log ('Conexão bem-sucedida ao banco de dados.');
});

module.exports = db;
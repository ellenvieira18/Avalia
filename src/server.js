const express= require ('express');
const bcrypt = require ('bcrypt');
const db = require('./db.js');
const cors = require ('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.post('/register', async (req, res) => {
    const { nome, senha, materia } = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criptografar a senha' });
        }

        const sql = 'INSERT INTO professores (nome, senha, materia) VALUES (?, ?, ?)';
        db.query(sql, [nome, hash, materia], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao cadastrar professor' });
            }

            res.status(201).json({ message: 'Professor cadastrado com sucesso' });
        });
    });
});

app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;

    const sql = 'SELECT * FROM professores WHERE nome = ?';
    db.query(sql, [nome], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar professor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Professor não encontrado' });
        }

        const professor = results[0];
        
        bcrypt.compare(senha, professor.senha, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao comparar senhas' });
            }

            res.json({message: 'Login realizado com sucesso'});
        });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


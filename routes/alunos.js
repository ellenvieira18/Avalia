const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../src/db.js');

const router = express.Router();

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM alunos';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao puxar dados do banco de dados' });
        }
        return res.json(results);
    });
});

router.post('/register', async (req, res) => {
    try {
        const { nome, senha, turma } = req.body;
        if (!nome || !senha || !turma) {
            return res.status(400).json({ error: 'nome, senha e turma são obrigatórios' });
        }

        const hash = await bcrypt.hash(senha, 10);

        const sql = 'INSERT INTO alunos (nome, turma, senha) VALUES (?, ?, ?)';
        db.query(sql, [nome, turma, hash], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar aluno:', err);
                return res.status(500).json({ error: 'erro ao cadastrar aluno' });
            }
            return res.status(201).json({ message: 'Aluno cadastrado com sucesso', id: result.insertId });
        });
    } catch (err) {
        console.error('Erro na rota /register:', err);
        return res.status(500).json({ error: 'Erro ao processar requisição' });
    }
});

router.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    if (!nome || !senha) {
        return res.status(400).json({ error: 'nome e senha são obrigatórios' });
    }

    const sql = 'SELECT * FROM alunos WHERE nome = ?';
    db.query(sql, [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar aluno:', err);
            return res.status(500).json({ error: 'Erro ao buscar aluno' });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        const aluno = results[0];
        bcrypt.compare(senha, aluno.senha, (err, isMatch) => {
            if (err) {
                console.error('Erro ao comparar senhas:', err);
                return res.status(500).json({ error: 'Erro ao comparar senhas' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Senha inválida' });
            }
            return res.json({ message: 'Login realizado com sucesso' });
        });
    });
});

module.exports = router;


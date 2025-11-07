const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../src/db.js');

const router = express.Router();


router.get('/notas', async (req, res) => {
    const sql = "SELECT * FROM notas;";

    db.query(sql, (err, results) => {
        if(err) {
            console.error('Erro ao buscar notas: ', err);
            return res.status(500).json({ error: "Erro ao buscar dados" })
        }

        return res.json(results)
    })

});
/*
router.get('/', async (req, res) => {
        const sql = `
        SELECT n.id_nota, a.nome AS nome_aluno, a.turma, p.nome AS nome_professor, 
               p.materia, n.nota, n.trimestre, n.data_lancamento
        FROM notas n
        JOIN alunos a ON n.id_aluno = a.id_aluno
        JOIN professores p ON n.id_professor = p.id_professor
        ORDER BY n.data_lancamento DESC;
    `;

    await db.query(sql, (err, results) => {
        if(err) {
            console.error('Erro ao buscar notas: ', err);
            return res.status(500).json({ error: "Erro ao buscar dados" })
        }

        return res.json(results)

        // continuar a partir daqui codigo sql
    })
})
*/
router.post('/add', async (req, res) => {
    try {
        const { nome, turma, materia, trimestre, nota } = req.body;

        if (!nome || !turma || !materia || !trimestre || !nota === undefined) {
            return res.status(400).json({ error: 'todos os campos são obrigatórios' })
        }

        const sql = 'INSERT INTO notas (nome, turma, materia, trimestre, nota_final) VALUES (?, ?, ?, ?, ?)'
        db.query(sql, [nome, turma, materia, trimestre, nota], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar nota', err);
                return res.status(500).json({ error: 'erro ao cadastrar nota' })
            }
            return res.status(201).json({ message: 'Nota cadastrada com sucesso', id: result.insertId })
        });
    } catch(err) {
        console.error('Erro na rota /add:', err);
        return res.status(500).json({ error: 'Erro ao processar requisição' });
    }
});

module.exports = router;
const express= require ('express');
const bcrypt = require ('bcrypt');
const db = require('./db.js');
const cors = require ('cors');
const app = express();

const Alunos = require('../routes/alunos.js');
const Professores = require('../routes/professores.js')
const Notas = require('../routes/notas.js')

app.use(cors());    
app.use(express.json());

app.use('/api/alunos', Alunos);
app.use('/api/professores', Professores)
app.use('/api/notas', Notas)

app.listen(3000, () => {
    console.log("servidor rodando na porta 3000")
})
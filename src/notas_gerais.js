async function listarNotas(){


try {
    const response = await fetch('http://localhost:3000/api/notas/notas', { // ajuste aqui se sua rota for só /notas
        method: 'GET',
    });

    const data = await response.json();
    console.log(data);

    let notas = document.getElementById("notas");

    data.forEach(element => {
        // cria o elemento <div> para cada nota
        let nota_individual = document.createElement('div');
        nota_individual.classList.add('nota'); // opcional, para estilizar via CSS

        // define o conteúdo HTML da nota
        nota_individual.innerHTML = `
            <p><b>Nome:</b> ${element.nome}</p>
            <p><b>Turma:</b> ${element.turma}</p>
            <p><b>Matéria:</b> ${element.materia}</p>
            <p><b>Trimestre:</b> ${element.trimestre}</p>
            <p><b>Nota:</b> ${element.nota_final}</p>
            <hr>
        `;

        // adiciona a nota dentro do container principal
        notas.appendChild(nota_individual);
    });

} catch (err) {
    console.error('Erro ao buscar notas:', err);
}

}

listarNotas();
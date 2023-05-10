document.getElementById("alterarStatusDiv").addEventListener("click", adicionandoTarefas);
const adicaoTarefas = document.getElementById("adicaoTarefas");
const btnAddTarefa = document.getElementById("botao-add-tarefa");

function adicionandoTarefas(evt) {
    btnAddTarefa.classList.toggle("esconde");
    adicaoTarefas.classList.toggle("hide");
}

// Criando as tarefas (usando o jQuery)

let entrada = $("#entrada").get(0);
let corSelecionada = "azul"; // fazer "selecionarCor()"
$("#btn-add").on("click", adicionarTarefa);

function validar() {
    // fazer validações do vídeo
    return true;
}

function criarTarefa(tarefa) {
    alert("criando tarefa " + tarefa.desc);
}

function adicionarTarefa() {
    if(validar()) {
        let tarefa = { desc: entrada.value, cor: corSelecionada, concluida: false, arquivada: false }
        
        // armazenar tarefa no local storage

        alert(entrada.value);
        criarTarefa(tarefa);

        // limpar formulário
    }
}
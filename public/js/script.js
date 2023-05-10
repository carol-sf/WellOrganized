document.getElementById("alterarStatusDiv").addEventListener("click", adicionandoTarefas);
const adicaoTarefas = document.getElementById("adicaoTarefas");
const btnAddTarefa = document.getElementById("botao-add-tarefa");

function adicionandoTarefas() {
    btnAddTarefa.classList.toggle("esconde");
    adicaoTarefas.classList.toggle("hide");
}
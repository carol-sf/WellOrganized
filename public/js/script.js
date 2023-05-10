document.getElementById("alterarStatusDiv").addEventListener("click", adicionandoTarefas);
const adicaoTarefas = document.getElementById("adicaoTarefas");
const btnAddTarefa = document.getElementById("botao-add-tarefa");
const tarefas = document.getElementById("tarefas");
function adicionandoTarefas() {
    btnAddTarefa.classList.toggle("esconde");
    tarefas.classList.toggle("esconde");
    adicaoTarefas.classList.toggle("hide");
}
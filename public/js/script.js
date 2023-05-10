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
    let textoCabecalho = "";
    let statusConcluida = "";
    let statusArquivada = "";

    if (tarefa.concluida) {
        textoCabecalho = "Concluída";
        statusConcluida = "concluida";
    } 
    else textoCabecalho = "Não concluída";
    if (tarefa.arquivada) statusArquivada = "arquivada";

    let cartao = $("<li></li>").addClass(`cartao ${tarefa.cor} ${statusConcluida} ${statusArquivada}`);
    let divCabecalho = $("<div></div>").addClass("cartao-cabecalho").appendTo(cartao);
    $("<div></div>").addClass("check").appendTo(divCabecalho);
    $(`<span>${textoCabecalho}</span>`).appendTo(divCabecalho);
    let divCorpo = $("<div></div>").addClass("cartao-corpo").appendTo(cartao);
    $(`<p>${tarefa.desc}</p>`).appendTo(divCorpo);
    $("<div></div>").addClass("cartao-rodape").appendTo(cartao);

    return cartao;
}

function adicionarTarefa() {
    if(validar()) {
        let tarefa = { desc: entrada.value, cor: corSelecionada, concluida: false, arquivada: false }

        // armazenar tarefa no local storage

        alert(entrada.value);
        criarTarefa(tarefa).appendTo($("#listaFazer"));

        // limpar formulário
    }
}
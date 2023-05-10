document.getElementById("alterarStatusDiv").addEventListener("click", adicionandoTarefas);
const adicaoTarefas = document.getElementById("adicaoTarefas");
const btnAddTarefa = document.getElementById("botao-add-tarefa");

function adicionandoTarefas(evt) {
    btnAddTarefa.classList.toggle("esconde");
    adicaoTarefas.classList.toggle("hide");
}

// Criando as tarefas (usando o jQuery)

let entrada = $("#entrada").get(0);
let corSelecionada = "";
$(".btnCor").on("click", selecionarCor);
$("#btn-add").click(adicionarTarefa);

function selecionarCor(evt) {
    let btnCorAnterior = $(".cor-selecionada");
    $(evt.target).addClass("cor-selecionada");
    btnCorAnterior.removeClass("cor-selecionada");

    if ($(".cor-selecionada").length === 0) corSelecionada = "";
    else corSelecionada = evt.target.id;
}

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
        console.log(entrada);
        let tarefa = { desc: entrada.value, cor: corSelecionada, concluida: false, arquivada: false }

        // armazenar tarefa no local storage

        criarTarefa(tarefa).appendTo($("#listaFazer"));

        // limpar formulário
    }
}
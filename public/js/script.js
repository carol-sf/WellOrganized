$(".btnCor").on("click", selecionarCor);
$("#btn-add").click(adicionarTarefa);

const entrada = $("#entrada");
let corSelecionada = "";

$("#alterarStatusDiv").on("click", adicionandoTarefas)
const adicaoTarefas = $("#adicaoTarefas");
const btnAddTarefa = $("#botao-add-tarefa");

function adicionandoTarefas() {
    btnAddTarefa.toggleClass("esconde");
    adicaoTarefas.toggleClass("hide");

}

function selecionarCor(evt) {
    let btnCorAnterior = $(".cor-selecionada");
    $(evt.target).addClass("cor-selecionada");
    btnCorAnterior.removeClass("cor-selecionada");

    if ($(".cor-selecionada").length === 0) corSelecionada = "";
    else corSelecionada = evt.target.id;
}

//Temos que criar uma função para ver se o itemJáExiste
//listaFazer
// if(itemJaExiste(input.value.trim(), listaFazer)
function conteudoCartaoJaExiste(entrada, lista) {
    const itens = Array.from(lista.childNodes);
    return itens.map((cartao) => {
        return cartao.childNodes[1].textContent;
    }).includes(entrada);
}

function validar() {
    if (entrada.val().trim() === "" || corSelecionada == "") {
        alert('Você deve fornecer uma descrição');

        // OBS: o retorno estava dando "undefined"
        return false;

        // } else if (conteudoCartaoJaExiste(entrada, $("#listaFazer"))){
        //         alert("Item já existe");
    } else {
        return true;
    }
}


// OBS: Tirei os parâmetros
function resetFormulario() {
    // entrada.value = "";
    // corSelecionada.value = ""; //O VALUE DO BOTAO NAO FUNCTIONA

    entrada.val("");
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

    if (validar()) {
        const tarefa = { desc: entrada.val(), cor: corSelecionada, concluida: false, arquivada: false }

        // armazenar tarefa no local storage

        criarTarefa(tarefa).appendTo($("#listaFazer"));
        // conteudoCartaoJaExiste(entrada,$("#listaFazer"));

        // OBS:
        // Exatamente por entrada já estar definida que não precisamos passar ela como parâmetro
        // Como ela foi declarada fora de uma função lá em cima, todas as funções enxergam ela
        // a mesma coisa acontece com "corSelecionada"
        // resetFormulario(entrada, corSelecionada); //como entrada já está definida
        resetFormulario();
    }
}
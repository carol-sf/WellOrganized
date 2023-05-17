
$("#alterarStatusDiv").on("click", adicionandoTarefas)
const adicaoTarefas = $("#adicaoTarefas");
const btnAddTarefa = $("#botao-add-tarefa");

function adicionandoTarefas() {
    btnAddTarefa.toggleClass("esconde");
    adicaoTarefas.toggleClass("hide");

}

// Criando as tarefas (usando o jQu1ery)
let listaFazer = $("#listaFazer");
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

//Temos que criar uma função para ver se o itemJáExiste
//listaFazer
// if(itemJaExiste(input.value.trim(), listaFazer)
function conteudoCartaoJaExiste(entrada, lista) {
    const itens = Array.from(lista.childNodes);
    return  itens.map((cartao) => {
        return cartao.childNodes[1].textContent;
    }).includes(entrada);
}

function validar() {
    if (entrada.value.trim() === "" || corSelecionada == "") {
        alert('Você deve fornecer uma descrição');
    // } else if (conteudoCartaoJaExiste(entrada, $("#listaFazer"))){
    //         alert("Item já existe");
    }else {
            return true;
        }
    }


//TENTEI USAR O RESET DO JQUERY, MAS ESTAVA DANDO TODA HORA ERRO
function resetFormulario(entrada, corSelecionada) {
    entrada.value = "";
    corSelecionada.value = ""; //O VALUE DO BOTAO NAO FUNCTIONA

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
        console.log(entrada);
        let tarefa = { desc: entrada.value, cor: corSelecionada, concluida: false, arquivada: false }

        // armazenar tarefa no local storage

        criarTarefa(tarefa).appendTo($("#listaFazer"));
        // conteudoCartaoJaExiste(entrada,$("#listaFazer"));

        // limpar formulário
        resetFormulario(entrada, corSelecionada); //como entrada já está definida
    }
}
$(document).ready(function () {
    carregarTarefas();
});
$("#alterarStatusDiv").click(adicionandoTarefas)
$(".btnCor").click(selecionarCor);
$("#btn-add").click(adicionarTarefa);
let corSelecionada = "";

function getTarefasLocalStorage() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

function setTarefasLocalStorage(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = getTarefasLocalStorage();
    tarefas.forEach(tarefa => {
        const cartaoTarefa = criarTarefa(tarefa);
        if (tarefa.arquivada) cartaoTarefa.appendTo($("#listaArquivadas"));
        else cartaoTarefa.appendTo($("#listaFazer"));
    });
}

function adicionandoTarefas() {
    $("#botao-add-tarefa").toggleClass("esconde");
    $("#adicaoTarefas").toggleClass("hide"); 
}

function selecionarCor(evt) {
    let btnCorAnterior = $(".cor-selecionada");
    $(evt.target).addClass("cor-selecionada");
    btnCorAnterior.removeClass("cor-selecionada");
    if ($(".cor-selecionada").length === 0) corSelecionada = "";
    else corSelecionada = evt.target.id;
}

function conteudoCartaoJaExiste(entrada) { 
    const itens = getTarefasLocalStorage();
    return itens.map((cartao) => cartao.desc).includes(entrada);
}

function validar(entrada) {
    entrada = entrada.val().trim();
    if (entrada === "") { 
        alert('Você deve fornecer uma descrição');
        return false;
    } else if(corSelecionada === "") {
        alert('Você deve fornecer uma cor');
        return false;
    } else if (conteudoCartaoJaExiste(entrada)) {
        alert("Item já existe");
        return false;
    } else {
        return true;
    }
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
    $("<div></div>").addClass("check").appendTo(divCabecalho).click(concluirTarefa);
    $(`<span>${textoCabecalho}</span>`).appendTo(divCabecalho);
    let divCorpo = $("<div></div>").addClass("cartao-corpo").appendTo(cartao);
    $(`<p>${tarefa.desc}</p>`).appendTo(divCorpo);
    $("<div></div>").addClass("cartao-rodape").appendTo(cartao).click(removerTarefa);

    return cartao;
}

function resetFormulario(entrada) {
    entrada.val("");
    entrada.focus();
    $(".cor-selecionada").removeClass("cor-selecionada");
}

function adicionarTarefa() {
    const entrada = $("#entrada");
    if (validar(entrada)) {
        const tarefa = { desc: entrada.val().trim(), cor: corSelecionada, concluida: false, arquivada: false };
        let tarefas = getTarefasLocalStorage();
        tarefas.push(tarefa);
        setTarefasLocalStorage(tarefas);
        criarTarefa(tarefa).appendTo($("#listaFazer"));
        resetFormulario(entrada);
    }
}

function concluirTarefa(evt) {
    const divCabecalho = $(evt.target).parent();
    const divCartao = divCabecalho.parent();

    if (!divCartao.attr("class").includes("arquivada")) {
        const statusConcluida = divCabecalho.children().eq(1);
        const descAtual = divCartao.children().eq(1).text();
        const tarefas = getTarefasLocalStorage();
        const indice = tarefas.findIndex((tarefa) =>
            tarefa.desc === descAtual
        );
        
        if (divCartao.attr("class").includes("concluida")) {
            statusConcluida.text("Não concluída");
            tarefas[indice].concluida = false;
        } else {
            statusConcluida.text("Concluída");
            tarefas[indice].concluida = true;
        }
        setTarefasLocalStorage(tarefas);
        divCartao.toggleClass("concluida");
    }
}

function arquivarTarefa(cartaoAtual, indiceCartaoAtual, tarefas) {
    tarefas[indiceCartaoAtual].arquivada = true;
    setTarefasLocalStorage(tarefas);
    cartaoAtual.addClass("arquivada"); 
}

function excluirTarefa(indiceCartaoAtual, tarefas) {
    tarefas.splice(indiceCartaoAtual, 1); 
    setTarefasLocalStorage(tarefas); 
}

function removerTarefa(evt) {
    const cartaoAtual = $(evt.target).parent();
    const descCartaoAtual = cartaoAtual.children().eq(1).text();
    const tarefas = getTarefasLocalStorage();
    const indice = tarefas.findIndex((elem) =>
        elem.desc === descCartaoAtual
    );
    
    if (cartaoAtual.attr("class").includes("concluida")) {
        if (cartaoAtual.attr("class").includes("arquivada")) excluirTarefa(indice, tarefas);
        else arquivarTarefa(cartaoAtual, indice, tarefas);
        cartaoAtual.remove();
    }
}
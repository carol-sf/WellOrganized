$(".btnCor").on("click", selecionarCor);
$("#btn-add").click(adicionarTarefa);
$("#alterarStatusDiv").on("click", adicionandoTarefas)
const adicaoTarefas = $("#adicaoTarefas");
const btnAddTarefa = $("#botao-add-tarefa");
const entrada = $("#entrada");
let corSelecionada = "";

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

//Aqui eu fiz algumas alterações para deixar a função mais clean. Mudei a forma como  eu convertia
//o lista.childNodes com o Array para o método $.makeArray() do jquery, pois este método converte o lista.children() em um array
// e também como eu havia falado da função do jquery children() eu acabei utt ela no lugar de childNodes como estava antes - AKarolynna
function conteudoCartaoJaExiste(entrada, lista) {
    const itens = $.makeArray(lista.children());
    return itens.map((cartao) => {
        return $(cartao).children().eq(1).text();
    }).includes(entrada);
}

// Como remodelei a função validar para corrigir os problemas que ela estava apresentando:
// O problema estava no argumento que estava sendo passado na função conteudoCartaoJaExiste()
// pois estavamos passando a entrada, porém não estavamos de fato pegando seu valor. Aí fazendo essa modificação funcionou - AKarolynna

function validar() {
    if (entrada.val().trim() === "" || corSelecionada === "") {
        alert('Você deve fornecer uma descrição');
        return false;
    } else if (conteudoCartaoJaExiste(entrada.val(), $("#listaFazer"))) {
        alert("Item já existe");
        return false;
    } else {
        return true;
    }
}

//Aqui eu consegui fazer com que os botões de cores selecionadas ficassem sem aquela sombra no final, e você vai
//  ver que quando reseta o formulario e você dá um console.log na cor ela vai aparecer como undefined então está funcionando rsrs - AKarolynna
function resetFormulario() {
    entrada.val("");
    $(".cor-selecionada").removeClass("cor-selecionada");
}

// INÍCIO - 1° alteração -------------------------------------------------------------------------------------------------

/*
    ALTERAÇÕES NECESSÁRIAS:
    - Eu preciso que só as tarefas "a fazer" apareçam na "listaFazer" (as com "arquivada = false")
    - As que estão aquivadas eu preciso que apareçam na "listaArquivadas" (as com "arquivada = true")

    OBSERVAÇÕES:
    - Essa função "obterTarefasDoLocalStorage()" na verdade não está salvando nada no local storage, ela está:
        - pegando cada um dos itens que já estão salvos lá, 
        - criando eles na forma de cartão (um item de lista),
        - e mando ele ser mostrado na listaFazer (que está vazia no index)
    - Então na verdade essa função é a de carregar as tarefas no DOM.

    SUGESTÕES:
    - alterar para um nome mais fiel a sua funcionalidade
    - usar o foreach pra um código mais conciso
    - usar o "getTarefasLocalStorage()" 
        - criei pra gente n ter que ficar usando os comandos de "localStorage.getItem()" e transformando ele p string toda hora
 */

// $(document).ready(function () {
//     obterTarefasDoLocalStorage();
// });

// // Aqui colocamos o for, pois sem ele só conseguiamos salvar apenas um cartão no localStorage
// // mas com o for conseguimos fazer com que salve mais de um cartão, assim, cada vez  que nós adicionarmos um novo
// // cartão ele já adiciona no localStorage este carrtão junto com os outros existentes
// function obterTarefasDoLocalStorage() {
//     const tarefasString = localStorage.getItem('tarefas');
//     if (tarefasString) {
//         const tarefas = JSON.parse(tarefasString);
//         for (const tarefa of tarefas) {
//             const cartaoTarefa = criarTarefa(tarefa);
//             cartaoTarefa.appendTo($("#listaFazer"));
//         }
//     }
// }

$(document).ready(carregarTarefas);

function carregarTarefas() {
    const tarefas = getTarefasLocalStorage();
    tarefas.forEach(tarefa => {
        if (tarefa.arquivada) criarTarefa(tarefa).appendTo($("#listaArquivadas"));
        else criarTarefa(tarefa).appendTo($("#listaFazer"));
    });
}

// FIM - 1° alteração ----------------------------------------------------------------------------------------------------


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
    $("<div></div>").addClass("check").appendTo(divCabecalho).click(concluirTarefa); // Tive que botar o listener do evento aqui, pois antes dessa função ele não existia
    $(`<span>${textoCabecalho}</span>`).appendTo(divCabecalho);
    let divCorpo = $("<div></div>").addClass("cartao-corpo").appendTo(cartao);
    $(`<p>${tarefa.desc}</p>`).appendTo(divCorpo);
    $("<div></div>").addClass("cartao-rodape").appendTo(cartao).click(arquivarTarefa); // Mesma coisa do caso de cima

    return cartao;
}

function adicionarTarefa() {
    if (validar()) {
        const tarefa = { desc: entrada.val(), cor: corSelecionada, concluida: false, arquivada: false };

        // Obter tarefas existentes do localStorage
        const tarefasString = localStorage.getItem('tarefas'); //obtém o valor armazenado no localStorage com a chave 'tarefa'. 
        let tarefas = [];

        if (tarefasString) {
            tarefas = JSON.parse(tarefasString);
        }

        // Adicionar a nova tarefa ao array
        tarefas.push(tarefa);

        // Salvar o array atualizado no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Criar e adicionar o cartão da nova tarefa na tela
        const cartaoTarefa = criarTarefa(tarefa);
        cartaoTarefa.appendTo($("#listaFazer"));

        resetFormulario();
    }
}




// MECHENDO NO LOCAL STORAGE ---------------------------------------------------------------------------------------------
// Eu vou precisar pegar e atualizar minha lista de tarefas várias vezes ao longo do código e não apenas no "adicionarTarefa()", então botei essas funcionalidades em funções, igual o Lenadro

// Obs: aqui ele já converte de string pra JSON, pois isso SEMPRE precisará ser feito
function getTarefasLocalStorage() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

// Obs: aqui ele já converte de JSON pra string, pois isso SEMPRE precisará ser feito
function setTarefasLocalStorage(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
// -----------------------------------------------------------------------------------------------------------------------


function concluirTarefa(evt) {
    // pegando o cartão clicado
    const divCabecalho = $(evt.target).parent();
    const divCartao = divCabecalho.parent();

    // se o cartao nao tiver a classe arquivada eu continuo (pois ele ainda está no index e pode ser concluido e "desconcluido")
    // se não eu nao faço nada (pois ele está na página de arquivadas e lá o botão de concluir não funciona)
    if(!divCartao.attr("class").includes("arquivada")) {
        const statusConcluida = divCabecalho.children().eq(1);    
        const descAtual = divCartao.children().eq(1).text();
        const tarefas = getTarefasLocalStorage();

        // achando no local storage o indice da tarefa que tem a mesma descrição do cartão que eu cliquei p poder mudar o campo "concluida"
        const indice = tarefas.findIndex((tarefa) =>
            tarefa.desc === descAtual
        );
        
        // mudando o texto do cabeçalho (o que tá do lado do Check) pra "concluida" ou "não concluida"
        // e mudando o campo "concluida" do local storage pra "true" ou "false", pra continuar com a alteração quando eu atualizo a página    
        if(divCartao.attr("class").includes("concluida")) {
            statusConcluida.text("Não concluída");
            tarefas[indice].concluida = false;
        } else {
            statusConcluida.text("Concluída");
            tarefas[indice].concluida = true;
        }
        setTarefasLocalStorage(tarefas);

        // botando a classe concluida no cartao (ou tirando, caso ela já esteja lá)
        // assim, quando eu apertar o check ele vai deixar o cabeçalho verdinho, deixar a descrição da tarefa riscada e habilitar o botão de arquivar lá em baixo (ou voltar como tava antes, sem essas alterações)
        divCartao.toggleClass("concluida");
    }
}

function arquivarTarefa(evt) {
    // pegando o cartão clicado
    const cartaoAtual = $(evt.target).parent();

    // descobrindo o indice da tarefa com a descrição correspondente no local storage
    const descCartaoAtual = cartaoAtual.children().eq(1).text();
    const tarefas = getTarefasLocalStorage();
    const indice = tarefas.findIndex((elem) =>
        elem.desc === descCartaoAtual
    );

    // se o cartão estiver concluido pode continuar, se não n faz nada
    if(cartaoAtual.attr("class").includes("concluida")) {
        tarefas[indice].arquivada = true;
        setTarefasLocalStorage(tarefas);
        cartaoAtual.addClass("arquivada");
        cartaoAtual.remove();
    }
}
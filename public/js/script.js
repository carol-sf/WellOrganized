$(".btnCor").on("click", selecionarCor);
$("#btn-add").click(adicionarTarefa);
$("#alterarStatusDiv").on("click", adicionandoTarefas)
const adicaoTarefas = $("#adicaoTarefas");
const btnAddTarefa = $("#botao-add-tarefa");
const entrada = $("#entrada");
let corSelecionada = "";

$(document).ready(function() {
    //O codigo abaixo me permite exibir minhas tarefas no localstorage assim que minha tela é inicializada! - AKarolynna
    obterTarefasDoLocalStorage();
    });

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

// Aqui colocamos o for, pois sem ele só conseguiamos salvar apenas um cartão no localStorage
// mas com o for conseguimos fazer com que salve mais de um cartão, assim, cada vez  que nós adicionarmos um novo
// cartão ele já adiciona no localStorage este carrtão junto com os outros existentes
function obterTarefasDoLocalStorage() {
    const tarefasString = localStorage.getItem('tarefas');
    if (tarefasString) {
      const tarefas = JSON.parse(tarefasString);
      for (const tarefa of tarefas) {
        const cartaoTarefa = criarTarefa(tarefa);
        cartaoTarefa.appendTo($("#listaFazer"));
      }
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
    $("<div></div>").addClass("check").appendTo(divCabecalho);
    $(`<span>${textoCabecalho}</span>`).appendTo(divCabecalho);
    let divCorpo = $("<div></div>").addClass("cartao-corpo").appendTo(cartao);
    $(`<p>${tarefa.desc}</p>`).appendTo(divCorpo);
    $("<div></div>").addClass("cartao-rodape").appendTo(cartao);

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

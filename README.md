# Well Organized - A fazer:

## Criar a interface
- [x] páginas: index e arquivadas
- [x] header           -> logo e menu
- [x] seção cabeçalho  -> botao adicionar ou formulário (index), título (arquivadas)
- [x] seção tarefas    -> cartões de tarefas

### Cartões
- [x] cores
- [x] concluida
- [x] arquivada

  
## Funções no JS
### Preparação para adição de tarefas
- [x] exibirFormulario          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -> evento: clicar no botão de mais
- [x] selecionarCor             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -> evento: clicar no botão da cor

### Adicionar item no DOM
- [ ] adicionarTarefa             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -> evento: clicar no botão adicionar do formulário
- [ ] validar                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -> chamado no "adicionarTarefa"
- [ ] tarefaJaExiste              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -> chamado no "validar"
- [x] criarTarefa                 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -> chamado no "adicionarTarefa"
- [ ] limparInpDescricao        &nbsp; &nbsp; -> chamado no "adicionarTarefa"

### Adicionar item no Local Storage
- [ ] getTarefasLocalStorage
- [ ] setTarefasLocalStorage
- [ ] modificar o "adicionarTarefa" para armazenar os itens no local storage também
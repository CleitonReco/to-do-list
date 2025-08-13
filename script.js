const localStoregeKey = "to-do-list-Cleiton";
let tarefas = [];

function validacaoDeigualdade(inputValue) {
  // Verificando se a tarefa ja existe
  return tarefas.some((task) => task === inputValue);
}

function salvarTarefas() {
  localStorage.setItem(localStoregeKey, JSON.stringify(tarefas));
}

// Quando pressionado o Enter adiconara a tarefa
document
  .getElementById("input-new-task")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // event.preventDefault();
      adicionarTarefa();
    }
  });

function adicionarTarefa() {
  //   Pegando o valor do  INPUT
  let valorDoInput = document.getElementById("input-new-task").value.trim();

  // Para que a primeira letra seja maiuscula
  function firstLetter(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  if (!valorDoInput) {
    alert("Digite algo para inserir em uma lista");
    return;
  } else if (validacaoDeigualdade(valorDoInput)) {
    alert("Você já criou essa tarefa");
    return;
  }
  valorDoInput = firstLetter(valorDoInput);

  //Adicionando o valor na array tarefas
  tarefas.push(valorDoInput);

  // Aqui a bodea cinza devera aparecer
  document.getElementById("to-do-list").style.display = "flex";

  // Criando li dentro do HTML
  let tagLi = document.createElement("li");

  // Colocando o Valor do input dentro da li
  tagLi.innerHTML = `
       ${valorDoInput}
       <div class="btn">
       <button id="btn-ok" onclick='concluirTarefa(this)'>
          <svg id="svg"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
          </svg>
        </button>
        <button id= "btn-trash" onclick= 'deletarTarefa(this)' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button>    
        </div>
        `;

  //   Pegando o que está dentro da li e colocando dentro da ul
  document.getElementById("to-do-list").appendChild(tagLi);

  //depois de escrito apagara para poder inserir um novo, e
  // mantera clicavel para adicionar um novo
  document.getElementById("input-new-task").value = "";
  input.focus();
}

// Aqui chamara a função para deletar
function deletarTarefa(botao) {
  //trasnforma a tag 'li'  na variavel li
  const li = botao.closest("li");

  const taskText = li.firstChild.textContent.trim();

  tarefas = tarefas.filter((task) => task !== taskText);

  li.remove();

  if (tarefas.length === 0) {
    document.getElementById("to-do-list").style.display = "none";
  }
}

//função criada para marcar e desmarcar quanod a tarefa estiver concluida
function concluirTarefa(botao) {
  //encontra a tag li do botão clicado
  const li = botao.closest("li");

  //encontra a tag li para riscar
  const taskTextElement = li.firstChild;

  li.classList.toggle("concluido");

  li.parentNode.appendChild(li);
}

const localStoregeKey = "to-do-list-Cleiton";
let tarefas = [];

function validacaoDeigualdade(inputValue) {
  // Verificando se a tarefa ja existe
  return tarefas.some((task) => task === inputValue);
}

// Quando pressionado o Enter adiconara a tarefa
document
  .getElementById("input-new-task")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
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

  // Criando li dentro do HTML
  let tagLi = document.createElement("li");

  // Colocando o Valor do input dentro da li
  tagLi.innerHTML = `
       ${valorDoInput}
        <button id="btn-ok" onclick='deletarTarefa(this)'>
        
        <svg id="svg"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg>


</button>`;

  //   Pegando o que está dentro da li e colocando de da ul
  document.getElementById("to-do-list").appendChild(tagLi);

  //depois de escrito apagara para poder inserir um novo
  document.getElementById("input-new-task").value = "";
}

function deletarTarefa(remove) {
  //removendo as tarefas do array
  const taskText = remove.parentElement.textContent
    .replace("Concluído", "")
    .trim();
  tarefas = tarefas.filter((task) => task !== taskText);
  remove.parentElement.remove();
}

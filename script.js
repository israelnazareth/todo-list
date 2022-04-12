import Swal from "/node_modules/sweetalert2/src/sweetalert2.js";

const button = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const taskListItem = document.getElementsByClassName('item');
const clearAllTasks = document.querySelector('#apaga-tudo');
const clearCompleted = document.querySelector('#remover-finalizados');
const saveTasks = document.querySelector('#salvar-tarefas');
const clearSelected = document.querySelector('#remover-selecionado');
const upButton = document.querySelector('#mover-cima');
const downButton = document.querySelector('#mover-baixo');
const inputValue = document.querySelector('input');
const input = document.querySelector('#texto-tarefa');

// Adiciona as tarefas pelo botão 'Adicionar'
function addTasks() {
  const listItem = document.createElement('li');
  const list = document.querySelector('#lista-tarefas');
  listItem.classList.add('item');
  if (!inputValue.value) {
    Swal.fire('Insira uma tarefa, por favor.');
  } else {
    listItem.innerText = inputValue.value;
    list.appendChild(listItem);
  }
  inputValue.value = '';
}

// Seleciona um único item (muda a cor de fundo para cinza)
function selectItem({ target }) {
  for (const value of taskList.children) {
    if (value.classList.contains('selected')) {
      value.classList.remove('selected');
    }
    target.classList.add('selected');
  }
}

// Marca como 'completa' a tarefa com duplo-clique
function dblClickSelector({ target }) {
  if (target.classList.contains('completed')) {
    target.classList.remove('completed');
  } else {
    target.classList.add('completed');
  }
}

// Remove todas as tarefas
clearAllTasks.addEventListener('click', () => { taskList.innerHTML = ''; });

// Remover tarefas completadas (riscadas)
clearCompleted.addEventListener('click', () => {
  const completeds = document.querySelectorAll('.completed');
  for (const tasks of completeds) {
    if (tasks.classList.contains('completed')) {
      tasks.remove();
    }
  }
});

// Salva as tarefas mesmo recarregando a página
saveTasks.addEventListener('click', () => {
  const tasks = taskList.innerHTML;
  localStorage.setItem('taskList', tasks);
  alert('Tarefas salvas com sucesso!');
});

window.onload = () => {
  const saved = localStorage.getItem('taskList');
  taskList.innerHTML = saved;
};

taskList.addEventListener('click', selectItem);
taskList.addEventListener('dblclick', dblClickSelector);
button.addEventListener('click', addTasks);

// Mover a tarefa para cima
upButton.addEventListener('click', () => {
  const itemSelected = document.querySelector('.selected');
  if (itemSelected === null) {
    alert('Nenhuma tarefa selecionada!');
  } else if (itemSelected === taskListItem[0]) {
    alert('A tarefa já está no topo!');
  } else {
    itemSelected.parentNode.insertBefore(itemSelected, itemSelected.previousElementSibling);
  }
});

// Mover a tarefa para baixo
downButton.addEventListener('click', () => {
  const itemSelected = document.querySelector('.selected');
  if (itemSelected === null) {
    alert('Nenhuma tarefa selecionada!');
  } else if (itemSelected !== taskList.children[taskList.children.length - 1]) {
    itemSelected.parentNode.insertBefore(itemSelected.nextElementSibling, itemSelected);
  } else {
    alert('Essa tarefa já está no fim da lista!');
  }
});

// Remove a tarefa selecionada (com o fundo cinza)
clearSelected.addEventListener('click', () => {
  for (const task of taskList.children) {
    if (task.classList.contains('selected')) {
      task.remove();
    }
  }
});

// Adicionando o Enter no input
input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    addTasks();
  }
});

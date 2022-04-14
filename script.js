const button = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const taskListItems = document.getElementsByClassName('item');
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
    let item = `<li class="item"><input type="checkbox"> - ${inputValue.value}</input></li>`;
    list.insertAdjacentHTML('beforeend', item);
  }
  inputValue.value = '';
}

// Seleciona um único item (muda a cor de fundo para cinza)
function selectItem({ target }) {
  for (const item of taskListItems) {
    if (item.classList.contains('selected')) {
      item.classList.remove('selected');
    }
    if(target.type === 'checkbox') {
      classList.remove('selected');
    }
    target.classList.add('selected');
  }
}

// Marca como 'completa' a tarefa selecionada
function taskCompleted() {
  for (const item of taskListItems) {
    if (item.children[0].checked) {
      item.classList.add('completed');
    } else {
      item.classList.remove('completed');
    }
  }
}

// Remove todas as tarefas
clearAllTasks.addEventListener('click', () => {
  !taskListItems.length 
  ? Swal.fire('Não há tarefas para serem removidas.')
  : taskList.innerHTML = '';
});

// Remover tarefas completadas (riscadas)
clearCompleted.addEventListener('click', () => {
  const completeds = document.querySelectorAll('.completed');
  if (!completeds.length) {
    Swal.fire('Não há tarefas finalizadas.');
  }
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
  Swal.fire(
    'Oba!',
    'Tarefas salvas com sucesso!',
    'success',
  );
});

window.onload = () => {
  const saved = localStorage.getItem('taskList');
  taskList.innerHTML = saved;
};

taskList.addEventListener('click', selectItem);
taskList.addEventListener('click', taskCompleted);
button.addEventListener('click', addTasks);

// Mover a tarefa para cima
upButton.addEventListener('click', () => {
  const itemSelected = document.querySelector('.selected');
  if (itemSelected === null) {
    Swal.fire('Nenhuma tarefa selecionada!');
  } else if (itemSelected === taskListItems[0]) {
    Swal.fire('A tarefa já está no topo!');
  } else {
    itemSelected.parentNode.insertBefore(itemSelected, itemSelected.previousElementSibling);
  }
});

// Mover a tarefa para baixo
downButton.addEventListener('click', () => {
  const itemSelected = document.querySelector('.selected');
  if (itemSelected === null) {
    Swal.fire('Nenhuma tarefa selecionada!');
  } else if (itemSelected !== taskList.children[taskList.children.length - 1]) {
    itemSelected.parentNode.insertBefore(itemSelected.nextElementSibling, itemSelected);
  } else {
    Swal.fire('A tarefa já está no fim da lista!');
  }
});

// Remove a tarefa selecionada (com o fundo cinza)
clearSelected.addEventListener('click', () => {
  const itemSelected = document.querySelector('.selected');
  if (itemSelected === null) {
    Swal.fire('Nenhuma tarefa selecionada!');
  }
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

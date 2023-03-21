const todoInput = document.querySelector('.user-input');
const todoButton = document.querySelector('.user-button');
const todoList = document.querySelector('.todo-list');

// event listener
document.addEventListener("DOMContentLoaded" , getTodos);
todoButton.addEventListener('click', addTodo);
function addTodo(e) {
    e.preventDefault();
    // Get the input value and trim any whitespace
    const inputValue = todoInput.value.trim();
  
    // Check if the input is empty
    if (inputValue === '') {
      alert('Please enter a todo to add ');
      return;
    }
  
    // Check if the new todo item matches any existing ones
    const todoItems = todoList.querySelectorAll('.todo-item');
for (let userText = 0; userText < todoItems.length; userText++) {
  const todoItem = todoItems[userText];
  if (todoItem.textContent.trim() === inputValue) {
    alert('Todo already exists');
    return;
  }
}
  
    // Create new todo item element
    const newTodo = document.createElement('li');
    newTodo.textContent = inputValue;
    newTodo.classList.add('todo-item');

  // add input to local storage
  saveLocalTodos(todoInput.value);

    // Create edit button element
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => {
      // Move the todo text to the input area for editing
      todoInput.value = newTodo.textContent.trim();
      // Remove the original todo item from the list
      todoList.removeChild(todoDiv);
    });


  
    // Create delete button element
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
      const confirmation = confirm('Are you sure you want to delete this todo?');
      if (confirmation) {
        todoList.removeChild(todoDiv);
        saveTodoList();
      }
    });
  
    // Create todo item container element
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(editButton);
    todoDiv.appendChild(deleteButton);
  
    // Add todo item container to the list
    todoList.appendChild(todoDiv);
  
    // Clear input value
    todoInput.value = '';
  }


  //  local storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos = [];
  if (localStorage.getItem('todos') !== null) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}
const todos = getTodos();
todos.forEach(function(todo){
  // Create new todo item element
  const newTodo = document.createElement('li');
  newTodo.textContent = todo;
  newTodo.classList.add('todo-item');

  // Create edit button element
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editButton.classList.add('edit-btn');
  editButton.addEventListener('click', () => {
    // Move the todo text to the input area for editing
    todoInput.value = newTodo.textContent.trim();
    // Remove the original todo item from the list
    todoList.removeChild(todoDiv);
  });



  // Create delete button element
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    const confirmation = confirm('Are you sure you want to delete this todo?');
    if (confirmation) {
      todoList.removeChild(todoDiv);
      removeLocalTodos(todoButton)
      saveTodoList();
    }
  });

  // Create todo item container element
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.appendChild(newTodo);
  todoDiv.appendChild(editButton);
  todoDiv.appendChild(deleteButton);

  // Add todo item container to the list
  todoList.appendChild(todoDiv);
});


function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  saveTodoList();

}

// updates the local storage by getting all the todo element from the DOM

function saveTodoList() {
  const todoItems = todoList.querySelectorAll('.todo-item');
  let todos = [];
  for (let i = 0; i < todoItems.length; i++) {
    todos.push(todoItems[i].textContent);
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}

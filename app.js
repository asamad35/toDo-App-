// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const todoSearch = document.querySelector(".todo-search");

// Event Listner
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck); // for delete and complete functionality
filterOption.addEventListener("click", filterTodo);
todoSearch.addEventListener("click", searchTodo);

//Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // fading div
  todoDiv.classList.add("todo-fade");

  // Todo LI
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Todo Span for animation inside newTodo
  const todoSpan = document.createElement("span");
  todoSpan.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  newTodo.appendChild(todoSpan);
  // Complete Button
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-button");
  completeButton.innerHTML = "<i class= 'fas fa-check'></i>";
  todoDiv.appendChild(completeButton);
  //edit Button
  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = '<i class="far fa-edit"></i>';
  todoDiv.appendChild(editButton);
  // trash Button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-button");
  trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}

//delete todo complete todo edit todo
function deleteCheck(e) {
  const item = e.target;
  const itemSpan = item.parentElement.childNodes[0].childNodes[0];
  const itemLi = item.parentElement.childNodes[0];

  //delete li
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    //remove local todo
    removeLocalTodos(todo);
    // TRANSITIONEND is a special type of eventListner which runs the code written in its function after the transition is completed.
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Complete mark
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    const todoText = todo.childNodes[0].childNodes[0];
    //animation for cutting the completed task
    todoText.classList.toggle("strike-animation");

    // TO REMOVE LINE FROM RIGHT TO LEFT
    // todoText.classList.toggle("reverse-strike-animation");
  }
  // Edit task
  if (item.classList[0] === "edit-button") {
    var itemText = itemSpan.innerText;
    itemSpan.remove();
    const itemLiInput = document.createElement("input");
    itemLiInput.classList.add("item-li-input");
    itemLi.appendChild(itemLiInput);
    itemLiInput.value = itemText;
    // getOldText for comparing local storage
    var oldtext = itemText;
    //Hide TextField After Enter Key is Pressed
    itemLiInput.onkeypress = function clickPress(event) {
      if (event.key == "Enter") {
        itemText = itemLiInput.value;
        // Edit local storage
        editLocalTodo(itemText, oldtext);
        //Hiding TextInput After Retrieving Value
        itemLiInput.remove();
        //Create New Span And Storing TextField Text in it.
        const newItemSpan = document.createElement("span");
        newItemSpan.innerText = itemText;
        itemLi.appendChild(newItemSpan);
      }
    };
  }
}
// Filter Todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;
    }
  });
}
// search any task
function searchTodo(e) {
  var filterText, todos, input, inputText;
  input = e.target;

  // return array of item divs
  todos = todoList.childNodes;

  input.onkeyup = function click() {
    //traversing item divs
    todos.forEach(function (todo) {
      // Text to be filtered
      filterText = todo.innerText.toUpperCase();
      // Input field text
      inputText = input.value.toUpperCase();
      // indexOf METHOD GIVES > -1 WHEN SEARCHED STRING IS FOUND IN SOURCE STRING
      // SYNTAX sourceString.indexOf(searchString,index)
      // index specify the position to start search
      //if index is not specified then default value 0 is taken
      if (filterText.indexOf(inputText) > -1) todo.style.display = "flex";
      else todo.style.display = "none";
    });
  };
}

// Local storage
function saveLocalTodos(todo) {
  let todos = checkLocalStorage();

  todos.push(todo);
  // JSON.stringify converts to string
  // syntax of setItem(string,string)
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalStorage() {
  // DO i already have some todos?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // localStorage.getItem("todos") returns string
    // JSON.parse remove the string nature
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function getTodos(todo) {
  // DO i already have some todos?
  let todos = checkLocalStorage();
  // Looping through array
  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // fading div
    todoDiv.classList.add("todo-fade");
    // Todo LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Todo Span for animation inside newTodo
    const todoSpan = document.createElement("span");
    todoSpan.innerText = todo;
    newTodo.appendChild(todoSpan);
    // Complete Button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = "<i class= 'fas fa-check'></i>";
    todoDiv.appendChild(completeButton);
    //edit Button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<i class="far fa-edit"></i>';
    todoDiv.appendChild(editButton);
    // trash Button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos = checkLocalStorage();
  // text to be removed from local storage
  let removeText = todo.innerText;
  // splice function to remove text
  let removeIndex = todos.indexOf(removeText);
  // syntax   array.splice(starting index , no of items to be removed)

  todos.splice(removeIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editLocalTodo(edittedText, oldText) {
  let todos = checkLocalStorage();
  //get index of old text in local storage
  let editIndex = todos.indexOf(oldText);
  // editting local storage array
  todos[editIndex] = edittedText;
  //updating local storage array
  localStorage.setItem("todos", JSON.stringify(todos));
}

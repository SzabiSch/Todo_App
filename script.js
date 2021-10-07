console.log("Hello To Do App");

function addNewTodo() {
  const newTodoEl = document.querySelector("#new-todo");
  const todoValue = newTodoEl.value.trim();

  if (todoValue.length === 0) {
    return;
  }

  if (isDuplicate(todoValue)) {
    alert("Try one more time, already exist!");
    return;
  }

  const newLi = document.createElement("li");
  newLi.innerText = todoValue;
  //console.log(todoValue);

  newLi.setAttribute("data-todo", todoValue.toLowerCase());

  const listEl = document.querySelector("#todo-list");
  listEl.appendChild(newLi);

  //put in a new checkbox

  const newBox = document.createElement("input");
  newBox.setAttribute("type", "checkbox");
  listEl.appendChild(newBox);

  newTodoEl.value = "";
}

const addTodoBtn = document.querySelector("#add-todo");
addTodoBtn.addEventListener("click", addNewTodo);

function isDuplicate(todo) {
  todo = todo.toLowerCase();
  const todoListEl = document.querySelector("#todo-list");

  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentLiEl = todoListEl.children[i];
    const currentTodo = currentLiEl.getAttribute("data-todo");
    if (currentTodo === todo) {
      return true;
    }
  }

  return false;
}

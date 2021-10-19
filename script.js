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
  newLi.appendChild(newBox);

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

//Da wird überstreicheln erledigt
const itemChecked = document.querySelector("#todo-list");

itemChecked.addEventListener("change", isChecked);

function isChecked(event) {
  const checkbox = event.target;
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add("done");
  } else {
    checkbox.parentElement.classList.remove("done");
  }
}

const url = "http://localhost:4730/todos";

renderList();

function renderList() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const todo = data[i];

        const todoText = todo.description;
        const liEl = document.createElement("li");
        liEl.setAttribute("data-id", todo.id);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = todo.id;

        const label = document.createElement("label");
        label.setAttribute("for", todo.id);
        label.innerText = todoText;

        const listHead = document.querySelector("#todo-list");
        liEl.append(checkbox, label);
        listHead.appendChild(liEl);
      }
    });
}
const listHead = document.querySelector("#todo-list");
function addNewTodo() {
  const todoField = document.getElementById("new-todo");
  const todoText = todoField.value;

  const todoItem = {
    description: todoText,
    done: false,
  };
  console.log(todoItem);
  //bis hier gut
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoItem),
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .then(function reloadList() {
      listHead.innerHTML = "";
      todoField.value = "";

      setTimeout(renderList, 1500);
    });
}

addTodoBtn.addEventListener("click", addNewTodo);

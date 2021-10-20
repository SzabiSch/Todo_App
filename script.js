console.log("Hello To Do App");

const addTodoBtn = document.querySelector("#add-todo");
addTodoBtn.addEventListener("click", addNewTodo);

function isDuplicate(newTodo) {
  newTodo = newTodo.toLowerCase();
  renderList();
  const todoListEl = document.querySelector("#todo-list");
  console.log("Länge: " + todoListEl.children.length);
  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentLiEl = todoListEl.children[i];
    const currentLiElText = currentLiEl
      .querySelector("label")
      .innerText.toLowerCase();

    console.log("jetzt: " + currentLiElText);
    if (currentLiElText === newTodo) {
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

  if (todoText.length === 0) {
    alert("Try one more time, field is empty!");
    return;
  }

  if (isDuplicate(todoText)) {
    alert("Try one more time, already exist!");
    return;
  }

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
      //let wait
      setTimeout(renderList, 3000);
    });
}

addTodoBtn.addEventListener("click", addNewTodo);

//DELETE
// const btnDelete = document.querySelector("#btn-delete");
// const listHead = document.querySelector("#todo-list");
// function deleteTodo() {
//   const todoField = document.getElementById("new-todo");
//   const todoText = todoField.value;

//   const todoItem = {
//     description: todoText,
//     done: false,
//   };

//   const requestOptions = {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(todoItem),
//   };
//   fetch(url, requestOptions)
//     .then((response) => response.json())
//     .then((data) => console.log("Success:", data))
//     .then(function reloadList() {
//       listHead.innerHTML = "";
//       todoField.value = "";
//     });
// }

// btnDelete.addEventListener("click", deleteTodo);

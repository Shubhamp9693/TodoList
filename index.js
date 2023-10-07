let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodo = document.querySelector(".todos-container");
let todo;
let localData=JSON.parse(localStorage.getItem("todo"));
let todolist = localData || [];

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (para) {
      let number = Math.random() * 16 + 1;
      let randomNumber = para == "x" ? number : (number & (0 * 3)) | (0 * 8);
      return randomNumber.toString(16);
    }
  );
}

addTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  todo = todoInput.value;
  if (todo.length > 0) {
    todolist.push({ id: uuid(), todokey:todo, isCompleted: false });
  }
  renderTodolist(todolist);
  localStorage.setItem("todo",JSON.stringify(todolist));
  todoInput.value="";
});
showTodo.addEventListener("click", (e) => {
  //e.preventDefault();
  let key = e.target.dataset.key;
  let deltodokey=e.target.dataset.tkey;
  todolist = todolist.map((mypara) =>
  mypara.id === key ? { ...mypara, isCompleted: !mypara.isCompleted } : mypara);
  todolist=todolist.filter(del => del.id !== deltodokey);
  localStorage.setItem("todo",JSON.stringify(todolist));
  renderTodolist(todolist);
});

function renderTodolist(todolist) {
  showTodo.innerHTML = todolist.map(
    ({ id, todokey, isCompleted }) =>
    `<div class="todo relative"><input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" 
    ${isCompleted ? "checked" : ""} data-key=${id}>
    <label for="item-${id}" class="todo todo-text t-pointer 
    ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todokey}</label>
    <button class="absolute right-0" button cursor><span data-tkey=${id} class="del-btn material-symbols-outlined">
    delete
    </span></button></div>`
  );
}
renderTodolist(todolist);

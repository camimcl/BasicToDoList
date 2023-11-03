const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

const saveTodo = (text,listId) => {
  //Tarefas lista
  const todo = document.createElement("li");

  if(listId=="todo-tarefas"){
    todo.classList.add("task-todo");
  }
  else{
    todo.classList.add("task-done")
  }
  const todoTitle = document.createElement("p");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  // console.log(todo)
  //butons
  const buttonRemove = document.createElement("button");
  buttonRemove.classList.add("remove");
  const imgRemove = document.createElement("img");
  imgRemove.src = "images/delete-sign.png";
  buttonRemove.appendChild(imgRemove);
  todo.appendChild(buttonRemove);
  buttonRemove.addEventListener("click", (event)=> markRemove(event,text));

  const buttonDone = document.createElement("button");
  buttonDone.classList.add("done");
  const imgDone = document.createElement("img");
  imgDone.src = "images/done-icon.png";
  buttonDone.appendChild(imgDone);
  buttonDone.addEventListener("click", (event) => markAsDone(event, text));
  todo.appendChild(buttonDone);

  const buttonRefresh = document.createElement("button");
  buttonRefresh.classList.add("restart");
  const imgRefresh = document.createElement("img");
  imgRefresh.src = "images/restart-icon.png";
  buttonRefresh.appendChild(imgRefresh);
  todo.appendChild(buttonRefresh);
  buttonRefresh.addEventListener("click", (event)=>markAsRestart(event,text));

  //tarefas
  const list = document.getElementById(listId);
  list.appendChild(todo);

  //buttons function
};
function markAsDone(event, taskTitle) {
  const li = event.currentTarget.parentNode; // li q ele clicou
  // console.log(event.currentTarget)
  const todoTarefas = document.getElementById("todo-tarefas");
  todoTarefas.removeChild(li);
  const tarefasConcluidas = document.getElementById("tarefas-concluidas");
  tarefasConcluidas.appendChild(li);
  li.classList.add("task-done"); //some o done
  li.classList.remove("task-todo"); //aparece o refresh
  //salvar info
  addTaskToLocalStorage("done-tasks", taskTitle);
  removeTask("todo-tasks",taskTitle)
}
function markAsRestart(event,taskTitle) {
  const li = event.currentTarget.parentNode; // li q ele clicou
  // console.log(event.currentTarget)
  const tarefasConcluidas = document.getElementById("tarefas-concluidas");
  tarefasConcluidas.removeChild(li);
  const todoTarefas = document.getElementById("todo-tarefas");
  todoTarefas.appendChild(li);
  li.classList.remove("task-done"); //some o done
  li.classList.add("task-todo"); //aparece o refresh
  addTaskToLocalStorage("todo-tasks", taskTitle);
  removeTask("done-tasks",taskTitle)
}
function markRemove(event, taskTitle) {
  const li = event.currentTarget.parentNode; //event.cur.. se refere ao botao
  const ul = li.parentNode;
  ul.removeChild(li);
  if(ul.getAttribute("id")==="todo-tarefas"){
    removeTask("todo-tasks",taskTitle);
  }
  else{
    removeTask("done-tasks",taskTitle);
  }
}

form.addEventListener("submit", function (e) {
  // alert(HTMLNovo.nodeValue)
  e.preventDefault();
  const input = document.getElementById("todo-input");
  const inputValue = input.value;
  if (inputValue) {
    addTaskToLocalStorage("todo-tasks", inputValue);
    saveTodo(inputValue,"todo-tarefas");
  }
  input.value = ""; //limpar input
  input.focus();
});
function addTaskToLocalStorage(key, inputValue) {
  let tasks = localStorage.getItem(key);
  if (tasks == null) {
    tasks = "#!"+inputValue;
  } else {
    tasks = tasks + "#!" + inputValue;
  }
  localStorage.setItem(key, tasks);
}
function removeTask(key,taskTitle){
    let tasks = localStorage.getItem(key);
    //console.log(tasks)
    localStorage.setItem(key,tasks.replace("#!"+taskTitle,""))
}
//local storage
let todotasks = localStorage.getItem("todo-tasks");
let tasksplit = todotasks.split("#!");

for (let i=0;i<tasksplit.length;i++){
    let taskTitle = tasksplit[i]

    if(taskTitle!=""){
        saveTodo(taskTitle,"todo-tarefas")
    }
}
let donetasks = localStorage.getItem("done-tasks");
let donetasksplit= donetasks.split("#!")
for (let i=0;i<donetasksplit.length;i++){
    let taskTitle = donetasksplit[i]

    if(taskTitle!=""){
        saveTodo(taskTitle,"tarefas-concluidas")
    }
}


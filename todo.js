const form = document.getElementById("todo-form");

const createHTMLTask = (taskTitle,listId) => {
    //Tarefas lista
    const liTask = document.createElement("li");

    if(listId=="todo-list"){
      liTask.classList.add("task-todo");
    }

    else{
      liTask.classList.add("task-done")
    }

    const taskTitleP = document.createElement("p");
    taskTitleP.innerText = taskTitle;

    liTask.appendChild(taskTitleP);

    //butons
    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("remove");

    const imgRemove = document.createElement("img");
    imgRemove.src = "images/delete-sign.png";

    buttonRemove.appendChild(imgRemove);

    liTask.appendChild(buttonRemove);

    buttonRemove.addEventListener("click", (event)=> markRemove(event,taskTitle));

    const buttonDone = document.createElement("button");
    buttonDone.classList.add("done");

    const imgDone = document.createElement("img");
    imgDone.src = "images/done-icon.png";

    buttonDone.appendChild(imgDone);
    buttonDone.addEventListener("click", (event) => markAsDone(event, taskTitle));

    liTask.appendChild(buttonDone);

    const buttonRefresh = document.createElement("button");
    buttonRefresh.classList.add("restart");

    const imgRefresh = document.createElement("img");
    imgRefresh.src = "images/restart-icon.png";

    buttonRefresh.appendChild(imgRefresh);
    buttonRefresh.addEventListener("click", (event)=>markAsRestart(event,taskTitle));

    liTask.appendChild(buttonRefresh);

    //tarefas
    const list = document.getElementById(listId);
    list.appendChild(liTask);

    
};
//buttons function
function markAsDone(event, taskTitle) {
    const li = event.currentTarget.parentNode; // li q ele clicou

    // console.log(event.currentTarget)
    const todoTarefas = document.getElementById("todo-list");
    todoTarefas.removeChild(li);

    const doneList = document.getElementById("done-list");
    doneList.appendChild(li);

    li.classList.add("task-done"); //some o done
    li.classList.remove("task-todo"); //aparece o refresh
    //salvar info
    addTaskToLocalStorage("done-list", taskTitle);
    removeTask("todo-list",taskTitle)
}
function markAsRestart(event,taskTitle) {
    const li = event.currentTarget.parentNode; // li q ele clicou

    // console.log(event.currentTarget)
    const doneList = document.getElementById("done-list");
    doneList.removeChild(li);

    const todoTarefas = document.getElementById("todo-list");
    todoTarefas.appendChild(li);

    li.classList.remove("task-done"); //some o done
    li.classList.add("task-todo"); //aparece o refresh

    addTaskToLocalStorage("todo-list", taskTitle);
    removeTask("done-list",taskTitle)
}
function markRemove(event, taskTitle) {
    const li = event.currentTarget.parentNode; //event.cur.. se refere ao botao

    const ul = li.parentNode;

    ul.removeChild(li);

    if(ul.getAttribute("id")==="todo-list"){
      removeTask("todo-list",taskTitle);
    }
    else{
      removeTask("done-list",taskTitle);
  }
}

//função para pegar o valor do input
form.addEventListener("submit", function (e) {
    e.preventDefault()//-> previne o fluxo padrao do elemento html p aql evento

    const input = document.getElementById("todo-input");

    const inputValue = input.value;

    if (inputValue) {
      //chama a funcao de add no localStorage (passando como parametro a listId (em que lista vai entrar) e o valor do input )
      addTaskToLocalStorage("todo-list", inputValue); 
      //mesma coisa so que para a funcao createHTMLTask 
      createHTMLTask(inputValue,"todo-list");
    }

    input.value = ""; //limpar input
    input.focus();//focar no input apos submit

});

//funcao para add o input ao localstorage
function addTaskToLocalStorage(listId, inputValue) {
    let tasks = localStorage.getItem(listId);
    //separador #!
    if (tasks == null){
      tasks = "#!"+inputValue;
    }
    else {
      tasks = tasks + "#!" + inputValue; //p add as tasks posteriores tambem, se nao seria sobrescrita
    }

    localStorage.setItem(listId, tasks); //setar string separada por #!
}

//remover task do localstorage 
function removeTask(listId,taskTitle){ 
    //tasks recebe o valor da string que tem em listid e listid sao as listas possiveis 
      let tasks = localStorage.getItem(listId); 
      
      //valor que esta em list id=nome, valor do item eh task.replace que substitui o nome da task por nada
      localStorage.setItem(listId,tasks.replace("#!"+taskTitle,""))
}
//local storage
let todotasks = localStorage.getItem("todo-list");

let tasksplit = todotasks.split("#!");

for (let i=0;i<tasksplit.length;i++){
    let taskTitle = tasksplit[i]

    if(taskTitle!=""){
        createHTMLTask(taskTitle,"todo-list")
    }
}

let donetasks = localStorage.getItem("done-list");

let donetasksplit= donetasks.split("#!")

for (let i=0;i<donetasksplit.length;i++){
    let taskTitle = donetasksplit[i]

    if(taskTitle!=""){
        createHTMLTask(taskTitle,"done-list")
    }
}


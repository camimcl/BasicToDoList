
const form = document.getElementById("todo-form");

// Função para criar uma tarefa no HTML
const createHTMLTask = (taskTitle, taskId, listId) => {
    const liTask = document.createElement("li");
    liTask.dataset.taskId = taskId; // Adiciona o ID da tarefa como atributo de dados

    if (listId == "todo-list") {
        liTask.classList.add("task-todo");
    } else {
        liTask.classList.add("task-done");
    }

    const taskTitleP = document.createElement("p");
    taskTitleP.innerText = taskTitle;
    liTask.appendChild(taskTitleP);

    // Botão de Remover
    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("remove");

    const imgRemove = document.createElement("img");
    imgRemove.src = "images/delete-sign.png";
    buttonRemove.appendChild(imgRemove);
    liTask.appendChild(buttonRemove);

    buttonRemove.addEventListener("click", (event) => markRemove(event, taskId));

    // Botão de Concluir
    const buttonDone = document.createElement("button");
    buttonDone.classList.add("done");

    const imgDone = document.createElement("img");
    imgDone.src = "images/done-icon.png";
    buttonDone.appendChild(imgDone);
    buttonDone.addEventListener("click", (event) => markAsDone(event, taskId));

    liTask.appendChild(buttonDone);

    // Botão de Reiniciar
    const buttonRefresh = document.createElement("button");
    buttonRefresh.classList.add("restart");

    const imgRefresh = document.createElement("img");
    imgRefresh.src = "images/restart-icon.png";
    buttonRefresh.appendChild(imgRefresh);
    buttonRefresh.addEventListener("click", (event) => markAsRestart(event, taskId));

    liTask.appendChild(buttonRefresh);

    // Adicionar tarefa à lista no HTML
    const list = document.getElementById(listId);
    list.appendChild(liTask);
};

// Função para marcar tarefa como concluída
function markAsDone(event, taskId) {
    const li = event.currentTarget.parentNode;

    // Mover a tarefa da lista de "a fazer" para "concluídas"
    const todoTarefas = document.getElementById("todo-list");
    todoTarefas.removeChild(li);

    const doneList = document.getElementById("done-list");
    doneList.appendChild(li);

    li.classList.add("task-done");
    li.classList.remove("task-todo");

    // Atualizar tarefa no backend
    fetch(`http://localhost:8081/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            completed: true,
        }),
    }).catch((error) => console.error('Erro ao marcar tarefa como concluída:', error));
}

// Função para reiniciar tarefa (desmarcar como concluída)
function markAsRestart(event, taskId) {
    const li = event.currentTarget.parentNode;

    // Mover a tarefa da lista de "concluídas" para "a fazer"
    const doneList = document.getElementById("done-list");
    doneList.removeChild(li);

    const todoTarefas = document.getElementById("todo-list");
    todoTarefas.appendChild(li);

    li.classList.remove("task-done");
    li.classList.add("task-todo");

    // Atualizar tarefa no backend
    fetch(`http://localhost:8081/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            completed: false,
        }),
    }).catch((error) => console.error('Erro ao reiniciar tarefa:', error));
}

// Função para remover tarefa
function markRemove(event, taskId) {
    const li = event.currentTarget.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);

    // Remover tarefa no backend
    fetch(`http://localhost:8081/api/tasks/${taskId}`, {
        method: 'DELETE',
    }).catch((error) => console.error('Erro ao remover tarefa:', error));
}

// Adicionar nova tarefa ao enviar o formulário
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.getElementById("todo-input");
    const inputValue = input.value;

    if (inputValue) {
        // Adicionar nova tarefa via API
        fetch('http://localhost:8081/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputValue,
                description: "",
                completed: false,
            }),
        })
            .then((response) => response.json())
            .then((newTask) => {
                createHTMLTask(newTask.title, newTask.id, "todo-list");
            })
            .catch((error) => console.error('Erro ao adicionar tarefa:', error));
    }

    input.value = "";
    input.focus();
});

// Carregar tarefas do backend ao carregar a página
window.onload = function () {
    fetch('http://localhost:8081/api/tasks')
        .then((response) => response.json())
        .then((tasks) => {
            tasks.forEach((task) => {
                if (task.completed) {
                    createHTMLTask(task.title, task.id, "done-list");
                } else {
                    createHTMLTask(task.title, task.id, "todo-list");
                }
            });
        })
        .catch((error) => console.error('Erro ao carregar as tarefas:', error));
};


import TodoList from "./todolist.js";

const theme = document.querySelector(".header__theme");
const newCard = document.querySelector(".dashboard__new-card");
const tasks = document.querySelector(".dashboard__tasks");

const amountLeft = document.querySelector(".tasks-info__amount-left");
const clearFinished = document.querySelector(".tasks-info__clear-finished");

const filterAll = document.querySelector(".tasks-filter__all");
const filterActive = document.querySelector(".tasks-filter__active");
const filterCompleted = document.querySelector(".tasks-filter__completed");

const todoList = new TodoList();

newCard.value = "";

newCard.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        addTask();
        newCard.value = "";
    }
});

clearFinished.addEventListener("click", () => {
    todoList.clearFinished();
    displayTasks();
});


function addTask() {
    const text = newCard.value.trim();
    if (text) {
        // Create a new task
        const task = {
            "text": text,
            "finished": false
        };

        // Add the new task to the list
        todoList.addTask(task);

        // Show the list of tasks
        displayTasks();
    }
}

function displayTasks() {
    tasks.innerHTML = "";
    for (const task of todoList.tasks) {
        tasks.appendChild(createHtmlTask(task));
    }
    amountLeft.innerHTML = `${todoList.tasks.length} ${todoList.tasks.length === 1 ? "task" : "tasks"} left`;
}

function createHtmlTask(task) {

    const div = document.createElement("div");

    // finishedToggle
    const finishedToggle = document.createElement("i");
    updateFinishedToggle(finishedToggle, task);
    finishedToggle.addEventListener("click", () => {
        todoList.switchFinished(task);
        updateFinishedToggle(finishedToggle, task);
    });

    // taskText
    const taskText = document.createElement("div");
    taskText.className = `tasks__task tasks__task--${task["finished"] ? "finished" : "unfinished"}"`;
    taskText.innerText = task["text"];

    // deleteButton
    const deleteButton = document.createElement("i");
    deleteButton.className = "fi fi-br-cross-circle";
    deleteButton.addEventListener("click", () => {
        todoList.removeTask(task);
        displayTasks();
    });

    // div
    div.appendChild(finishedToggle);
    div.appendChild(taskText);
    div.appendChild(deleteButton);

    //listItem
    const listItem = document.createElement("li");
    listItem.appendChild(div);
    return listItem;
}

function updateFinishedToggle(finishedToggle, task) {
    finishedToggle.className = `fi fi-br-${task["finished"] ? "check" : "circle"}`;
}

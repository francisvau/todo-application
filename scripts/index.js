
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
        tasks.innerHTML += createHtmlTask(task);
    }
}

function createHtmlTask(task) {
    return `<li><div class="tasks__task tasks__task--${task["finished"] ? "finished" : "unfinished"}">
    ${task["text"]}</div></li>`;
}

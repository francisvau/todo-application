
import TodoList from "./todolist.js";

const theme = document.querySelector(".header__theme");
const newCard = document.querySelector(".dashboard__new-card");
const tasks = document.querySelector(".dashboard__tasks");

const amountLeft = document.querySelector(".tasks-info__amount-left");
const clearFinished = document.querySelector(".tasks-info__clear-finished");

const filterAll = document.querySelector("#filter-all");
const filterActive = document.querySelector("#filter-active");
const filterCompleted = document.querySelector("#filter-completed");

const filters = {
    // eslint-disable-next-line no-unused-vars
    "ALL": (task) => true,
    "ACTIVE": (task) => !task["finished"],
    "COMPLETED": (task) => task["finished"]
};
let filter = filters["ALL"];

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

filterAll.addEventListener("click", () => {
    filter = filters["ALL"];
    resetFilterClassNames();
    filterAll.className = "tasks-filter__filter tasks-filter__filter--selected";
    displayTasks();
});

filterActive.addEventListener("click", () => {
    filter = filters["ACTIVE"];
    resetFilterClassNames();
    filterActive.className = "tasks-filter__filter tasks-filter__filter--selected";
    displayTasks();
});

filterCompleted.addEventListener("click", () => {
    filter = filters["COMPLETED"];
    resetFilterClassNames();
    filterCompleted.className = "tasks-filter__filter tasks-filter__filter--selected";
    displayTasks();
});

function resetFilterClassNames() {
    filterAll.className = "tasks-filter__filter";
    filterActive.className = "tasks-filter__filter";
    filterCompleted.className = "tasks-filter__filter";
}

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

        // Reset the filter to all
        filter = filters["ALL"];

        // Show the list of tasks
        displayTasks();
    }
}

function displayTasks() {
    tasks.innerHTML = "";
    for (const task of todoList.tasks) {
        if (filter(task)) {
            tasks.appendChild(createHtmlTask(task));
        }
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
    const taskText = document.createElement("p");
    taskText.className = "task__text";
    taskText.innerText = task["text"];

    // deleteButton
    const deleteButton = document.createElement("i");
    deleteButton.className = "task__delete-icon fi fi-br-cross-circle";
    deleteButton.addEventListener("click", () => {
        todoList.removeTask(task);
        displayTasks();
    });

    // div
    div.className = `tasks__task tasks__task--${task["finished"] ? "finished" : "unfinished"}`;
    div.appendChild(finishedToggle);
    div.appendChild(taskText);
    div.appendChild(deleteButton);

    //listItem
    const listItem = document.createElement("li");
    listItem.appendChild(div);
    return listItem;
}

function updateFinishedToggle(finishedToggle, task) {
    finishedToggle.className = `task__finished-icon fi fi-br-${task["finished"] ? "check" : "circle"}`;
    if (finishedToggle.parentElement) {
        finishedToggle.parentElement.className = `tasks__task tasks__task--${task["finished"] ? "finished" : "unfinished"}`;
    }
}

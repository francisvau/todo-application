
export default class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks.remove(task);
    }

    switchFinished(task) {
        task["finished"] = !task["finished"];
    }
}

export default class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(item => item !== task);
    }

    switchFinished(task) {
        task["finished"] = !task["finished"];
    }

    clearFinished() {
        this.tasks = this.tasks.filter(task => !task["finished"]);
    }
}
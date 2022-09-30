class StorageLocal {
  getTaskGroups() {
    if (!localStorage.hasOwnProperty("todoList")) {
      localStorage.todoList = this.demoData();
    }
    return JSON.parse(localStorage.todoList);
  }

  setTaskGroups(taskGroups) {
    localStorage.todoList = JSON.stringify(taskGroups);
  }

  loadTaskGroups() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.getTaskGroups());
      }, 1000);
    });
  }

  createTask(task, id_taskGroup) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        task.id = "t" + Math.round(Math.random() * 10e10);
        let taskGroups = this.getTaskGroups();
        let index = taskGroups.findIndex(
          (taskgroup) => taskgroup.id === id_taskGroup
        );
        taskGroups[index].tasks.push(task);
        this.setTaskGroups(taskGroups);
        resolve(task.id);
      }, 300);
    });
  }

  createTaskGroup(title) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let id = "g" + Math.round(Math.random() * 10e10);
        let taskGroups = this.getTaskGroups();
        taskGroups.push({
          id: id,
          title: title,
          tasks: [],
        });
        this.setTaskGroups(taskGroups);
        resolve(id);
      }, 300);
    });
  }

  deleteTaskGroup(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let taskGroups = this.getTaskGroups();
        let index = taskGroups.findIndex((taskGroup) => taskGroup.id === id);
        taskGroups.splice(index, 1);
        this.setTaskGroups(taskGroups);
        resolve();
      }, 300);
    });
  }

  deleteTask(id_task, id_taskGroup) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let taskGroups = this.getTaskGroups();
        let indexTaskGroup = taskGroups.findIndex(
          (taskGroup) => taskGroup.id === id_taskGroup
        );
        let indexTask = taskGroups[indexTaskGroup].tasks.findIndex(
          (task) => task.id === id_task
        );
        taskGroups[indexTaskGroup].tasks.splice(indexTask, 1);
        this.setTaskGroups(taskGroups);
        resolve();
      }, 300);
    });
  }

  demoData() {
    return DEMO_DATA;
  }
}

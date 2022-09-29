class Storage {

  getTaskGroups(){
    return JSON.parse(localStorage.todoList);
  }

  setTaskGroups(taskGroups){
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
        let index = taskGroups.findIndex(
          (taskGroup) => taskGroup.id === id
        );
        taskGroups.splice(index, 1);
        this.setTaskGroups(taskGroups);
        resolve();
      }, 300);
    });
  }
}

Storage = new Storage();

/*const RESET_STORAGE = [
  {
    id: "g1",
    title: "Formation",
    tasks: [
      {
        title: "cours vueMastery",
        done: true,
        deadline: "2022-10-01",
        color: COLORS[0],
        id: "t1",
      },
      {
        title: "cours vueJS",
        done: false,
        deadline: "2022-10-01",
        color: COLORS[1],
        id: "t2",
      },
      {
        title: "certif Vue",
        done: false,
        deadline: "2022-10-01",
        color: COLORS[2],
        id: "t3",
      },
    ],
  },
  {
    id: "g2",
    title: "Admin",
    tasks: [
      {
        title: "CRA",
        done: false,
        deadline: "2022-10-23",
        color: COLORS[1],
        id: "t4",
      },
      {
        title: "Mettre à jour CV",
        done: false,
        deadline: "2022-09-30",
        color: COLORS[3],
        id: "t5",
      },
    ],
  },
];*/

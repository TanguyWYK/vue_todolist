app.component("task-group", {
  props: {
    taskGroup: {
      type: Object,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="taskGroup">
        <h2>{{ taskGroup.title }}</h2>
        <ul>
            <li v-for="task in taskGroup.tasks" :key="task.id" >
                <task :task="task" @delete-task="deleteTask"></task>
            </li>
            <li>
                <empty-task @create-task="createTask"></empty-task>
            </li>
        </ul>
        <div class="deleteButton" @click="deleteTaskGroup">X</div>
    </div>`,
  methods: {
    createTask(task) {
      Storage.createTask(task,this.taskGroup.id).then((id) => {
        task.id = id;
        this.taskGroup.tasks.push(task);
      });
    },
    deleteTask(id) {
      let index = this.taskGroup.tasks.findIndex((task) => task.id === id);
      this.taskGroup.tasks.splice(index, 1);
    },
    deleteTaskGroup() {
      this.$emit("delete-task-group", this.taskGroup.id);
    },
  },
});

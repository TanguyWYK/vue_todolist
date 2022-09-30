app.component("task-group", {
  props: {
    taskGroup: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    for (let taskIndex in this.taskGroup.tasks) {
      this.showTask(this.taskGroup.tasks[taskIndex]);
    }
  },
  template:
    /*html*/
    `<div class="taskGroup">
        <h2>{{ taskGroup.title }}</h2>
        <ul>
            <li v-for="task in taskGroup.tasks" :key="task.id" >
                <transition appear name="showTask">
                  <task v-if="task.show" :task="task" @delete-task="deleteTask"></task>
                </transition>
            </li>
            <li>
                <empty-task @create-task="createTask"></empty-task>
            </li>
        </ul>
        <div class="deleteButton" @click="deleteTaskGroup">X</div>
    </div>`,
  methods: {
    createTask(task) {
      Storage.createTask(task, this.taskGroup.id).then((id) => {
        task.id = id;
        this.taskGroup.tasks.push(task);
        this.showTask(task);
      });
    },
    deleteTask(id) {
      let index = this.taskGroup.tasks.findIndex((task) => task.id === id);
      Storage.deleteTask(id, this.taskGroup.id).then(() => {
        this.taskGroup.tasks[index].show = false;
        setTimeout(() => {
          this.taskGroup.tasks.splice(index, 1);
        }, 500);
      });
    },
    deleteTaskGroup() {
      this.$emit("delete-task-group", this.taskGroup.id);
    },
    showTask(task) {
      task.show = true;
    },
  },
});

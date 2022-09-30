const COLORS = ["#edfced", "#f5f4b0", "#fce3b8", "#fcd2cf"];
const Storage = new StorageLocal();

const app = Vue.createApp({
  data() {
    return {
      taskGroups: [],
    };
  },
  mounted() {
    Storage.loadTaskGroups().then((taskGroups) => {
      this.taskGroups = taskGroups;
      for (let taskGroup of this.taskGroups) {
        taskGroup.show = true;
      }
    });
  },
  template:
    /*html*/
    `<ul>
        <li v-for="taskGroup in taskGroups" :key="taskGroup.id">
            <transition appear name="deleteTaskGroup">
              <task-group v-if="taskGroup.show" :task-group="taskGroup" @delete-task-group="deleteTaskGroup"></task-group>
            </transition>
        </li>
        <li>
            <empty-task-group @create-task-group="createTaskGroup"></empty-task-group>
        </li>
    </ul>`,
  methods: {
    deleteTaskGroup(id) {
      let index = this.taskGroups.findIndex((taskGroup) => taskGroup.id === id);
      let numberOfTask = this.taskGroups[index].tasks.length;
      if (
        numberOfTask === 0 ||
        confirm(
          "Attention : les " +
            numberOfTask +
            " tâches de ce groupe vont être supprimées"
        )
      ) {
        Storage.deleteTaskGroup(id).then(() => {
          this.taskGroups[index].show = false;
          setTimeout(() => {
            this.taskGroups.splice(index, 1);
          }, 500);
        });
      }
    },
    createTaskGroup(title) {
      Storage.createTaskGroup(title).then((id) => {
        this.taskGroups.push({
          id: id,
          title: title,
          tasks: [],
          show: true,
        });
      });
    },
  },
});

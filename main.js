const COLORS = ["#edfced", "#f5f4b0", "#fce3b8", "#fcd2cf"];

const app = Vue.createApp({
  data() {
    return {
      taskGroups: [],
    };
  },
  mounted(){
    Storage.loadTaskGroups().then(taskGroups=>{
        this.taskGroups = taskGroups;
    });
  },
  template:
    /*html*/
    `<ul>
        <li v-for="taskGroup in taskGroups" :key="taskGroup.id">
            <task-group :task-group="taskGroup" @delete-task-group="deleteTaskGroup"></task-group>
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
        Storage.deleteTaskGroup(id).then(()=>{
            this.taskGroups.splice(index, 1);
        });
        
      }
    },
    createTaskGroup(title) {
      Storage.createTaskGroup(title).then((id) => {
        this.taskGroups.push({
          id: id,
          title: title,
          tasks: [],
        });
      });
    },
  },
});

app.component('empty-task-group', {
  data() {
    return {
      title: '',
    };
  },
  template:
    /*html*/
    `<form @submit.prevent="onSubmit" class="taskGroup emptyTaskGroup">
        <input type="text" v-model="title" required placeholder="Nouveau groupe de tâches">
        <button>Ajouter</button>
    </form>`,
  methods: {
    onSubmit() {
      this.$emit('create-task-group',this.title);
      this.title = '';
    },
  },
});

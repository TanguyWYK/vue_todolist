app.component('empty-task',{
    data(){
        return {
          task:{
            title: '',
            id: '',
            deadline: new Date().toISOString().slice(0, 10),
            color: COLORS[0],
          }
        };
    },
    template:
    /*html*/
    `<div class="task">    
        <form @submit.prevent="onSubmit">
            <input type="text" v-model.lazy="task.title" required placeholder="nouvelle tâche">
            <input type="date" class="deadline" v-model.lazy="task.deadline" required>
            <select v-model.number="task.color" required :style="{backgroundColor: task.color}">
            <option value="${COLORS[0]}" :style="{backgroundColor: '${COLORS[0]}'}"></option>
            <option value="${COLORS[1]}" :style="{backgroundColor: '${COLORS[1]}'}"></option>
            <option value="${COLORS[2]}" :style="{backgroundColor: '${COLORS[2]}'}"></option>
            <option value="${COLORS[3]}" :style="{backgroundColor: '${COLORS[3]}'}"></option>
            </select>
            <button>Ajouter</button>
        </form>
    </div>`,
    methods:{
        onSubmit(){
            this.$emit('create-task',this.task);
            this.clearTaskInput();
        },
        clearTaskInput(){
            this.task = {
                title: '',
                id: '',
                deadline: new Date().toISOString().slice(0, 10),
                color: COLORS[0],
              };
        },
    }
});
app.component('task',{
    props:{
        task:{
            type: Object,
            required: true,
        }
    },
    template:
    /*html*/
    `<div class="task" :style="{backgroundColor: task.color}">    
        <input type="checkbox" v-model="task.done">
        <div>
            <h3 :class="{ lineTrough: task.done }" @click="editTitle">{{ task.title }}</h3>
            <p :class="{ lineTrough: task.done }" class="deadline">{{ task.deadline}}</p>
        </div>
        <select v-model.number="task.color" required class="colorTask" :style="{backgroundColor: task.color}">
            <option value="${COLORS[0]}" :style="{backgroundColor: '${COLORS[0]}'}"></option>
            <option value="${COLORS[1]}" :style="{backgroundColor: '${COLORS[1]}'}"></option>
            <option value="${COLORS[2]}" :style="{backgroundColor: '${COLORS[2]}'}"></option>
            <option value="${COLORS[3]}" :style="{backgroundColor: '${COLORS[3]}'}"></option>
        </select>
        <div class="deleteButton" @click="deleteTask">X</div>
    </div>`,
    methods: {
        editTitle(){
            
        },
        deleteTask(){
            this.$emit('delete-task',this.task.id);
        }
    }
});
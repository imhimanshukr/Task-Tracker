<template>
  <div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:p-0 p-1" v-if="taskList.tasks.length > 0">
    <TaskItem
      v-for="task in taskList.tasks"
      :key="task.id"
      :task="task"
      @editTask="editTask"
      @deleteTask="deleteTask"
    />
  </div>
    <div class="flex justify-center flex-col items-center" v-else>
    <img src="../assets/no-task.webp" alt="no-task-img">
    <p class="text-lg font-semibold">Task not avaialble, Please add task!</p>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import TaskItem from './TaskItem.vue';

const taskList = defineProps(['tasks']);
console.log("taskList: ", taskList);
const emit = defineEmits(['editTask', 'deleteTask']);

const editTask = (id) => {
    emit('editTask', id)
    console.log("EDIT ID: ", id);
}
const deleteTask = (id) => {
    console.log("delete ID: ", id);
    emit('deleteTask', id)
}
</script>

<style scoped>

</style>

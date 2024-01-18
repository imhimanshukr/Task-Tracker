<template>
  <div class="max-w-md mx-auto mt-4 p-4 bg-white shadow-md rounded-md task-card">
    <h2 class="text-xl capitalize font-semibold mb-2">{{ taskData.task.title }}</h2>
    <p class="mb-4">{{ taskData.task.description }}</p>
    <div class="flex justify-end">
      <button @click="editTaskItem(taskData.task.id)" class="text-indigo-500 hover:text-indigo-700 mr-2">
        Edit
      </button>
      <button @click="deleteTaskItem(taskData.task.id)" class="text-red-500 hover:text-red-700">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const taskData = defineProps(['task']);
console.log("taskDatataskData: ", taskData);
const emit = defineEmits(['editTask', 'deleteTask']);
const editTaskItem = (id) => {
    emit('editTask', id)
}
const deleteTaskItem = (id) => {
    emit('deleteTask', id)
}
</script>

<style scoped>
    .task-card{
        width: 300px;
        border: 2px solid #ebebeb;
    }

  .dark .task-card {
      border: 1px solid #888;
    background-color: #2d3748;
    color: #cbd5e0;
  }

    @media screen and (max-width: 640px) {
.task-card {
    width: 100%;
}
}
</style>

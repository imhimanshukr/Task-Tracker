<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md add-task dark:bg-secondaryDark">
    <h1 class="text-3xl font-semibold mb-6">Add a Task</h1>

    <div>
        <label class="text-sm font-medium text-gray-700 dark:text-white">Title</label>
        <input type="text" placeholder="Enter Title" class="mt-2 p-2 block w-full border border-gray-300 rounded-md text-black" v-model="taskDetail.title">
        <p class="text-red-500" v-if="isBtnTriggered && !taskDetail.title">Title is required</p>
    </div>
    <div>
      <label class="text-sm font-medium text-gray-700 dark:text-white">Description:</label>
      <textarea
        v-model="taskDetail.description"
        rows="4"
        class="mt-2 p-2 block w-full border border-gray-300 rounded-md text-black"
        placeholder="Enter description"
      ></textarea>
        <p class="text-red-500" v-if="isBtnTriggered && !taskDetail.description">Description is required</p>
    </div>

    <button
      @click="addNewTask"
      class="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 transition"
    >
      Add Task
    </button>
    
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue';

const emit = defineEmits(['addTask']);

let taskDetail = reactive({
    id: null,
    title: "",
    description: ""
})
const isBtnTriggered = ref(false)

const addNewTask = () => {
    isBtnTriggered.value = true;
    if(!taskDetail.title || !taskDetail.description){
        return
    }
    taskDetail.id = new Date().getTime();
        console.log(taskDetail);
    emit('addTask', taskDetail);
    taskDetail = {
            id: null,
    title: "",
    description: ""
    }
    isBtnTriggered.value = false;
}

</script>

<style scoped>
</style>

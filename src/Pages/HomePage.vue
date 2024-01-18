<template>
  <div>
    <!-- Navbar -->
  <nav class="bg-primaryLight dark:bg-primaryDark p-4 flex justify-between items-center">
      <h1 class="head text-secondaryLight">TaskTracker</h1>
    <div class="flex items-center">
      <button @click="isAddTaskModalOpen = true;" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-5 rounded">
        Add Task
      </button>
      <span class="material-symbols-outlined theme-icon" @click="changeTheme">{{isDarkMode ? 'light_mode': 'dark_mode'}}</span>
    </div>
    </nav>

    <!-- AddTask -->
    <div v-if="isAddTaskModalOpen" class="modal">
      <div class="modal-content dark:bg-secondaryDark">
        <span class="close" @click="isAddTaskModalOpen = false;">&times;</span>
        <AddTask @addTask="addNewTask" />
      </div>
    </div>

    <!-- Task List -->
    <TaskList :tasks="taskList.tasks" @editTask="editTask" @deleteTask="deleteTask" />

    <!-- Edit Task -->
    <div v-if="isEditTaskModalOpen" class="modal">
      <div class="modal-content dark:bg-secondaryDark">
        <span class="close" @click="isEditTaskModalOpen = false">&times;</span>
    <EditTask v-if="editingTaskId !== null" :tasks="taskList.tasks" :id="editingTaskId" @editTask="saveEditedTask" />
      </div>
    </div>

    <!-- Delete Confirmation Popup -->
    <div v-if="isDeleteConfirmationModalOpen" class="modal">
      <div class="modal-content dark:bg-secondaryDark">
        <p class="text-lg font-semibold">Are you sure you want to delete this task?</p>
      <div class="flex justify-center mt-4">
          <button @click="confirmDeleteTask" class="bg-red-500 text-white px-4 py-2 mr-2 rounded">Yes</button>
          <button @click="cancelDeleteTask" class="bg-blue-500 text-white px-4 py-2 ml-2 rounded">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import AddTask from '../components/AddTask.vue';
import TaskList from '../components/TaskList.vue';
import EditTask from '../components/EditTask.vue';

const taskList = reactive({
  tasks: [],
});

const editingTaskId = ref(null);
let isAddTaskModalOpen = ref(false);
const isEditTaskModalOpen = ref(false);
const isDeleteConfirmationModalOpen = ref(false);
let isDarkMode = ref(false);

let deletingTaskId = null;

// Add
const addNewTask = (detail) => {
  taskList.tasks.push(detail);
  isAddTaskModalOpen.value = false;
};

// Edit
    const editTask = (id) => {
      editingTaskId.value = id;
      isEditTaskModalOpen.value = true;
    };
    
    const saveEditedTask = (editedTask) => {
      const index = taskList.tasks.findIndex((task) => task.id === editedTask.id);
      if (index !== -1) {
        taskList.tasks.splice(index, 1, editedTask);
        editingTaskId.value = null;
      }
      console.log("taskList: ", taskList);
      isEditTaskModalOpen.value = false;
    };

// Delete
const confirmDeleteTask = () => {
    taskList.tasks = taskList.tasks.filter((task) => task.id !== deletingTaskId);
  isDeleteConfirmationModalOpen.value = false;
};

const cancelDeleteTask = () => {
    deletingTaskId = null;
  isDeleteConfirmationModalOpen.value = false;
};
const deleteTask = (id) => {
    deletingTaskId = id;
    isDeleteConfirmationModalOpen.value = true;
};

const changeTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark', isDarkMode.value);
}


</script>

<style scoped>
.head{
    font-family: cursive;
    color: white;
    font-size: 30px;
    font-weight: 900;
}

.modal {
position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
    width: 500px;
    border-radius: 10px;
    }

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.theme-icon {
        border: 2px solid white;
    padding: 6px 10px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
}

   .dark .theme-icon {
    border: 2px solid white;
    color: white;
  }

@media screen and (max-width: 375px) {
.modal-content {
    width: 350px;
}
.head {
    font-size: 20px;
}
}
</style>

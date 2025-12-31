<script setup>
import { ref } from 'vue';
import AddButton from './AddButton.vue';
import InputBox from './InputBox.vue';

const inputBoxRef = ref(null);

const handleAddTask = () => {
  if (inputBoxRef.value) {
    inputBoxRef.value.addTask();
  }
};

const handleTaskAdded = () => {
  // Emit event to parent or refresh tasks
  window.dispatchEvent(new CustomEvent('task-added'));
};
</script>

<template>
    <div class="container">
        <div class="input-row">
          <InputBox ref="inputBoxRef" @task-added="handleTaskAdded" />
          <AddButton @add-task="handleAddTask" />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 90%;
    max-width: 1200px;
    margin: 2em auto;
    padding: 1.5em;
    box-shadow: 0 4px 6px var(--shadow), 0 2px 4px var(--shadow);
    border-radius: 8px;
    background-color: var(--container-bg);
    transition: background-color 0.3s, box-shadow 0.3s;
}

.input-row {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

@media (max-width: 768px) {
    .container {
        width: 92%;
        padding: 1.2em;
        gap: 0.8em;
        margin: 1.5em auto;
    }

    .input-row {
      gap: 0.8em;
    }
}

@media (max-width: 480px) {
    .container {
        width: calc(100% - 2em);
        padding: 1em;
        gap: 0.75em;
        margin: 1em auto;
    }

    .input-row {
      flex-direction: column;
      gap: 0.75em;
    }
}
</style>
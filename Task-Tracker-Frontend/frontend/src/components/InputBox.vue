<script setup>
import { ref } from 'vue';
import { createTask } from '../services/tasks.js';

const emit = defineEmits(['task-added']);

const title = ref('');
const description = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const addTask = async () => {
  if (!title.value.trim()) {
    errorMessage.value = 'Title is required';
    return;
  }
  
  try {
    isLoading.value = true;
    errorMessage.value = '';
    await createTask({
      title: title.value,
      description: description.value || ''
    });
    title.value = '';
    description.value = '';
    emit('task-added');
  } catch (error) {
    errorMessage.value = 'Failed to add task';
    console.error('Error creating task:', error);
  } finally {
    isLoading.value = false;
  }
};

defineExpose({ addTask });
</script>

<template>
  <div class="input-container">
    <input 
      v-model="title"
      type="text" 
      placeholder="what needs to be done?" 
      :disabled="isLoading"
      @keypress.enter="addTask"
    />
    <input 
      v-model="description"
      type="text" 
      placeholder="description (optional)" 
      :disabled="isLoading"
      @keypress.enter="addTask"
      class="description-input"
    />
    <div v-if="errorMessage" class="error-text">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

input {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-family: inherit;
  background-color: var(--input-bg);
  color: var(--text-color);
  transition: all 0.3s;
  min-height: 44px;
  box-sizing: border-box;
}

input.description-input {
  font-size: 0.9em;
  min-height: 38px;
}

input:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 4px rgba(100, 108, 255, 0.2);
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-text {
  color: #c33;
  font-size: 0.85em;
  margin-top: -0.25em;
}

:global(body.dark-theme) .error-text {
  color: #ff8080;
}

@media (max-width: 480px) {
  input {
    font-size: 16px;
    padding: 0.65em 1em;
  }
  
  input.description-input {
    font-size: 14px;
  }
}
</style>
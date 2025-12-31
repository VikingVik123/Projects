<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { getTasks, deleteTask, updateTask } from '../services/tasks.js';

const tasks = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const filter = ref('all'); // 'all', 'completed', 'active'
const editingTaskId = ref(null);
const editForm = ref({ title: '', description: '' });

const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed);
  } else if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed);
  }
  return tasks.value;
});

const setFilter = (newFilter) => {
  filter.value = newFilter;
};

const fetchTasks = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    const data = await getTasks();
    tasks.value = data;
  } catch (error) {
    errorMessage.value = 'Failed to load tasks';
    console.error('Error fetching tasks:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleToggleComplete = async (task) => {
  try {
    await updateTask(task._id, { completed: !task.completed });
    task.completed = !task.completed;
  } catch (error) {
    errorMessage.value = 'Failed to update task';
    console.error('Error updating task:', error);
  }
};

const handleDeleteTask = async (taskId) => {
  try {
    await deleteTask(taskId);
    tasks.value = tasks.value.filter(t => t._id !== taskId);
  } catch (error) {
    errorMessage.value = 'Failed to delete task';
    console.error('Error deleting task:', error);
  }
};

const startEdit = (task) => {
  editingTaskId.value = task._id;
  editForm.value = {
    title: task.title,
    description: task.description || ''
  };
};

const cancelEdit = () => {
  editingTaskId.value = null;
  editForm.value = { title: '', description: '' };
};

const saveEdit = async (task) => {
  if (!editForm.value.title.trim()) {
    errorMessage.value = 'Title cannot be empty';
    return;
  }
  
  try {
    const updatedTask = await updateTask(task._id, {
      title: editForm.value.title,
      description: editForm.value.description,
      completed: task.completed
    });
    
    // Update the task in the list
    const index = tasks.value.findIndex(t => t._id === task._id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
    
    cancelEdit();
  } catch (error) {
    errorMessage.value = 'Failed to update task';
    console.error('Error updating task:', error);
  }
};

onMounted(() => {
  fetchTasks();
  
  // Listen for task-added events
  window.addEventListener('task-added', fetchTasks);
});

onBeforeUnmount(() => {
  window.removeEventListener('task-added', fetchTasks);
});
</script>

<template>
    <div class="button-group">
      <button 
        @click="setFilter('all')"
        :class="{ active: filter === 'all' }"
      >
        All
      </button>
      <button 
        @click="setFilter('completed')"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
      <button 
        @click="setFilter('active')"
        :class="{ active: filter === 'active' }"
      >
        Active
      </button>
    </div>
    <div class="info-box">
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div v-if="isLoading" class="loading">Loading tasks...</div>

        <div v-else-if="filteredTasks.length === 0 && tasks.length === 0" class="no-tasks">
          No tasks yet. Create your first task!
        </div>

        <div v-else-if="filteredTasks.length === 0" class="no-tasks">
          No {{ filter }} tasks.
        </div>

        <div v-else class="tasks-list">
          <div 
            v-for="task in filteredTasks" 
            :key="task._id" 
            class="task-item"
            :class="{ completed: task.completed }"
          >
            <div class="task-content">
              <!-- Edit Mode -->
              <div v-if="editingTaskId === task._id" class="edit-mode">
                <input 
                  v-model="editForm.title"
                  type="text" 
                  class="edit-input"
                  placeholder="Task title"
                />
                <textarea
                  v-model="editForm.description"
                  class="edit-textarea"
                  placeholder="Task description (optional)"
                  rows="2"
                />
                <div class="edit-actions">
                  <button @click="saveEdit(task)" class="save-btn">
                    Save
                  </button>
                  <button @click="cancelEdit" class="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
              
              <!-- View Mode -->
              <div v-else>
                <div class="task-header">
                  <h3 class="task-title">{{ task.title }}</h3>
                  <input 
                    type="checkbox" 
                    :checked="task.completed"
                    @change="handleToggleComplete(task)"
                    class="task-checkbox"
                  />
                </div>
                <p v-if="task.description" class="task-description">
                  {{ task.description }}
                </p>
                <div class="task-footer">
                  <span class="task-date">
                    {{ new Date(task.createdAt).toLocaleDateString() }}
                  </span>
                  <div class="task-actions">
                    <button 
                      @click="startEdit(task)"
                      class="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      @click="handleDeleteTask(task._id)"
                      class="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 1em;
  width: 90%;
  max-width: 1200px;
  margin: 2em auto 0;
  padding: 0 1.5em;
}

.button-group button {
  padding: 0.6em 1.2em;
  border-radius: 8px 8px 0 0;
  border: 1px solid var(--border-color);
  border-bottom: none;
  background-color: var(--button-hover);
  color: var(--text-color);
  cursor: pointer;
  font-size: 1em;
  font-family: inherit;
  transition: all 0.3s;
  min-height: 44px;
}

.button-group button:hover {
  background-color: var(--container-bg);
}

.button-group button:focus,
.button-group button:active,
.button-group button.active {
  outline: none;
  background-color: var(--container-bg);
  font-weight: 600;
}

.info-box {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 2em;
  padding: 1.5em;
  box-shadow: 0 4px 6px var(--shadow), 0 2px 4px var(--shadow);
  border-radius: 0 8px 8px 8px;
  background-color: var(--container-bg);
  min-height: 200px;
  transition: all 0.3s;
}

.error-message {
  padding: 10px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 14px;
  text-align: center;
  margin-bottom: 1em;
}

:global(body.dark-theme) .error-message {
  background-color: #3a3a3a;
  border-color: #555;
  color: #e0e0e0;
}

.loading, .no-tasks {
  text-align: center;
  padding: 2em;
  color: var(--text-color);
  opacity: 0.7;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.task-item {
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1em;
  transition: all 0.3s;
}

.task-item:hover {
  box-shadow: 0 2px 8px var(--shadow);
  transform: translateY(-2px);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-content {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}

.task-title {
  margin: 0;
  color: var(--text-color);
  font-size: 1.1em;
  flex: 1;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
}

.task-description {
  margin: 0;
  color: var(--text-color);
  opacity: 0.8;
  font-size: 0.95em;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5em;
}

.task-date {
  font-size: 0.85em;
  color: var(--text-color);
  opacity: 0.6;
}

.task-actions {
  display: flex;
  gap: 0.5em;
}

.edit-btn,
.delete-btn {
  padding: 0.4em 0.8em;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
  transition: all 0.3s;
}

.edit-btn:hover {
  background-color: #87CEEB;
  color: white;
  border-color: #87CEEB;
}

.delete-btn:hover {
  background-color: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 0.75em;
}

.edit-input,
.edit-textarea {
  width: 100%;
  padding: 0.6em;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1em;
  font-family: inherit;
  background-color: var(--input-bg);
  color: var(--text-color);
  box-sizing: border-box;
}

.edit-textarea {
  resize: vertical;
  min-height: 60px;
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: #87CEEB;
  box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2);
}

.edit-actions {
  display: flex;
  gap: 0.5em;
  justify-content: flex-end;
}

.save-btn,
.cancel-btn {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 500;
  transition: all 0.3s;
}

.save-btn {
  background-color: #87CEEB;
  color: white;
}

.save-btn:hover {
  background-color: #6bb6d9;
  transform: translateY(-1px);
}

.cancel-btn {
  background-color: var(--button-hover);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.cancel-btn:hover {
  background-color: var(--border-color);
}

@media (max-width: 768px) {
  .button-group {
    width: 92%;
    padding: 0 1.2em;
    gap: 0.6em;
    margin: 1.5em auto 0;
  }

  .button-group button {
    padding: 0.5em 1em;
    font-size: 0.9em;
  }

  .info-box {
    width: 92%;
    padding: 1.2em;
    min-height: 180px;
    margin-bottom: 1.5em;
  }

  .task-item {
    padding: 0.8em;
  }

  .task-title {
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .button-group {
    width: calc(100% - 2em);
    padding: 0 1em;
    gap: 0.4em;
    margin: 1em auto 0;
  }

  .button-group button {
    padding: 0.5em 0.7em;
    font-size: 0.85em;
    flex: 1;
  }

  .info-box {
    width: calc(100% - 2em);
    padding: 1em;
    min-height: 150px;
    margin: 0 auto 1em;
  }

  .task-header {
    gap: 0.5em;
  }

  .task-title {
    font-size: 0.95em;
  }

  .task-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
  }
}
</style>
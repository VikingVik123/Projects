<script setup>
const emit = defineEmits(['add-task']);

const handleClick = () => {
  emit('add-task');
};
</script>

<template>
  <button @click="handleClick">+ Add</button>
</template>

<style scoped>
button {
  border-radius: 8px;
  border: none;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #5dade2;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  min-height: 44px;
  height: 44px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(93, 173, 226, 0.3);
}
button:hover {
  background-color: #3498db;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(93, 173, 226, 0.4);
}
button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(93, 173, 226, 0.3);
}
button:focus,
button:focus-visible {
  outline: 3px solid rgba(93, 173, 226, 0.3);
  outline-offset: 2px;
}

@media (max-width: 480px) {
  button {
    padding: 0.7em 1em;
    font-size: 0.95em;
    min-width: 80px;
  }
}
</style>
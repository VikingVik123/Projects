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
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #87CEEB;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
  white-space: nowrap;
  min-height: 44px;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (max-width: 480px) {
  button {
    width: 100%;
    padding: 0.7em 1em;
    font-size: 0.95em;
  }
}
</style>
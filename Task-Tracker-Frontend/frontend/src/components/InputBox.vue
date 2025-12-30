<script setup>
</script>

<template>
  <input type="text" placeholder="what needs to be done?" />
</template>

<style scoped>
input {
  flex: 1;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-family: inherit;
  background-color: var(--input-bg);
  color: var(--text-color);
  transition: all 0.3s;
}
input:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 4px rgba(100, 108, 255, 0.2);
}
</style>
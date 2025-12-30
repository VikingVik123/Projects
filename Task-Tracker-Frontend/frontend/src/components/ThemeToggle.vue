<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['toggle-theme']);

const isDark = ref(false);

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark';
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  emit('toggle-theme', isDark.value);
};
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span v-if="isDark">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 1em;
  right: 1em;
  padding: 0.6em;
  font-size: 1.5em;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

:global(body.dark-theme) .theme-toggle {
  background-color: #2d2d2d;
  border-color: #555;
}

@media (max-width: 480px) {
  .theme-toggle {
    width: 40px;
    height: 40px;
    font-size: 1.2em;
    top: 0.5em;
    right: 0.5em;
  }
}
</style>

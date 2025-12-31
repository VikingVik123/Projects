<script setup>
import { onMounted } from 'vue';
import ThemeToggle from './components/ThemeToggle.vue';

const handleThemeToggle = (isDark) => {
  if (isDark) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});
</script>

<template>
  <ThemeToggle @toggle-theme="handleThemeToggle" />
  <router-view />
</template>

<style scoped>

</style>

<script setup>
import { onMounted } from 'vue';
import Container from './components/Container.vue';
import Header from './components/Header.vue';
import InfoBox from './components/InfoBox.vue';
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
  <Header />
  <Container />
  <InfoBox />
</template>

<style scoped>

</style>

<script setup>
    
</script>

<template>
  <header class="header">
    <h1>TaskFlow</h1>
    <p>Stay organized, stay productive, get things done</p>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  margin: 2em 0;
}
.header h1 {
  font-size: 4em;
  margin-bottom: 0.2em;
  background: linear-gradient(135deg, #B8C5A0, #C8A882);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.header p {
  font-size: 1.2em;
  color: #666;
  transition: color 0.3s;
}

:global(body.dark-theme) .header p {
  color: #aaa;
}

@media (max-width: 768px) {
  .header {
    margin: 1.5em 0;
  }
  .header h1 {
    font-size: 3em;
  }
  .header p {
    font-size: 1em;
    padding: 0 1em;
  }
}

@media (max-width: 480px) {
  .header {
    margin: 1em 0;
  }
  .header h1 {
    font-size: 2.5em;
  }
  .header p {
    font-size: 0.9em;
    padding: 0 0.5em;
  }
}
</style>
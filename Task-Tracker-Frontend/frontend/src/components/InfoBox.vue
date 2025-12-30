<script setup>
</script>

<template>
    <div class="button-group">
      <button>All</button>
      <button>Completed</button>
      <button>Active</button>
    </div>
    <div class="info-box">
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
}

.button-group button:hover {
  background-color: var(--container-bg);
}

.button-group button:focus,
.button-group button:active {
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

@media (max-width: 768px) {
  .button-group {
    width: 95%;
    padding: 0 0.75em;
    gap: 0.5em;
  }

  .button-group button {
    padding: 0.5em 0.8em;
    font-size: 0.9em;
  }

  .info-box {
    width: 95%;
    padding: 1em;
    min-height: 150px;
  }
}

@media (max-width: 480px) {
  .button-group {
    width: 98%;
    padding: 0 0.5em;
    gap: 0.3em;
  }

  .button-group button {
    padding: 0.4em 0.6em;
    font-size: 0.85em;
  }

  .info-box {
    width: 98%;
    padding: 0.75em;
    min-height: 120px;
  }
}
</style>
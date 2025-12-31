<script setup>
const emit = defineEmits(['logout']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const handleLogout = () => {
  if (!props.disabled) {
    emit('logout');
  }
};
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">© 2025 Task Tracker. All rights reserved.</p>
      <button 
        class="logout-btn" 
        @click="handleLogout"
        :disabled="disabled"
      >
        {{ disabled ? 'Logging out...' : 'Logout' }}
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: var(--container-bg);
  border-top: 1px solid var(--border-color);
  margin-top: 3em;
  padding: 1.5em 0;
  transition: background-color 0.3s, border-color 0.3s;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}

.copyright {
  margin: 0;
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.9em;
}

.logout-btn {
  padding: 0.6em 1.2em;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--button-hover);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9em;
  font-family: inherit;
  transition: all 0.3s;
  min-height: 44px;
  min-width: 80px;
}

.logout-btn:hover {
  background-color: #87CEEB;
  color: white;
  border-color: #87CEEB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(135, 206, 235, 0.3);
}

.logout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .footer {
    padding: 1.2em 0;
    margin-top: 2em;
  }

  .footer-content {
    padding: 0 1.2em;
  }

  .copyright {
    font-size: 0.85em;
  }

  .logout-btn {
    padding: 0.5em 1em;
    font-size: 0.85em;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1em 0;
    margin-top: 1.5em;
  }

  .footer-content {
    flex-direction: column-reverse;
    padding: 0 1em;
    gap: 0.75em;
  }

  .copyright {
    font-size: 0.8em;
    text-align: center;
  }

  .logout-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>

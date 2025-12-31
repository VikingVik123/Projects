<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Container from '../components/Container.vue';
import InfoBox from '../components/InfoBox.vue';
import { logout } from '../services/auth.js';

const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref('');

// Check authentication on mount
onMounted(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/login');
  }
});

// Handle logout
const handleLogout = async () => {
  try {
    isLoading.value = true;
    await logout();
    localStorage.removeItem('authToken');
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Logout failed. Redirecting anyway...';
    localStorage.removeItem('authToken');
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="dashboard">
    <div class="logout-container">
      <button 
        class="logout-btn" 
        @click="handleLogout" 
        :disabled="isLoading"
      >
        {{ isLoading ? 'Logging out...' : 'Logout' }}
      </button>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <Header />
    <Container />
    <InfoBox />
  </div>
</template>

<style scoped>
.dashboard {
  position: relative;
  min-height: 100vh;
  padding-top: 0.5em;
}

.logout-container {
  position: fixed;
  top: 1em;
  left: 1em;
  z-index: 1000;
}

.logout-btn {
  padding: 0.6em 1.2em;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--container-bg);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9em;
  font-family: inherit;
  transition: all 0.3s;
  box-shadow: 0 2px 4px var(--shadow);
  min-height: 44px;
  min-width: 80px;
}

.logout-btn:hover:not(:disabled) {
  background-color: #87CEEB;
  color: white;
  border-color: #87CEEB;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(135, 206, 235, 0.3);
}

.logout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  max-width: 600px;
  margin: 1em auto;
  padding: 10px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 14px;
  text-align: center;
}

:global(body.dark-theme) .error-message {
  background-color: #3a3a3a;
  border-color: #555;
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .dashboard {
    padding-top: 1em;
  }

  .logout-container {
    top: 0.75em;
    left: 0.75em;
  }

  .logout-btn {
    padding: 0.5em 1em;
    font-size: 0.85em;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding-top: 1.5em;
  }

  .logout-container {
    top: 0.5em;
    left: 0.5em;
  }

  .logout-btn {
    padding: 0.5em 0.9em;
    font-size: 0.8em;
    min-width: 70px;
  }

  .error-message {
    margin: 0.5em 1em;
    font-size: 13px;
  }
}
</style>

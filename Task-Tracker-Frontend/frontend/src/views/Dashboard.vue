<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import Container from '../components/Container.vue';
import InfoBox from '../components/InfoBox.vue';
import Footer from '../components/Footer.vue';
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
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <Header />
    <Container />
    <InfoBox />
    <Footer @logout="handleLogout" :disabled="isLoading" />
  </div>
</template>

<style scoped>
.dashboard {
  position: relative;
  min-height: 100vh;
  padding-top: 0.5em;
  padding-bottom: 1em;
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
}

@media (max-width: 480px) {
  .dashboard {
    padding-top: 1em;
  }

  .error-message {
    margin: 0.5em 1em;
    font-size: 13px;
  }
}
</style>

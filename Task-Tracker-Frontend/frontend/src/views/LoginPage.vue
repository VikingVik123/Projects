<script setup>
import { ref } from 'vue';
import { login } from '../services/auth.js';

const form = ref({
  username: '',
  password: ''
});

const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    errorMessage.value = '';
    isLoading.value = true;
    
    try {
        const response = await login({
            username: form.value.username,
            password: form.value.password
        });
        
        // Store the token if provided
        if (response.token) {
            localStorage.setItem('authToken', response.token);
        }
        
        // Redirect to home or dashboard
        window.location.href = '/';
    } catch (error) {
        errorMessage.value = error.response?.data?.message || error.message || 'Login failed. Please try again.';
    } finally {
        isLoading.value = false;
    }
};

</script>
<template>
  <div class="login-page">
    <h1>Login</h1>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <input 
          id="username" 
          v-model="form.username" 
          type="text" 
          required 
          :disabled="isLoading"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          id="password" 
          v-model="form.password" 
          type="password" 
          required 
          :disabled="isLoading"
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
<style scoped>
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.login-page h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.error-message {
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 14px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
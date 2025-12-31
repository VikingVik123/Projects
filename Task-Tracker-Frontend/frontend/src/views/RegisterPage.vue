<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/auth.js';

const router = useRouter();

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
    errorMessage.value = '';
    successMessage.value = '';
    
    // Validate passwords match
    if (form.value.password !== form.value.confirmPassword) {
        errorMessage.value = 'Passwords do not match';
        return;
    }
    
    // Validate password length
    if (form.value.password.length < 6) {
        errorMessage.value = 'Password must be at least 6 characters';
        return;
    }
    
    isLoading.value = true;
    
    try {
        const response = await register({
            username: form.value.username,
            password: form.value.password
        });
        
        successMessage.value = response.message || 'Registration successful! Redirecting to login...';
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    } catch (error) {
        console.error('Registration error:', error.response?.data);
        if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message;
        } else if (error.response?.data?.error) {
            errorMessage.value = error.response.data.error;
        } else if (error.message) {
            errorMessage.value = error.message;
        } else {
            errorMessage.value = 'Registration failed. Please try again.';
        }
    } finally {
        isLoading.value = false;
    }
};

const goToLogin = () => {
    router.push('/login');
};
</script>

<template>
  <div class="register-page">
    <h1>Register</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username:</label>
        <input 
          id="username" 
          v-model="form.username" 
          type="text" 
          required 
          :disabled="isLoading"
          placeholder="Enter username"
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
          placeholder="At least 6 characters"
        />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input 
          id="confirmPassword" 
          v-model="form.confirmPassword" 
          type="password" 
          required 
          :disabled="isLoading"
          placeholder="Re-enter password"
        />
      </div>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>
    </form>
    
    <div class="login-link">
      Already have an account? 
      <a @click.prevent="goToLogin" href="#">Login here</a>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--container-bg);
  box-shadow: 0 4px 12px var(--shadow);
  transition: all 0.3s;
}

.register-page h1 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-color);
  background: linear-gradient(135deg, #B8C5A0, #C8A882);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-message {
  padding: 10px;
  margin-bottom: 15px;
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

.success-message {
  padding: 10px;
  margin-bottom: 15px;
  background-color: #e8f5e9;
  border: 1px solid #81c784;
  border-radius: 4px;
  color: #2e7d32;
  font-size: 14px;
  text-align: center;
}

:global(body.dark-theme) .success-message {
  background-color: #1b5e20;
  border-color: #4caf50;
  color: #a5d6a7;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: var(--input-bg);
  color: var(--text-color);
  transition: all 0.3s;
  min-height: 44px;
}

.form-group input:focus {
  outline: none;
  border-color: #87CEEB;
  box-shadow: 0 0 0 4px rgba(135, 206, 235, 0.2);
}

.form-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #87CEEB;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 44px;
}

button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(135, 206, 235, 0.3);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  color: var(--text-color);
  font-size: 14px;
}

.login-link a {
  color: #87CEEB;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.login-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-page {
    max-width: 90%;
    margin: 30px auto;
    padding: 25px;
  }
}

@media (max-width: 480px) {
  .register-page {
    max-width: calc(100% - 1em);
    margin: 20px 0.5em;
    padding: 20px;
  }

  .register-page h1 {
    font-size: 1.8em;
    margin-bottom: 15px;
  }

  .form-group input {
    font-size: 16px;
    padding: 12px;
  }

  button {
    padding: 14px;
    font-size: 16px;
  }
}
</style>

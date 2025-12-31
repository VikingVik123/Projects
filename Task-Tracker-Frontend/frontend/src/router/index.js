import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  
  if (to.meta.requiresAuth && !token) {
    // Redirect to login if route requires auth and no token
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    // Redirect to dashboard if already logged in
    next('/');
  } else {
    next();
  }
});

export default router;

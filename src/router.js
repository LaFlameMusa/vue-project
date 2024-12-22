import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/UserStore';
import HomePage from './components/HomePage.vue';
import AnalyticsPage from './components/AnalyticsPage.vue';
import LoginPage from './components/LoginPage.vue';
import CartPage from './components/CartPage.vue';
import UserManagement from './components/UserManagement.vue'; // Добавлен новый компонент

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  {
    path: '/analytics',
    component: AnalyticsPage,
    name: 'Analytics',
    meta: { requiresRole: 'admin' }, // Доступ только администратору
  },
  { path: '/login', component: LoginPage, name: 'Login' },
  {
    path: '/cart',
    component: CartPage,
    name: 'Cart',
  },
  {
    path: '/users',
    component: UserManagement, // Добавляем маршрут для управления пользователями
    name: 'UserManagement',
    meta: { requiresRole: 'moderator' }, // Доступ модератору и администратору
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Проверка прав доступа перед каждым переходом на маршрут
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiredRole = to.meta.requiresRole;

  if (requiredRole) {
    // Проверяем, есть ли у пользователя нужная роль
    if (userStore.role === requiredRole || userStore.role === 'admin') {
      next(); // Доступ разрешён
    } else {
      next('/login'); // Перенаправляем на страницу входа
    }
  } else {
    next(); // Доступ разрешён всем
  }
});

export default router;

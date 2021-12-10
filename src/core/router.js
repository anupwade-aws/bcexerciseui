import { createWebHistory, createRouter } from 'vue-router';

import Home from '~/Home.vue';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'formValidation',
      component: () => import('~/modules/form-validation/FormValidation.vue'),
    },
  ],
});

<template>
  <div class="p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="bg-white dark:bg-gray-900 rounded shadow p-6 mt-4">
      <h1 class="text-2xl font-bold mb-4">Billing sozlamalari</h1>
      <p class="text-gray-700 dark:text-gray-300">Bu sahifa billing va to‘lov tizimi uchun asosiy sozlamalarni boshqarish uchun.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Tizimni sozlash' },
  { text: 'Billing sozlamalari', to: '/settings/billing', active: true }
]);
</script>

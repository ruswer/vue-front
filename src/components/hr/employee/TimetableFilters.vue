<template>
  <div class="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Tanlash</h3>
      <Button type="primary" @click="$emit('add-schedule')">
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Dars Jadvali qo'shish/Yangilash</span>
        </span>
      </Button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label for="branch_filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Filial</label>
        <select id="branch_filter" v-model="filters.branch_id" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3">
          <option value="">Barcha filiallar</option>
          <option v-for="(name, id) in branchOptions" :key="id" :value="id">{{ name }}</option>
        </select>
      </div>
      <div>
        <label for="group_filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Guruh</label>
        <select id="group_filter" v-model="filters.group_id" :disabled="!filters.branch_id" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3">
          <option value="">Barcha guruhlar</option>
          <option v-for="(name, id) in groupOptions" :key="id" :value="id">{{ name }}</option>
        </select>
      </div>
      <div>
        <label for="teacher_filter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">O'qituvchi</label>
        <select id="teacher_filter" v-model="filters.teacher_id" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3">
          <option value="">Barcha o'qituvchilar</option>
          <option v-for="(name, id) in teacherOptions" :key="id" :value="id">{{ name }}</option>
        </select>
      </div>
      <div class="md:col-span-3 flex justify-end mt-2">
        <Button type="blue" @click="$emit('search-schedule')" :disabled="loading">
          <span class="flex items-center gap-2">
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Qidirish</span>
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
const props = defineProps({
  filters: Object,
  branchOptions: Object,
  groupOptions: Object,
  teacherOptions: Object,
  loading: Boolean
})
</script>

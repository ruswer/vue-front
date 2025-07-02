<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
    <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.01A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        <span class="text-xl font-semibold text-gray-800 dark:text-gray-200">Tanlash</span>
      </div>
      <Button type="primary" @click="$emit('add-employee')">
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 -ml-0.5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Xodim qo'shish
        </span>
      </Button>
    </div>
    <div class="p-4">
      <div class="flex flex-col gap-4 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label for="branch" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Filial</label>
            <select v-model="filters.branch_id" id="branch"
              class="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary-500 dark:focus:ring-blue-500 sm:text-sm p-3">
              <option value="">Barcha filiallar</option>
              <option v-for="(name, id) in branchOptions" :key="id" :value="id">{{ name }}</option>
            </select>
          </div>
          <div>
            <label for="positionFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Lavozim</label>
            <select v-model="filters.position_id" id="positionFilter"
              :disabled="!filters.branch_id"
              class="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm p-3 disabled:opacity-50 disabled:cursor-not-allowed">
              <option value="">Barcha lavozimlar</option>
              <option v-for="(name, id) in positionOptions" :key="id" :value="id">{{ name }}</option>
            </select>
          </div>
          <div>
            <label for="departmentFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Bo'lim</label>
            <select v-model="filters.department_id" id="departmentFilter"
              class="block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm p-3">
              <option value="">Barcha bo'limlar</option>
              <option v-for="(name, id) in departmentOptions" :key="id" :value="id">{{ name }}</option>
            </select>
          </div>
          <div class="relative">
            <label for="search-keyword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Search</label>
            <div class="relative rounded-lg shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-gray-400 dark:text-gray-500">
                  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                </svg>
              </div>
              <input type="search" v-model="filters.search" id="search-keyword"
                placeholder="ID, Ism, Lavozim bo'yicha..."
                class="block w-full rounded-lg border border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm p-3" />
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <Button type="blue" @click="$emit('search-employees')" :disabled="loading">
            <span class="flex items-center gap-1.5">
              <svg class="w-5 h-5 -ml-0.5 mr-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
              </svg>
              <span>Qidirish</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
const props = defineProps({
  filters: Object,
  branchOptions: Object,
  positionOptions: Object,
  departmentOptions: Object,
  loading: Boolean
})
</script>

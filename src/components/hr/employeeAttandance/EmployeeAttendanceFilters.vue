<template>
  <div class="flex-1 mb-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
    <div class="flex items-center justify-between p-4 rounded-md shadow-sm bg-white dark:bg-gray-800">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span class="text-xl font-semibold text-gray-800 dark:text-gray-200">Tanlash</span>
      </div>
    </div>
    <div class="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm gap-4 flex-nowrap">
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap lg:flex-nowrap gap-4">
          <div class="w-full lg:w-1/2">
            <label for="branch" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Filial</label>
            <select v-model="modelValue.selectedBranchId" id="branch" name="branch" required
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 p-3">
              <option value="">Filialni tanlang</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
          </div>
          <div class="w-full lg:w-1/2">
            <label for="selected_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 p-3">Sana</label>
            <input v-model="modelValue.selectedDate" type="date" id="selected_date" name="selected_date" required
              class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 p-3"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <Button type="blue" @click="$emit('search-staff')" :disabled="loading">
            <span class="flex items-center gap-1.5">
              <svg class="w-5 h-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
  modelValue: Object,
  branches: Array,
  loading: Boolean
})
</script>

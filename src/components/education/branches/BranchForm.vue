<template>
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Filial qo'shish</h2>
    <form @submit.prevent="createBranch" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial nomi</label>
        <input v-model="newBranch.name" type="text" required placeholder="Filial nomi..." class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-5 py-3" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzil</label>
        <input v-model="newBranch.address" type="text" required placeholder="Manzil..." class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-5 py-3" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
        <input v-model="newBranch.phone" type="text" required placeholder="Telefon..." class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-5 py-3" />
      </div>
      <div class="flex justify-end pt-4">
        <button type="submit" :disabled="loading"
          class="inline-flex items-center px-7 py-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saqlash
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
const props = defineProps({
  newBranch: Object,
  loading: Boolean,
  createBranch: Function
})
</script>

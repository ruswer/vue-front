<template>
  <div class="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-fit">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">Rol qo'shish</h2>
    <form @submit.prevent="$emit('submit')" class="space-y-4">
      <div>
        <label for="roleName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rol nomi</label>
        <input v-model="form.name" type="text" id="roleName" required
               class="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <span v-if="formError" class="text-red-500 text-xs mt-1">{{ formError }}</span>
      </div>
      <div class="flex justify-end pt-4">
        <Button :disabled="loading" :type="'primary'" :nativeType="'submit'">
          <span v-if="loading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          <span v-else>Saqlash</span>
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Button from '../../Button.vue';
const props = defineProps({
  form: Object,
  formError: String,
  loading: Boolean
});
</script>

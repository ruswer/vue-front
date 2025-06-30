<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="category_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategoriya nomi</label>
      <input v-model="localForm.name" type="text" id="category_name" required placeholder="Kategoriya nomini kiriting"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsifi</label>
      <textarea v-model="localForm.description" id="description" rows="3" placeholder="Kategoriya haqida qo'shimcha ma'lumot"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
    </div>
    <div>
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
      <select v-model="localForm.status" id="status" required
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="active">Faol</option>
        <option value="inactive">Faol emas</option>
      </select>
    </div>
    <div class="flex justify-between items-center pt-4">
      <button v-if="editingCategoryId" type="button" @click="$emit('reset')"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500">
        Bekor qilish
      </button>
      <span v-else></span>
      <button type="submit" :disabled="loading"
        class="inline-flex items-center justify-center w-36 h-12 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ editingCategoryId ? 'Yangilash' : 'Saqlash' }}</span>
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  form: Object,
  editingCategoryId: [Number, null],
  loading: Boolean
})
const emit = defineEmits(['submit', 'reset'])
const localForm = ref({ ...props.form })
watch(() => props.form, (val) => {
  localForm.value = { ...val }
})
function onSubmit() {
  emit('submit', { ...localForm.value })
}
</script>

<template>
  <form @submit.prevent="save" class="space-y-4">
    <div>
      <label for="advertTypeName" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Reklama turi nomi</label>
      <input id="advertTypeName" v-model="form.name" type="text" required placeholder="Masalan: Banner reklama"
        class="w-full rounded-md border border-gray-300 dark:border-gray-600 py-3 pl-4 pr-4 text-base focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100" />
    </div>
    <div class="flex justify-end pt-4 gap-2">
      <button v-if="editingSource" type="button" @click="$emit('reset-form')"
        class="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700">
        Bekor qilish
      </button>
      <button type="submit" :disabled="loading"
        class="px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 flex items-center">
        <svg v-if="loading" class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ editingSource ? 'Yangilash' : 'Saqlash' }}
      </button>
    </div>
  </form>
</template>
<script setup>
const props = defineProps({
  form: Object,
  editingSource: [Number, null],
  loading: Boolean
})
const emit = defineEmits(['save', 'reset-form'])
function save() {
  emit('save')
}
</script>

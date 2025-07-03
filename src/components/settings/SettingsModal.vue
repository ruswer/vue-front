<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-4 sm:py-6 bg-gray-900/60">
    <div class="relative w-full max-w-lg mx-auto mt-4 max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 text-left shadow-xl transition-all">
      <div class="flex justify-between items-center pb-3 border-b">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Sozlamalarni tahrirlash</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form @submit.prevent="$emit('save-settings')" class="mt-4 space-y-4">
        <div v-for="field in fields" :key="field.key">
          <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
          <input
            v-model="editSettings[field.key]"
            :type="field.type"
            :id="field.key"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div class="mt-6 flex justify-end gap-x-3">
          <button type="button" @click="$emit('close')" class="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Bekor qilish
          </button>
          <button type="submit" class="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  editSettings: Object,
  fields: Array
});
</script>

<template>
  <div class="w-full lg:w-[70%] bg-white rounded-lg shadow-sm p-4">
    <div class="flex items-center justify-between mb-4 pb-4 border-b">
      <h2 class="text-lg font-medium text-gray-900">Umumiy sozlamalar</h2>
      <Button @click="$emit('edit-settings')" class="p-3 rounded-xl bg-primary-100 hover:bg-primary-100 transition-colors duration-200">
        <svg class="w-7 h-7 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Button>
    </div>
    <div class="overflow-x-auto bg-white">
      <table class="w-full">
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50" v-for="field in fields" :key="field.key">
            <td class="px-4 py-3 w-64"><div class="font-medium text-gray-900">{{ field.label }}</div></td>
            <td class="px-4 py-3"><span class="text-gray-700">{{ settings[field.key] }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Button from '../Button.vue';
const props = defineProps({
  settings: Object,
  fields: Array
});
</script>

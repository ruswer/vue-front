<template>
  <div>
    <div class="space-y-4">
      <!-- Logo container -->
      <div class="w-full h-60 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img v-if="settings.logoUrl" :src="settings.logoUrl" alt="Logotip" class="max-h-full max-w-full object-contain" />
        <div v-else class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex flex-col items-center mt-4">
            <span class="block text-sm font-medium text-gray-900">Logotip</span>
            <span class="block text-xs text-gray-500 mt-1">PNG, JPG, SVG (max. 2MB)</span>
          </div>
        </div>
      </div>
      <!-- Tahrirlash tugmasi -->
      <div class="flex justify-center w-full">
        <Button :type="'primary'" class="w-full inline-flex items-center justify-center px-4 py-2 mt-6" @click="$emit('edit-logo')">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Logoni tahrirlash
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '../Button.vue';
const props = defineProps({
  settings: Object
});
</script>

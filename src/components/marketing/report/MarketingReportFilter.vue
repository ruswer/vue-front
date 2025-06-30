<template>
  <div class="bg-white rounded-md shadow-sm p-6 mb-6">
    <div class="flex items-center gap-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <span class="text-xl font-semibold text-gray-800">Filtrlar</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="col-span-1 sm:col-span-1 lg:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Sana dan</label>
        <input type="date" v-model="local.startDate" class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500" />
        <!-- <DatePicker v-model="local.startDate" input-class="datepicker-input" /> -->
      </div>
      <div class="col-span-1 sm:col-span-1 lg:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Sana gacha</label>
        <input type="date" v-model="local.endDate" class="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500" />
        <!-- <DatePicker v-model="local.endDate" input-class="datepicker-input" /> -->
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-end gap-4 mt-4">
      <div class="flex-1"></div>
      <button @click="$emit('search')" class="inline-flex items-center border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto mt-2 sm:mt-0 px-8 py-3" style="font-size: 0.95rem;">
        <svg class="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Qidirish
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue'
// import DatePicker from 'vue3-datepicker'
const props = defineProps({
  modelValue: Object,
  branches: Array, // not used but kept for compatibility
  months: Object,  // not used but kept for compatibility
  years: Array     // not used but kept for compatibility
})
const emit = defineEmits(['update:modelValue', 'search'])
const local = reactive({ ...props.modelValue })
watch(local, v => emit('update:modelValue', v), { deep: true })
watch(() => props.modelValue, v => Object.assign(local, v), { deep: true })
</script>
<style>
.datepicker-input,
.datepicker-input input {
  width: 100% !important;
  border: 1px solid #d1d5db !important;
  border-radius: 0.375rem !important;
  padding: 0.5rem !important;
  font-size: 1rem !important;
  background: #fff !important;
  transition: border-color 0.2s !important;
}
.datepicker-input input:focus {
  border-color: #2563eb !important;
  outline: none !important;
  box-shadow: 0 0 0 1px #2563eb !important;
}
</style>

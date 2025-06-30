<template>
  <div>
    <Datepicker v-model="modelValue" :format="format" :input-class="inputClass" />
  </div>
</template>
<script setup>
import Datepicker from 'vue3-datepicker'
const props = defineProps({
  modelValue: [String, Date, null],
  format: { type: String, default: 'yyyy-MM-dd' },
  inputClass: { type: String, default: 'w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500' }
})
const emit = defineEmits(['update:modelValue'])
</script>

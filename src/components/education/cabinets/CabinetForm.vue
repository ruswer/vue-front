<template>
  <div class="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex-shrink-0">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">
      {{ cabinet.id ? 'Kabinetni tahrirlash' : 'Kabinet qo\'shish' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="cabinet-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kabinet nomi</label>
        <input type="text" id="cabinet-name" v-model="editableCabinet.name" required class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3" />
      </div>
      <div class="flex justify-end pt-4">
        <Button type="secondary" @click="cancel" v-if="cabinet.id" class="mr-2">Bekor qilish</Button>
        <Button type="primary" native-type="submit" :disabled="isSaving">
          <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saqlash
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Button from '@/components/Button.vue';

const props = defineProps({
  cabinet: {
    type: Object,
    default: () => ({ id: null, name: '' })
  },
  isSaving: Boolean,
});

const emit = defineEmits(['save', 'cancel']);

const editableCabinet = ref({ ...props.cabinet });

watch(() => props.cabinet, (newVal) => {
  editableCabinet.value = { ...newVal };
}, { deep: true });

function handleSubmit() {
  emit('save', editableCabinet.value);
}

function cancel() {
  emit('cancel');
}
</script>
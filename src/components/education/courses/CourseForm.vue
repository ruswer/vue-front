<template>
  <div>
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b dark:border-gray-700">
      {{ courseToEdit ? "Kursni tahrirlash" : "Kurs qo'shish" }}
    </h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurs nomi</label>
        <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3" />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
        <textarea id="description" v-model="form.description" rows="4" class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3"></textarea>
      </div>
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holati</label>
        <select id="status" v-model="form.status" required class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base px-4 py-3">
          <option value="active">Faol</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>
      <div class="flex justify-end pt-4">
        <Button v-if="courseToEdit" type="secondary" @click="cancel" class="mr-2">
          Bekor qilish
        </Button>
        <Button native-type="submit" :disabled="isSaving" type="primary">
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

const props = defineProps({
  courseToEdit: {
    type: Object,
    default: null
  },
  isSaving: Boolean,
});

const emit = defineEmits(['save', 'cancel']);

const initialFormState = {
  name: '',
  description: '',
  status: 'active',
};

const form = ref({ ...initialFormState });

watch(() => props.courseToEdit, (newCourse) => {
  if (newCourse) {
    form.value = { ...initialFormState, ...newCourse };
  } else {
    form.value = { ...initialFormState };
  }
}, { immediate: true, deep: true });

function submitForm() {
  emit('save', form.value);
}

function cancel() {
  emit('cancel');
}
</script>
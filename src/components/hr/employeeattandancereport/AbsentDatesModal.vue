<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 bg-gray-500/75 dark:bg-gray-900/80">
    <div class="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
      <div class="flex justify-between items-center pb-3 border-b dark:border-gray-700">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
          <template v-if="staff">
            {{ staff.full_name }} - Qatnashmagan kunlar ({{ selectedMonth ? months[selectedMonth] : '' }} {{ selectedYear }})
          </template>
          <template v-else>Qatnashmagan kunlar</template>
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-4">
        <div v-if="absentDates.length > 0" class="space-y-4 max-h-80 overflow-y-auto pr-2">
          <dl class="divide-y divide-gray-200 dark:divide-gray-700">
            <div v-for="absence in absentDates" :key="absence.date" class="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ absence.date }}</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:col-span-2 sm:mt-0">{{ absence.comment || '-' }}</dd>
            </div>
          </dl>
        </div>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">Tanlangan davr uchun qatnashmagan kunlar topilmadi.</p>
      </div>
      <div class="mt-6 flex justify-end">
        <button @click="$emit('close')" type="button" class="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800">
          Yopish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  staff: Object,
  absentDates: Array,
  selectedMonth: [String, Number],
  selectedYear: [String, Number],
  months: Object,
});

defineEmits(['close']);
</script>
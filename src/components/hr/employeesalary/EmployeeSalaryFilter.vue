<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span class="text-xl font-semibold text-gray-800 dark:text-gray-200">Tanlash</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <div>
        <label for="branchFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
        <select :value="filters.branch" @input="$emit('update:filters', { ...filters, branch: $event.target.value })" id="branchFilter" class="form-select p-3 border border-gray-300">
          <option value="">Barcha filiallar</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
        </select>
      </div>
      <div>
        <label for="monthFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Oy</label>
        <select :value="filters.month" @input="$emit('update:filters', { ...filters, month: $event.target.value })" id="monthFilter" class="form-select p-3 border border-gray-300">
          <option value="">Barcha Oylar</option>
          <option v-for="(monthName, monthNumber) in months" :key="monthNumber" :value="monthNumber">{{ monthName }}</option>
        </select>
        <div class="mt-2 flex flex-wrap gap-2">
          <button v-for="(monthName, monthNumber) in months" :key="'btn-'+monthNumber" type="button" class="px-3 py-1 rounded bg-gray-100 hover:bg-blue-200 text-sm border border-gray-300" @click="$emit('update:filters', { ...filters, month: monthNumber })">
            {{ monthName }}
          </button>
        </div>
      </div>
      <div>
        <label for="yearFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Yil</label>
        <select :value="filters.year" @input="$emit('update:filters', { ...filters, year: $event.target.value })" id="yearFilter" class="form-select p-3 border border-gray-300">
          <option value="">Barcha Yillar</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
        <div class="mt-2 flex flex-wrap gap-2">
          <button v-for="year in years" :key="'btn-'+year" type="button" class="px-3 py-1 rounded bg-gray-100 hover:bg-blue-200 text-sm border border-gray-300" @click="$emit('update:filters', { ...filters, year: year })">
            {{ year }}
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <Button :disabled="loading" :type="'blue'" :nativeType="'button'" @click="$emit('generate')">
        <span v-if="loading">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        <span v-else>
          <svg class="w-5 h-5 mr-2 text-white inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
        Qidirish
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue';
defineProps({
  filters: Object,
  branches: Array,
  months: Object,
  years: Array,
  loading: Boolean,
});

defineEmits(['update:filters', 'generate']);
</script>

<style scoped>
.form-select, .form-input {
  @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white;
}
</style>
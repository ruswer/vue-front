<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
    <div>
      <label for="expense_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Chiqim nomi</label>
      <input v-model="form.expense_name" type="text" id="expense_name" required placeholder="Chiqim nomini kiriting"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
    </div>
    <div>
      <label for="expense_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sana</label>
      <input v-model="form.expense_date" type="date" id="expense_date" required
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
    </div>
    <div>
      <label for="category_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategoriya</label>
      <select v-model="form.category_id" id="category_id" required
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="" disabled>Tanlang</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>
    <div>
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
      <select v-model="form.branch_id" id="branch_id" required
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="" disabled>Tanlang</option>
        <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
      </select>
    </div>
    <div>
      <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Summa</label>
      <input v-model="form.amount" type="number" id="amount" required min="0"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
    </div>
    <div>
      <label for="payment_type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">To'lov shakli</label>
      <select v-model="form.payment_type" id="payment_type" required
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="" disabled>Tanlang</option>
        <option value="cash">Naqd</option>
        <option value="card">Karta</option>
        <option value="transfer">O'tkazma</option>
      </select>
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Izoh</label>
      <textarea v-model="form.description" id="description" rows="2" placeholder="Qo'shimcha ma'lumot"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
    </div>
    <div class="flex justify-end pt-4">
      <button type="submit" :disabled="loading"
        class="inline-flex items-center justify-center w-36 h-12 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Saqlash</span>
      </button>
    </div>
  </form>
</template>
<script setup>
const props = defineProps({
  categories: Array,
  branches: Array,
  form: Object,
  loading: Boolean
})
const emit = defineEmits(['update:form', 'submit'])
</script>

<template>
  <div class="min-h-screen flex flex-col m-4">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Chap panel (30%) - Chiqim qo'shish -->
      <div class="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800 self-start">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          Chiqimni qo'shish
        </h2>
        <ExpenseForm
          :categories="categories"
          :branches="branches"
          :form="form"
          :loading="loading"
          @update:form="val => form = val"
          @submit="saveExpense"
        />
      </div>
      <!-- O'ng panel (70%) - Chiqimlar jadvali -->
      <div class="w-full lg:w-2/3 bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800 lg:self-start">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">Chiqimlar ro'yxati</h2>
        <ExpenseTable
          :expenses="expenses"
          :columns="columns"
          :sortField="sortField"
          :sortDirection="sortDirection"
          :currentPage="currentPage"
          :totalPages="totalPages"
          :paginatedExpenses="paginatedExpenses"
          :searchQuery="searchQuery"
          :getCategoryName="getCategoryName"
          :getBranchName="getBranchName"
          :formatDate="formatDate"
          :formatAmount="formatAmount"
          :paymentTypeLabel="paymentTypeLabel"
          @update:searchQuery="val => searchQuery = val"
          @sort="sort"
          @update:currentPage="val => currentPage = val"
          @reset-filters="resetFilters"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import ExpenseForm from '@/components/expenses/addexpense/ExpenseForm.vue'
import ExpenseTable from '@/components/expenses/addexpense/ExpenseTable.vue'
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Chiqimlar', to: '/expenses' },
  { text: 'Chiqim qo\'shish', to: '/expenses/add', active: true }
]
// Demo data for select options and table
const categories = ref([
  { id: 1, name: 'Ofis ijara' },
  { id: 2, name: 'Kommunal to‘lovlar' },
  { id: 3, name: 'Reklama' },
])
const branches = ref([
  { id: 1, name: 'Markaziy filial' },
  { id: 2, name: 'Yunusobod filial' },
])
const expenses = ref([
  { id: 1, expense_name: 'Ofis ijara', expense_date: '2025-06-01', category_id: 1, branch_id: 1, amount: 1000000, payment_type: 'cash', description: '' },
  { id: 2, expense_name: 'Reklama banner', expense_date: '2025-06-10', category_id: 3, branch_id: 2, amount: 500000, payment_type: 'card', description: '' },
])
const form = ref({
  category_id: '',
  branch_id: '',
  expense_name: '',
  expense_date: '',
  amount: '',
  payment_type: '',
  description: ''
})
const loading = ref(false)
const searchQuery = ref('')
const sortField = ref('expense_date')
const sortDirection = ref('desc')
const currentPage = ref(1)
const perPage = 5
const columns = [
  { label: 'Nomi', key: 'expense_name' },
  { label: 'Sana', key: 'expense_date' },
  { label: 'Kategoriya', key: 'category_id' },
  { label: 'Filial', key: 'branch_id' },
  { label: 'Summa', key: 'amount' },
  { label: "To'lov shakli", key: 'payment_type' },
]
function saveExpense() {
  loading.value = true
  setTimeout(() => {
    const newId = expenses.value.length ? Math.max(...expenses.value.map(e => e.id)) + 1 : 1
    expenses.value.push({ id: newId, ...form.value })
    resetForm()
    loading.value = false
  }, 500)
}
function resetForm() {
  form.value = { category_id: '', branch_id: '', expense_name: '', expense_date: '', amount: '', payment_type: '', description: '' }
}
function resetFilters() {
  searchQuery.value = ''
  currentPage.value = 1
}
function sort(key) {
  if (sortField.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = key
    sortDirection.value = 'asc'
  }
}
const filteredExpenses = computed(() => {
  let result = expenses.value.filter(e =>
    e.expense_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (getCategoryName(e.category_id) || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (getBranchName(e.branch_id) || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  if (sortField.value) {
    result = result.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})
const totalPages = computed(() => Math.ceil(filteredExpenses.value.length / perPage))
const paginatedExpenses = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredExpenses.value.slice(start, start + perPage)
})
function getCategoryName(id) {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : '-'
}
function getBranchName(id) {
  const branch = branches.value.find(b => b.id === id)
  return branch ? branch.name : '-'
}
function formatDate(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('uz-UZ')
}
function formatAmount(val) {
  return Number(val).toLocaleString('uz-UZ')
}
function paymentTypeLabel(type) {
  switch(type) {
    case 'cash': return 'Naqd'
    case 'card': return 'Karta'
    case 'transfer': return "O'tkazma"
    default: return type
  }
}
</script>
<style scoped>
</style>

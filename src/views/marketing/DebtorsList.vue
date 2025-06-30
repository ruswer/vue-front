<template>
  <div class="min-h-screen flex flex-col m-4">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />

    <!-- Filter Section -->
    <DebtorsFilter
      :filters="filters"
      :branches="branches"
      :groups="groups"
      :months="months"
      :years="years"
      :loading="loading"
      @update:filters="val => filters = val"
      @search="searchDebtors"
      class="bg-white rounded-md shadow-sm mb-6 p-6"
    />

    <!-- Table Section -->
    <div class="flex-1 bg-white rounded-md shadow-sm p-6">
      <h2 class="text-lg font-bold text-gray-800 mb-6 py-4 border-b">Qarzdorlar Ro'yxati</h2>
      <DebtorsTable
        :debtors="debtors"
        :columns="columns"
        :formatCurrency="formatCurrency"
        :formatDate="formatDate"
        :sortField="sortField"
        :sortDirection="sortDirection"
        @show-student="showStudentProfile"
        @remind="sendReminder"
        @sort="sort"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import DebtorsFilter from '@/components/marketing/debtors/DebtorsFilter.vue'
import DebtorsTable from '@/components/marketing/debtors/DebtorsTable.vue'

const filters = ref({ branch: '', group: '', month: '', year: '', search: '' })
const branches = ref([])
const groups = ref([])
const months = ref({ 1: 'Yanvar', 2: 'Fevral', 3: 'Mart', 4: 'Aprel' /* ... */ })
const years = ref([2023, 2024, 2025])
const debtors = ref([])
const columns = ref({
  student_name: "O'quvchi",
  groups: 'Guruh(lar)',
  total_debt: 'Qarz miqdori',
  last_payment_date: "Oxirgi to'lov",
  next_due_date: "To'lov muddati"
})
const sortField = ref('student_name')
const sortDirection = ref('asc')
const loading = ref(false)

const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Marketing', to: '/marketing/payments' },
  { text: "Qarzdorlar", to: '/marketing/debtors', active: true }
]

function searchDebtors() {
  loading.value = true
  // AJAX chaqirish yoki API fetch qilish
  setTimeout(() => {
    debtors.value = [] // Replace with real fetch
    loading.value = false
  }, 1000)
}
function formatCurrency(amount) {
  return Number(amount).toLocaleString('ru-RU')
}
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()}`
}
function showStudentProfile(id) {
  console.log('View', id)
}
function sendReminder(id) {
  console.log('Remind', id)
}
function sort(column) {
  if (sortField.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = column
    sortDirection.value = 'asc'
  }
  // Agar local sort qilmoqchi bo'lsangiz, debtors.value ni shu yerda sort qiling
}
</script>

<style scoped>
</style>

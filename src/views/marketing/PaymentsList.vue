<template>
  <div class="min-h-screen flex flex-col m-4">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />

    <!-- Filter Section -->
    <PaymentsFilter
      :filters="filters"
      :branches="branches"
      :groups="groups"
      :months="months"
      :years="years"
      @update:filters="val => filters = val"
      @search="searchPayments"
      @open-modal="openModal"
      class="bg-white rounded-md shadow-sm mb-6 p-6"
    />

    <!-- Table Section -->
    <div class="flex-1 bg-white rounded-md shadow-sm p-6">
      <h2 class="text-lg font-bold text-gray-800 mb-6 py-4 border-b">To'lovlar Ro'yxati</h2>
      <PaymentsTable
        :payments="payments"
        :columns="columns"
        :formatAmount="formatAmount"
        :formatDate="formatDate"
        :calculatePoints="calculatePoints"
        :sortField="sortField"
        :sortDirection="sortDirection"
        @view-details="viewDetails"
        @print-receipt="printReceipt"
        @sort="sort"
      />
    </div>

    <!-- Modal -->
    <Modal
      v-if="showModal"
      :title="'Yangi to‘lov qo‘shish'"
      :btnTextSubmit="'Saqlash'"
      :btnTextClose="'Bekor qilish'"
      v-model:isOpen="showModal"
      @close="closeModal"
      @submit="closeModal"
    >
      <template #body>
        <div class="space-y-4">
          <p class="text-gray-700">To‘lov qo‘shish formasi (yoki boshqa content) shu yerda bo‘ladi.</p>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/modal.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import PaymentsFilter from '@/components/marketing/payments/PaymentsFilter.vue'
import PaymentsTable from '@/components/marketing/payments/PaymentsTable.vue'

const filters = ref({ branch: '', group: '', month: '', year: '', search: '' })
const branches = ref([])
const groups = ref([])
const months = ref({ 1: 'Yanvar', 2: 'Fevral', 3: 'Mart', 4: 'Aprel' /* ... */ })
const years = ref([2023, 2024, 2025])
const payments = ref([])
const columns = ref({
  group_name: 'Guruh',
  amount: 'Yakuniy summa',
  discount: 'Imtiyoz',
  payment_date: "To'lov sanasi",
  payment_method: "To'lov turi"
})
const sortField = ref('group_name')
const sortDirection = ref('asc')
const showModal = ref(false)

const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "To'lovlar ro'yxati", to: '/marketing/payments', active: true }
]

function openModal() {
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
function searchPayments() {
  // AJAX chaqirish yoki API fetch qilish
}
function formatAmount(amount) {
  return Number(amount).toLocaleString('ru-RU')
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU')
}
function calculatePoints(discount) {
  const rate = 5000 // Masalan, 1 ball = 5000
  return Math.floor(discount / rate)
}
function viewDetails(id) {
  console.log('View', id)
}
function printReceipt(id) {
  console.log('Print', id)
}
function sort(column) {
  if (sortField.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = column
    sortDirection.value = 'asc'
  }
  // Agar local sort qilmoqchi bo'lsangiz, payments.value ni shu yerda sort qiling
}
</script>

<style scoped>
</style>

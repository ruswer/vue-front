<template>
  <div class="flex flex-col h-full mt-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-4 mx-4" />

    <!-- Filter Section -->
    <div class="mx-4">
      <RemovedStudentsFilter
        :branches="branches"
        :groups="groups"
        :selectedBranch="selectedBranch"
        :selectedGroup="selectedGroup"
        @update:selectedBranch="val => selectedBranch = val"
        @update:selectedGroup="val => selectedGroup = val"
        @searchByFilters="searchByFilters"
      />
    </div>

    <!-- Content Section -->
    <div class="flex-1 mt-4 bg-white rounded-md shadow-sm p-4 mx-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Safdan chiqarilgan o'quvchilar</h2>
      <!-- Search Input -->
      <div class="mb-4">
        <input
          type="text"
          v-model="search"
          @input="debounceSearchByKeyword"
          placeholder="O'quvchi yoki sabab..."
          class="block w-full md:w-1/5 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <RemovedStudentsTable
        :columns="columns"
        :deletedStudents="deletedStudents"
        :sortField="sortField"
        :sortDirection="sortDirection"
        @sort="sort"
        @restore="confirmRestoreStudent"
        @force-delete="confirmForceDelete"
        @open-restore-modal="openRestoreModal"
      />
      <Modal
        v-if="showRestoreModal && restoreStudent"
        :title="'O‘quvchini qayta tiklash'"
        :btnTextSubmit="'Qayta tiklash'"
        :btnTextClose="'Bekor qilish'"
        v-model:isOpen="showRestoreModal"
        @submit="confirmRestore"
      >
        <template #body>
          <div class="space-y-4">
            <p class="text-gray-700">
              <span class="font-semibold text-blue-700">{{ restoreStudent.first_name }} {{ restoreStudent.last_name }}</span>
              ismli o‘quvchini qayta tiklashni tasdiqlaysizmi?
            </p>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { debounce } from 'lodash'
import Breadcrumb from '@/components/Breadcrumb.vue'
import RemovedStudentsFilter from '@/components/students/removedstudents/RemovedStudentsFilter.vue'
import RemovedStudentsTable from '@/components/students/removedstudents/RemovedStudentsTable.vue'
import Modal from '@/components/modal.vue'

const selectedBranch = ref('')
const selectedGroup = ref('')
const search = ref('')
const branches = ref([])
const groups = ref([])
const deletedStudents = ref([])
const sortField = ref('first_name')
const sortDirection = ref('asc')
const columns = ref([
  { label: "O'quvchi Ismi", key: 'name' },
  { label: 'Filial', key: 'branch' },
  { label: "Tug'ilgan kuni", key: 'birth_date' },
  { label: 'Jinsi', key: 'gender' },
  { label: 'Tel.raqami', key: 'phone' },
  { label: 'Sabab', key: 'reason' }
])
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Safdan chiqarilganlar", to: '/students/removed', active: true }
]

const fetchData = async () => {
  // API orqali filial, guruh, va safdan chiqarilgan o'quvchilarni yuklash
  // Demo uchun mock data:
  deletedStudents.value = [
    {
      id: 1,
      first_name: 'Ali',
      last_name: 'Valiyev',
      branch: { name: 'Markaziy' },
      birth_date: '2005-01-01',
      gender: 'male',
      phone: '+998901234567',
      removalReason: { name: 'To‘lov qilmagan' }
    },
    {
      id: 2,
      first_name: 'Omina',
      last_name: 'Hasanova',
      branch: { name: 'Yunusobod' },
      birth_date: '2006-03-15',
      gender: 'female',
      phone: '+998901112233',
      removalReason: { name: 'Darsga kelmagan' }
    }
  ]
}

onMounted(fetchData)

const debounceSearchByKeyword = debounce(() => {
  // fetchData() or filter logic for search
}, 300)

const sort = (column) => {
  if (sortField.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = column
    sortDirection.value = 'asc'
  }
  // fetchData() yoki local sort
}
const resetFilters = () => {
  selectedBranch.value = ''
  selectedGroup.value = ''
  search.value = ''
  // fetchData()
}
const searchByFilters = () => {
  // fetchData()
}
const confirmRestoreStudent = (student) => {
  // Open restore confirmation modal
}
const confirmForceDelete = (student) => {
  // Open delete confirmation modal
}
const showRestoreModal = ref(false)
const restoreStudent = ref(null)
const openRestoreModal = (student) => {
  restoreStudent.value = student
  showRestoreModal.value = true
}
const confirmRestore = () => {
  // Emit restore event or call API
  confirmRestoreStudent(restoreStudent.value)
  showRestoreModal.value = false
  restoreStudent.value = null
}
</script>

<style scoped>
</style>

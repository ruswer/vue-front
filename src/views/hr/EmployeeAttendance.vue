<template>
  <div class="flex flex-col h-full p-4">
    <Breadcrumb :items="breadcrumbs" />
    <div class="mt-4">
      <EmployeeAttendanceFilters
        v-model="filters"
        :branches="branches"
        :loading="loading"
        @search-staff="searchStaff"
      />
      <EmployeeAttendanceTable
        :sorted-staff-list="sortedStaffList"
        :attendance-data="attendanceData"
        :statuses="statuses"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        :sort-by="sortBy"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Button from '@/components/Button.vue'
import EmployeeAttendanceFilters from '@/components/hr/employeeAttandance/EmployeeAttendanceFilters.vue'
import EmployeeAttendanceTable from '@/components/hr/employeeAttandance/EmployeeAttendanceTable.vue'

const breadcrumbs = [
  { text: 'Bosh sahifa', to: '/' },
  { text: "Kadrlar bo'limi", to: '/hr' },
  { text: 'Xodimlar davomati', to: '/hr/attendance', active: true }
]

const branches = ref([
  { id: 1, name: 'Markaziy filial' },
  { id: 2, name: 'Yunusobod filial' }
])
const filters = ref({ selectedBranchId: '', selectedDate: '' })
const loading = ref(false)

const staffList = ref(null)
const attendanceData = ref({})
const attendanceExistsForDate = ref(false)

const sortField = ref('id')
const sortDirection = ref('asc')

function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const sortedStaffList = computed(() => {
  if (!staffList.value) return []
  let arr = [...staffList.value]
  if (sortField.value === 'id') {
    arr.sort((a, b) => sortDirection.value === 'asc' ? a.id - b.id : b.id - a.id)
  } else if (sortField.value === 'full_name') {
    arr.sort((a, b) => {
      if (a.full_name < b.full_name) return sortDirection.value === 'asc' ? -1 : 1
      if (a.full_name > b.full_name) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return arr
})

const statuses = [
  { value: 'not_working', label: 'Ish kuni emas' },
  { value: 'present', label: 'Ishtirok etdi' },
  { value: 'absent', label: 'Qatnashmadi' }
]

function searchStaff() {
  loading.value = true
  setTimeout(() => {
    staffList.value = [
      { id: 1, full_name: 'Aliyev Anvar' },
      { id: 2, full_name: 'Karimova Nodira' }
    ]
    attendanceData.value = {
      1: { status: 'present', comment: '' },
      2: { status: 'absent', comment: '' }
    }
    attendanceExistsForDate.value = false
    loading.value = false
  }, 1000)
}
</script>

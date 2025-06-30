<template>
  <div class="mx-4 my-6">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />
    <ExamFilterPanel
      :branches="branches"
      :groups="groups"
      :selectedBranch="selectedBranch"
      :selectedGroup="selectedGroup"
      :loading="loading"
      @reset-filters="resetFilters"
      @apply-filters="applyFilters"
    />
    <ExamTablePanel
      :columns="columns"
      :paginatedExams="paginatedExams"
      :sortField="sortField"
      :sortDirection="sortDirection"
      :tableSearch="tableSearch"
      :totalPages="totalPages"
      :currentPage="currentPage"
      :loading="loading"
      :getBranchName="getBranchName"
      :getGroupName="getGroupName"
      @add-exam="showCreateModal = true"
      @sort="sort"
      @mark-exam="openMarkingModal"
      @edit-exam="editExam"
      @delete-exam="deleteExam"
      @reset-filters="resetFilters"
      @change-page="currentPage = $event"
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import ExamFilterPanel from './examlist/ExamFilterPanel.vue'
import ExamTablePanel from './examlist/ExamTablePanel.vue'
const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Imtihonlar', to: '/exams/list', active: true }
]
const branches = ref([
  { id: 1, name: 'Markaziy filial' },
  { id: 2, name: 'Yunusobod filial' },
])
const groups = ref([
  { id: 1, name: 'A guruh' },
  { id: 2, name: 'B guruh' },
])
const exams = ref([
  { id: 1, name: 'Matematika Imtihoni', branch_id: 1, group_id: 1, exam_date: '2025-07-10', exam_time: '10:00', status: 'active' },
  { id: 2, name: 'Fizika Imtihoni', branch_id: 2, group_id: 2, exam_date: '2025-07-15', exam_time: '14:00', status: 'inactive' },
])
const columns = [
  { label: 'Filial', key: 'branch_id' },
  { label: 'Guruh', key: 'group_id' },
  { label: 'Imtihon nomi', key: 'name' },
  { label: 'Imtihon sanasi', key: 'exam_date' },
  { label: 'Imtihon vaqti', key: 'exam_time' },
  { label: 'Holati', key: 'status' },
]
const selectedBranch = ref('')
const selectedGroup = ref('')
const tableSearch = ref('')
const sortField = ref('exam_date')
const sortDirection = ref('desc')
const currentPage = ref(1)
const perPage = 5
const loading = ref(false)
function resetFilters() {
  selectedBranch.value = ''
  selectedGroup.value = ''
  tableSearch.value = ''
  currentPage.value = 1
}
function applyFilters() {
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
const filteredExams = computed(() => {
  let result = exams.value.filter(e => {
    const branchMatch = !selectedBranch.value || e.branch_id == selectedBranch.value
    const groupMatch = !selectedGroup.value || e.group_id == selectedGroup.value
    const searchMatch =
      e.name.toLowerCase().includes(tableSearch.value.toLowerCase()) ||
      getBranchName(e.branch_id).toLowerCase().includes(tableSearch.value.toLowerCase()) ||
      getGroupName(e.group_id).toLowerCase().includes(tableSearch.value.toLowerCase())
    return branchMatch && groupMatch && searchMatch
  })
  if (sortField.value) {
    result = result.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return sortDirection.value === 'asc' ? -1 : 1
      if (a[sortField.value] > b[sortField.value]) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  return result
})
const totalPages = computed(() => Math.ceil(filteredExams.value.length / perPage))
const paginatedExams = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredExams.value.slice(start, start + perPage)
})
function getBranchName(id) {
  const b = branches.value.find(x => x.id === id)
  return b ? b.name : '-'
}
function getGroupName(id) {
  const g = groups.value.find(x => x.id === id)
  return g ? g.name : '-'
}
function formatDate(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('uz-UZ')
}
function editExam(exam) {
  // Modal logic removed
}
function deleteExam(id) {
  exams.value = exams.value.filter(e => e.id !== id)
}
function openMarkingModal(exam) {
  // Modal logic removed
}
</script>
<style scoped>
</style>

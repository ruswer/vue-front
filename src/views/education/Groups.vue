<template>
  <div class="flex flex-col h-full mx-4 my-6">
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />

    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
      <GroupForm
        :group-to-edit="groupToEdit"
        :is-saving="isSaving"
        :branches="staticData.branches"
        :courses="staticData.courses"
        :knowledge-levels="staticData.knowledgeLevels"
        :teachers="staticData.teachers"
        :salary-types="staticData.salaryTypes"
        :tariff-periods="staticData.tariffPeriods"
        :lesson-day-options="staticData.lessonDayOptions"
        @save="saveGroup"
        @cancel="cancelEdit"
      />

      <GroupList
        :groups="displayedGroups"
        :teachers="staticData.teachers"
        :selected-status="tableState.selectedStatus"
        :sort-field="tableState.sortField"
        :sort-direction="tableState.sortDirection"
        :current-page="pagination.currentPage"
        :per-page="pagination.perPage"
        :total-items="filteredGroups.length"
        @update:selectedStatus="updateStatus"
        @update:sortField="updateSort"
        @update:currentPage="updateCurrentPage"
        @edit="editGroup"
        @delete="deleteGroup"
        @restore="restoreGroup"
        @force-delete="forceDeleteGroup"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import GroupForm from '@/components/education/groups/GroupForm.vue';
import GroupList from '@/components/education/groups/GroupList.vue';

// --- STATIC DATA ---
const staticData = {
  breadcrumbItems: [
    { text: 'Bosh sahifa', to: '/' },
    { text: "Ta'lim", to: '#' },
    { text: "Guruhlar", to: '/education/groups', active: true }
  ],
  branches: [
      { id: 1, name: 'Markaziy filial' },
      { id: 2, name: 'Yunusobod filial' },
  ],
  courses: [
      { id: 1, name: 'Frontend Dasturlash' },
      { id: 2, name: 'Backend Dasturlash' },
      { id: 3, name: 'Grafik Dizayn' },
  ],
  knowledgeLevels: [
      { id: 1, name: 'Beginner' },
      { id: 2, name: 'Intermediate' },
      { id: 3, name: 'Advanced' },
  ],
  teachers: [
      { id: 1, fullName: 'Ali Valiyev' },
      { id: 2, fullName: 'Nodira Qosimova' },
      { id: 3, fullName: 'Rustam Karimov' },
  ],
  salaryTypes: [
      { id: 'percentage', name: 'Foizda' },
      { id: 'fixed', name: 'Fiksirlangan' },
  ],
  tariffPeriods: [
      { id: 1, name: '1 oy' },
      { id: 3, name: '3 oy' },
      { id: 6, name: '6 oy' },
  ],
  lessonDayOptions: [
      { id: 'monday', label: 'Dushanba' },
      { id: 'tuesday', label: 'Seshanba' },
      { id: 'wednesday', label: 'Chorshanba' },
      { id: 'thursday', label: 'Payshanba' },
      { id: 'friday', label: 'Juma' },
      { id: 'saturday', label: 'Shanba' },
  ],
};

const breadcrumbItems = ref(staticData.breadcrumbItems);

// --- MAIN DATA STORE ---
const allGroups = ref([
    { id: 1, name: 'Frontend #1', teacher_id: 1, students_count: 15, status: 'active', branch_id: 1, course_id: 1, knowledge_level_id: 2, teacher_salary_type: 'percentage', teacher_salary_amount: 50, price_period_months: 1, lesson_days: ['monday', 'wednesday', 'friday'], total_price: 1000000, lessons_count: 12, price_per_lesson: 83333, lesson_start_time: '14:00', lesson_end_time: '16:00' },
    { id: 2, name: 'Backend #3', teacher_id: 2, students_count: 12, status: 'active', branch_id: 2, course_id: 2, knowledge_level_id: 3, teacher_salary_type: 'fixed', teacher_salary_amount: 4000000, price_period_months: 3, lesson_days: ['tuesday', 'thursday'], total_price: 1200000, lessons_count: 16, price_per_lesson: 75000, lesson_start_time: '18:00', lesson_end_time: '20:00' },
    { id: 3, name: 'Grafik Dizayn #5', teacher_id: 3, students_count: 18, status: 'waiting', branch_id: 1, course_id: 3, knowledge_level_id: 1, teacher_salary_type: 'percentage', teacher_salary_amount: 40, price_period_months: 1, lesson_days: ['saturday'], total_price: 800000, lessons_count: 8, price_per_lesson: 100000, lesson_start_time: '10:00', lesson_end_time: '13:00' },
    { id: 4, name: 'SMM Pro', teacher_id: 2, students_count: 20, status: 'active', branch_id: 2, course_id: 1, knowledge_level_id: 2, teacher_salary_type: 'fixed', teacher_salary_amount: 5000000, price_period_months: 6, lesson_days: ['monday', 'friday'], total_price: 1500000, lessons_count: 24, price_per_lesson: 62500, lesson_start_time: '09:00', lesson_end_time: '11:00' },
    { id: 5, name: 'Python #2', teacher_id: 1, students_count: 0, status: 'deleted', branch_id: 1, course_id: 2, knowledge_level_id: 1, teacher_salary_type: 'percentage', teacher_salary_amount: 60, price_period_months: 1, lesson_days: ['tuesday', 'thursday', 'saturday'], total_price: 900000, lessons_count: 12, price_per_lesson: 75000, lesson_start_time: '16:00', lesson_end_time: '18:00' },
]);

// --- FORM STATE ---
const isSaving = ref(false);
const groupToEdit = ref(null);

// --- TABLE STATE ---
const tableState = reactive({
  selectedStatus: 'active',
  sortField: 'name',
  sortDirection: 'asc',
});

// --- PAGINATION STATE ---
const pagination = reactive({
  currentPage: 1,
  perPage: 5,
});

// --- COMPUTED PROPERTIES ---
const filteredGroups = computed(() => {
  return allGroups.value.filter(group => group.status === tableState.selectedStatus);
});

const displayedGroups = computed(() => {
    const sorted = [...filteredGroups.value].sort((a, b) => {
        let aValue = a[tableState.sortField];
        let bValue = b[tableState.sortField];

        if (tableState.sortField === 'teacher_id') {
            aValue = staticData.teachers.find(t => t.id === a.teacher_id)?.fullName || '';
            bValue = staticData.teachers.find(t => t.id === b.teacher_id)?.fullName || '';
        }

        if (aValue < bValue) return tableState.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return tableState.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const start = (pagination.currentPage - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    return sorted.slice(start, end);
});

// --- METHODS ---
function saveGroup(formValue) {
  isSaving.value = true;
  setTimeout(() => {
    if (groupToEdit.value) {
      const index = allGroups.value.findIndex(g => g.id === groupToEdit.value.id);
      if (index !== -1) {
        allGroups.value[index] = { ...allGroups.value[index], ...formValue };
      }
    } else {
      const newGroup = {
        id: Date.now(),
        ...formValue,
        students_count: 0,
      };
      allGroups.value.push(newGroup);
    }
    cancelEdit();
    isSaving.value = false;
  }, 500);
}

function editGroup(group) {
    groupToEdit.value = group;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
    groupToEdit.value = null;
}

function deleteGroup(groupId) {
    if (confirm("Haqiqatan ham bu guruhni o'chirmoqchimisiz (arxivlamoqchimisiz)?")) {
        const index = allGroups.value.findIndex(g => g.id === groupId);
        if (index !== -1) {
            allGroups.value[index].status = 'deleted';
        }
    }
}

function restoreGroup(groupId) {
    const index = allGroups.value.findIndex(g => g.id === groupId);
    if (index !== -1) {
        allGroups.value[index].status = 'active';
    }
}

function forceDeleteGroup(groupId) {
    if (confirm("Haqiqatan ham bu guruhni butunlay o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi!")) {
        allGroups.value = allGroups.value.filter(g => g.id !== groupId);
    }
}

function updateStatus(status) {
  tableState.selectedStatus = status;
  pagination.currentPage = 1;
}

function updateSort(field) {
    if (tableState.sortField === field) {
        tableState.sortDirection = tableState.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        tableState.sortField = field;
        tableState.sortDirection = 'asc';
    }
}

function updateCurrentPage(page) {
    pagination.currentPage = page;
}
</script>

<style>
/* Global styles if needed, or scoped styles in child components */
</style>

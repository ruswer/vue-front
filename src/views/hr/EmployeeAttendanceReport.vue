<template>
  <div class="flex flex-col h-full p-4">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbs" />
    <div class="mt-4">
      <!-- Filter Section -->
      <EmployeeAttendanceReportFilter
        v-model:filters="filters"
        :branches="branches"
        :months="months"
        :years="years"
        :loading="loading"
        @generate="generateReport"
      />

      <!-- Report Table -->
      <EmployeeAttendanceReportTable
        :paginated-data="paginatedData"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        :selected-month="filters.month"
        :selected-year="filters.year"
        :months="months"
        v-model:search="search"
        :current-page="currentPage"
        :total-pages="totalPages"
        @sort="sortBy"
        @view-absent-dates="viewAbsentDates"
        @update:current-page="currentPage = $event"
      />

      <!-- Absent Dates Modal -->
      <AbsentDatesModal
        :show="showAbsentDatesModal"
        :staff="staffForModal"
        :absent-dates="absentDatesForModal"
        :selected-month="filters.month"
        :selected-year="filters.year"
        :months="months"
        @close="showAbsentDatesModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import EmployeeAttendanceReportFilter from '../../components/hr/employeeattandancereport/EmployeeAttendanceReportFilter.vue';
import EmployeeAttendanceReportTable from '../../components/hr/employeeattandancereport/EmployeeAttendanceReportTable.vue';
import AbsentDatesModal from '../../components/hr/employeeattandancereport/AbsentDatesModal.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: "Kadrlar bo'limi" },
  { text: 'Xodimlar davomati hisoboti', to: '/hr/attendance-report', active: true }
]);

// --- Reactive State ---
const filters = ref({
  branch: '',
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
});
const search = ref('');
const loading = ref(false);
const reportData = ref([]);
const sortField = ref('id');
const sortDirection = ref('asc');
const showAbsentDatesModal = ref(false);
const staffForModal = ref(null);
const absentDatesForModal = ref([]);

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);


// --- Static Data (for demonstration) ---
const branches = ref([
  { id: 1, name: 'Bosh ofis' },
  { id: 2, name: 'Chilonzor filiali' },
  { id: 3, name: 'Yunusobod filiali' },
]);

const months = ref({
  1: 'Yanvar', 2: 'Fevral', 3: 'Mart', 4: 'Aprel', 5: 'May', 6: 'Iyun',
  7: 'Iyul', 8: 'Avgust', 9: 'Sentyabr', 10: 'Oktyabr', 11: 'Noyabr', 12: 'Dekabr'
});

const years = ref([2024, 2023, 2022]);

const allEmployees = ref([
    { id: 1, full_name: 'Ali Valiyev', department_name: 'Dasturlash', present_count: 20, absent_count: 2, absent_dates: [{date: '2024-07-15', comment: 'Kasallik'}, {date: '2024-07-16', comment: 'Sababsiz'}] },
    { id: 2, full_name: 'Hasan Normurodov', department_name: 'Marketing', present_count: 22, absent_count: 0, absent_dates: [] },
    { id: 3, full_name: 'Olim Qosimov', department_name: 'Dizayn', present_count: 18, absent_count: 4, absent_dates: [{date: '2024-07-10', comment: 'Shaxsiy ish'}, {date: '2024-07-11', comment: 'Shaxsiy ish'}, {date: '2024-07-20', comment: 'Sababsiz'}, {date: '2024-07-21', comment: 'Sababsiz'}] },
    { id: 4, full_name: 'Zarina Abdullayeva', department_name: 'Dasturlash', present_count: 21, absent_count: 1, absent_dates: [{date: '2024-07-05', comment: 'Kasal'}] },
]);


// --- Computed Properties ---
const filteredData = computed(() => {
  let data = [...reportData.value];

  // Search filter
  if (search.value) {
    data = data.filter(record =>
      record.full_name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Sort
  data.sort((a, b) => {
    const fieldA = a[sortField.value];
    const fieldB = b[sortField.value];
    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });

  return data;
});

const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / pageSize.value);
});

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredData.value.slice(start, end);
});


// --- Methods ---
const generateReport = () => {
  loading.value = true;
  // Simulate API call
  setTimeout(() => {
    reportData.value = allEmployees.value.filter(emp => {
        // Dummy filter logic
        return filters.value.branch ? emp.id % (parseInt(filters.value.branch) + 1) === 0 : true;
    });
    loading.value = false;
    currentPage.value = 1; // Reset to first page
  }, 1500);
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

const viewAbsentDates = (staff) => {
  staffForModal.value = staff;
  absentDatesForModal.value = staff.absent_dates || [];
  showAbsentDatesModal.value = true;
};

// Initial report generation on component mount
generateReport();

</script>
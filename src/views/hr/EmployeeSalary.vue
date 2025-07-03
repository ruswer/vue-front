<template>
  <div class="flex flex-col h-full p-4">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbs" />
    <div class="mt-4">
      <!-- Filter Section -->
      <EmployeeSalaryFilter
        v-model:filters="filters"
        :branches="branches"
        :months="months"
        :years="years"
        :loading="loading"
        @generate="generateReport"
      />

      <!-- Report Table -->
      <EmployeeSalaryTable
        :paginated-data="paginatedData"
        :sort-field="sortField"
        :sort-direction="sortDirection"
        v-model:search="search"
        :current-page="currentPage"
        :total-pages="totalPages"
        :selected-month="filters.month"
        :selected-year="filters.year"
        :months="months"
        @sort="sortBy"
        @update:current-page="currentPage = $event"
        @update:salary="updateSalary"
        @save-salary="saveSalary"
        @open-payment-modal="openPaymentModal"
      />

      <!-- Payment Modal -->
      <PaymentModal
        :show="showPaymentModal"
        :staff-for-payment="staffForPayment"
        @close="showPaymentModal = false"
        @save-payment="savePayment"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Breadcrumb from '../../components/Breadcrumb.vue';
import EmployeeSalaryFilter from '../../components/hr/employeesalary/EmployeeSalaryFilter.vue';
import EmployeeSalaryTable from '../../components/hr/employeesalary/EmployeeSalaryTable.vue';
import PaymentModal from '../../components/hr/employeesalary/PaymentModal.vue';

const breadcrumbs = ref([
  { text: 'Bosh sahifa', to: '/' },
  { text: "Kadrlar bo'limi" },
  { text: 'Xodimlar ish haqi', to: '/hr/salary', active: true }
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
const sortField = ref('full_name');
const sortDirection = ref('asc');
const showPaymentModal = ref(false);
const staffForPayment = ref(null);

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
  1: 'Yanvar', 2: 'Fevral', 3: 'Mart', 4: 'Aprel', 5: 'May',
});

const years = ref([2024, 2023, 2022]);

const allEmployees = ref([
    { id: 1, full_name: 'Ali Valiyev', department_name: 'Dasturlash', final_salary: 5000000, total_paid: 2000000, debt: 3000000 },
    { id: 2, full_name: 'Hasan Normurodov', department_name: 'Marketing', final_salary: 6000000, total_paid: 6000000, debt: 0 },
    { id: 3, full_name: 'Olim Qosimov', department_name: 'Dizayn', final_salary: 4500000, total_paid: 4000000, debt: 500000 },
    { id: 4, full_name: 'Zarina Abdullayeva', department_name: 'Dasturlash', final_salary: 5500000, total_paid: 5500000, debt: 0 },
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
    let fieldA = a[sortField.value];
    let fieldB = b[sortField.value];

    // Handle debt sorting
    if (sortField.value === 'debt') {
        fieldA = (a.final_salary || 0) - (a.total_paid || 0);
        fieldB = (b.final_salary || 0) - (b.total_paid || 0);
    }

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });

  return data.map(item => ({...item, debt: (item.final_salary || 0) - (item.total_paid || 0)}));
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

const updateSalary = ({ id, value }) => {
    const employee = reportData.value.find(emp => emp.id === id);
    if (employee) {
        employee.final_salary = parseFloat(value) || 0;
    }
};

const saveSalary = (id) => {
    const employee = reportData.value.find(emp => emp.id === id);
    console.log(`Saving salary for ${employee.full_name}: ${employee.final_salary}`);
    // Here you would typically make an API call to save the data
};

const openPaymentModal = (staff) => {
    staffForPayment.value = staff;
    showPaymentModal.value = true;
};

const savePayment = (payment) => {
    console.log('Saving payment:', payment);
    const employee = reportData.value.find(emp => emp.id === payment.staff_id);
    if (employee) {
        employee.total_paid += parseFloat(payment.amount);
    }
    showPaymentModal.value = false;
    // Here you would typically make an API call to save the payment
};


// Initial report generation on component mount
generateReport();

</script>
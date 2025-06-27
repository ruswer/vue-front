<template>
  <div class="flex flex-col h-full mt-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-4 mx-4" />
    <!-- Header Section -->
    <div class="flex-1 bg-white rounded-md shadow-sm mx-4">
      <div class="flex items-center justify-between p-4">
        <!-- Left: Import Button -->
        <div class="flex items-center">
          <a
            href="/admin/import-students"
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            O'quvchi Import qilish
          </a>
        </div>
        <!-- Right: Add Student Button -->
        <div>
          <router-link
            to="/students/add"
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            O'quvchi qo'shish
          </router-link>
        </div>
      </div>
      <!-- Search Section -->
      <StudentFilter
        :selectedBranch="selectedBranch"
        :selectedGroup="selectedGroup"
        :search="search"
        :branches="branches"
        :groups="groups"
        @update:selectedBranch="val => selectedBranch = val"
        @update:selectedGroup="val => selectedGroup = val"
        @update:search="val => search = val"
        @searchByFilters="searchByFilters"
        @searchByKeyword="searchByKeyword"
        @debounceSearchByKeyword="debounceSearchByKeyword"
      />
    </div>
    <!-- Content Section -->
    <div class="flex-1 mt-4 bg-white rounded-md shadow-sm p-4 mx-4">
      <!-- Table Responsive Wrapper -->
      <div class="overflow-x-auto bg-white">
        <StudentTable
          :students="students"
          :columns="columns"
          :sortField="sortField"
          :sortDirection="sortDirection"
          :isLoading="isLoading"
          @sort="sort"
          @editStudent="editStudent"
          @showStudentProfile="showStudentProfile"
          @openRemoveStudentModal="openRemoveStudentModal"
          :isFilterActive="isFilterActive"
          :isSearchActive="isSearchActive"
          @resetFilters="resetFilters"
        />
        <!-- Remove Student Modal -->
        <StudentRemoveModal
          :show="showRemoveStudentModal"
          :studentName="studentToRemoveName"
          :removalReasonId="removalReasonId"
          :removalReasonError="removalReasonError"
          :removalReasonsOptions="removalReasonsOptions"
          :isRemoving="isRemoving"
          @close="showRemoveStudentModal = false"
          @remove="removeStudent"
          @update:removalReasonId="val => removalReasonId = val"
        />
        <!-- Pagination -->
        <Pagination
          v-if="pagination.total > pagination.per_page"
          :pagination="pagination"
          :isLoading="isLoading"
          @previousPage="previousPage"
          @nextPage="nextPage"
          @gotoPage="gotoPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { debounce } from 'lodash';
import axios from 'axios';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Form from '@/components/Form.vue';
import StudentFilter from '@/components/students/StudentFilter.vue';
import StudentTable from '@/components/students/StudentTable.vue';
import StudentRemoveModal from '@/components/students/StudentRemoveModal.vue';
import Pagination from '@/components/students/Pagination.vue';

export default {
  name: 'Students',
  components: { Breadcrumb, Form, StudentFilter, StudentTable, StudentRemoveModal, Pagination },
  setup() {
    // Reactive state
    const selectedBranch = ref('');
    const selectedGroup = ref('');
    const search = ref('');
    const students = ref([]);
    const branches = ref([]);
    const groups = ref([]);
    const sortField = ref('name');
    const sortDirection = ref('asc');
    const showRemoveStudentModal = ref(false);
    const studentToRemoveId = ref(null);
    const studentToRemoveName = ref('');
    const removalReasonId = ref('');
    const removalReasonError = ref('');
    const removalReasonsOptions = ref({});
    const isRemoving = ref(false);
    const isLoading = ref(false);
    const pagination = ref({
      current_page: 1,
      per_page: 10,
      total: 0,
      from: 0,
      to: 0,
      onFirstPage: true,
      hasMorePages: false,
      pages: []
    });

    // Computed properties
    const isFilterActive = computed(() => !!selectedBranch.value || !!selectedGroup.value);
    const isSearchActive = computed(() => !!search.value);
    const columns = ref({
      name: "O'quvchi Ismi",
      branch: 'Filial',
      status: 'Holati',
      course: 'Kurs',
      group: 'Guruh',
      phone: 'Tel.raqami',
      language: 'Til',
      level: 'Darajasi',
      study_days: 'Dars kunlari'
    });

    // Methods
    const fetchData = async () => {
      isLoading.value = true;
      try {
        const params = {
          branch: selectedBranch.value,
          group: selectedGroup.value,
          search: search.value,
          sort_field: sortField.value,
          sort_direction: sortDirection.value,
          page: pagination.value.current_page,
          per_page: pagination.value.per_page
        };
        const response = await axios.get('/api/students', { params });
        students.value = response.data.data;
        pagination.value = {
          current_page: response.data.current_page,
          per_page: response.data.per_page,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to,
          onFirstPage: response.data.current_page === 1,
          hasMorePages: response.data.current_page < response.data.last_page,
          pages: Array.from({ length: response.data.last_page }, (_, i) => i + 1)
        };
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await axios.get('/api/branches');
        branches.value = response.data;
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/groups');
        groups.value = response.data;
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    const fetchRemovalReasons = async () => {
      try {
        const response = await axios.get('/api/removal-reasons');
        removalReasonsOptions.value = response.data;
      } catch (error) {
        console.error('Error fetching removal reasons:', error);
      }
    };

    const searchByFilters = () => {
      pagination.value.current_page = 1;
      fetchData();
    };

    const searchByKeyword = () => {
      pagination.value.current_page = 1;
      fetchData();
    };

    const debounceSearchByKeyword = debounce(searchByKeyword, 300);

    const sort = (column) => {
      if (sortField.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortField.value = column;
        sortDirection.value = 'asc';
      }
      fetchData();
    };

    const showStudentProfile = (studentId) => {
      // Navigate to student profile (e.g., using Vue Router)
      console.log('Show profile for student:', studentId);
      // Example: router.push(`/admin/students/${studentId}`);
    };

    const editStudent = (studentId) => {
      // Navigate to edit student page
      console.log('Edit student:', studentId);
      // Example: router.push(`/admin/edit-student/${studentId}`);
    };

    const openRemoveStudentModal = (studentId, studentName) => {
      studentToRemoveId.value = studentId;
      studentToRemoveName.value = studentName;
      removalReasonId.value = '';
      removalReasonError.value = '';
      showRemoveStudentModal.value = true;
    };

    const removeStudent = async () => {
      if (!removalReasonId.value) {
        removalReasonError.value = 'Iltimos, safdan chiqarish sababini tanlang.';
        return;
      }
      isRemoving.value = true;
      try {
        await axios.delete(`/api/students/${studentToRemoveId.value}`, {
          data: { removal_reason_id: removalReasonId.value }
        });
        showRemoveStudentModal.value = false;
        fetchData();
      } catch (error) {
        console.error('Error removing student:', error);
        removalReasonError.value = 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring.';
      } finally {
        isRemoving.value = false;
      }
    };

    const resetFilters = () => {
      selectedBranch.value = '';
      selectedGroup.value = '';
      search.value = '';
      pagination.value.current_page = 1;
      fetchData();
    };

    const previousPage = () => {
      if (!pagination.value.onFirstPage) {
        pagination.value.current_page--;
        fetchData();
      }
    };

    const nextPage = () => {
      if (pagination.value.hasMorePages) {
        pagination.value.current_page++;
        fetchData();
      }
    };

    const gotoPage = (page) => {
      pagination.value.current_page = page;
      fetchData();
    };

    // Initialize data
    fetchBranches();
    fetchGroups();
    fetchRemovalReasons();
    fetchData();

    const breadcrumbItems = [
      { text: 'Bosh sahifa', to: '/' },
      { text: "O'quvchilar", to: '/students/list', active: true }
    ];

    return {
      selectedBranch,
      selectedGroup,
      search,
      students,
      branches,
      groups,
      sortField,
      sortDirection,
      showRemoveStudentModal,
      studentToRemoveName,
      removalReasonId,
      removalReasonError,
      removalReasonsOptions,
      isRemoving,
      isLoading,
      pagination,
      columns,
      isFilterActive,
      isSearchActive,
      searchByFilters,
      searchByKeyword,
      debounceSearchByKeyword,
      sort,
      showStudentProfile,
      editStudent,
      openRemoveStudentModal,
      removeStudent,
      resetFilters,
      previousPage,
      nextPage,
      gotoPage,
      breadcrumbItems
    };
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

<!-- This file has been renamed to StudentList.vue. You can safely remove this file. -->
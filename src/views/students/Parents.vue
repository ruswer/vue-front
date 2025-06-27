<template>
  <div class="flex flex-col h-full mt-6">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-4 mx-4" />

    <!-- Filter Section -->
    <div class="mx-4">
      <ParentFilter
        :selectedBranch="selectedBranch"
        :selectedGroup="selectedGroup"
        :search="search"
        :branches="branches"
        :groups="groups"
        @update:selectedBranch="val => selectedBranch = val"
        @update:selectedGroup="val => selectedGroup = val"
        @searchByFilters="searchByFilters"
      />
    </div>

    <!-- Content Section -->
    <div class="flex-1 mt-4 bg-white rounded-md shadow-sm p-4 mx-4">
        <!-- Search Input -->
        <div class="mb-4">
            <input
                type="text"
                v-model="search"
                @input="debounceSearchByKeyword"
                placeholder="O'quvchi yoki ota-ona..."
                class="block w-full md:w-1/3 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
        </div>
      <!-- Table Responsive Wrapper -->
      <div class="overflow-x-auto bg-white">
        <ParentTable
          :parents="parents"
          :columns="columns"
          :sortField="sortField"
          :sortDirection="sortDirection"
          :isLoading="isLoading"
          :isFilterActive="isFilterActive"
          :isSearchActive="isSearchActive"
          @sort="sort"
          @resetFilters="resetFilters"
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
import ParentFilter from '@/components/parents/ParentFilter.vue';
import ParentTable from '@/components/parents/ParentTable.vue';
import Pagination from '@/components/students/Pagination.vue';

export default {
  name: 'Parents',
  components: { Breadcrumb, ParentFilter, ParentTable, Pagination },
  setup() {
    // Reactive state
    const selectedBranch = ref('');
    const selectedGroup = ref('');
    const search = ref('');
    const parents = ref([]);
    const branches = ref([]);
    const groups = ref([]);
    const sortField = ref('student_name');
    const sortDirection = ref('asc');
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
      student_name: "O'quvchi ismi",
      student_phone: "Tel. raqami",
      parent_name: "Ota-ona ismi",
      parent_phone: "Ota-ona telefoni",
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
        // NOTE: Replace with your actual API endpoint for parents
        const response = await axios.get('/api/parents', { params }); 
        parents.value = response.data.data;
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
        console.error('Error fetching parents:', error);
        // Mock data for demonstration if API fails
        parents.value = [
            {id: 1, student_name: 'Ali Valiyev', student_phone: '+998901234567', parent_name: 'Vali Aliyev', parent_phone: '+998907654321'},
            {id: 2, student_name: 'Omina Hasanova', student_phone: '+998912345678', parent_name: 'Hasan Olimov', parent_phone: '+998918765432'}
        ];
        pagination.value.total = 2;

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
    fetchData();

    const breadcrumbItems = [
      { text: 'Bosh sahifa', to: '/' },
      { text: "Ota-onalar", to: '/students/parents', active: true }
    ];

    return {
      selectedBranch,
      selectedGroup,
      search,
      parents,
      branches,
      groups,
      sortField,
      sortDirection,
      isLoading,
      pagination,
      columns,
      isFilterActive,
      isSearchActive,
      searchByFilters,
      debounceSearchByKeyword,
      sort,
      resetFilters,
      previousPage,
      nextPage,
      gotoPage,
      breadcrumbItems
    };
  }
};
</script>

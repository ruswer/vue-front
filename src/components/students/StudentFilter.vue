<template>
  <div class="flex flex-col lg:flex-row bg-white p-4 rounded-md gap-4">
    <!-- Chap tomon: Filial va guruh filterlari -->
    <div class="w-full lg:w-1/2">
      <Form
        :form-class="'w-full'"
        :body-class="bodyClass"
        @submit="$emit('searchByFilters')"
      >
        <template #default>
          <div class="flex flex-wrap lg:flex-nowrap gap-4 w-full">
            <!-- Filial select -->
            <div class="w-full sm:w-1/2 lg:flex-1">
              <Form
                :select-props="{
                  label: 'Filial',
                  name: 'branch',
                  value: selectedBranchLocal,
                  options: [{ value: '', label: 'Barcha filiallar' }, ...branches.map(branch => ({ value: branch.id, label: branch.name }))],
                  class: 'mt-1 block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all duration-150'
                }"
                @update:modelValue="selectedBranchLocal = $event; $emit('update:selectedBranch', $event)"
              />
            </div>
            <!-- Guruh select -->
            <div class="w-full sm:w-1/2 lg:flex-1">
              <Form
                :select-props="{
                  label: 'Guruh',
                  name: 'group',
                  value: selectedGroupLocal,
                  options: [{ value: '', label: 'Barcha guruhlar' }, ...groups.map(group => ({ value: group.id, label: group.name }))],
                  class: 'mt-1 block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all duration-150'
                }"
                @update:modelValue="selectedGroupLocal = $event; $emit('update:selectedGroup', $event)"
              />
            </div>
          </div>
        </template>
        <template #actions>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Qidirish
          </button>
        </template>
      </Form>
    </div>

    <!-- O‘ng tomon: Kalit so‘z bo‘yicha qidirish -->
    <div class="w-full lg:w-1/2 flex flex-col items-end justify-end">
      <Form
        :form-class="'w-full'"
        :body-class="'w-full'"
      >
        <template #default>
          <div class="flex flex-col gap-2 w-full">
            <Form
              :input-props="{
                label: 'Kalit so‘z bo‘yicha izlash',
                name: 'student-name',
                type: 'text',
                value: searchLocal,
                placeholder: 'Ism, telefon yoki ID kiriting',
                class: 'mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              }"
              @update:modelValue="searchLocal = $event; $emit('update:search', $event); $emit('debounceSearchByKeyword')"
            />
          </div>
        </template>
        <template #actions>
          <button
            @click="$emit('searchByKeyword')"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <svg class="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Qidirish
          </button>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  name: 'StudentFilter',
  components: { Form },
  props: {
    selectedBranch: String,
    selectedGroup: String,
    search: String,
    branches: Array,
    groups: Array
  },
  emits: ['update:selectedBranch', 'update:selectedGroup', 'update:search', 'searchByFilters', 'searchByKeyword', 'debounceSearchByKeyword'],
  data() {
    return {
      selectedBranchLocal: this.selectedBranch,
      selectedGroupLocal: this.selectedGroup,
      searchLocal: this.search,
      formClass: 'flex-1 flex flex-col gap-2 w-full bg-white p-0 rounded-none',
      bodyClass: 'flex flex-wrap lg:flex-nowrap gap-4 w-full',
      searchFormClass: 'flex-1 flex flex-col gap-2 w-full lg:w-[30%] lg:min-w-[220px]',
      searchBodyClass: 'flex flex-col gap-2'
    };
  },
  watch: {
    selectedBranch(val) {
      this.selectedBranchLocal = val;
    },
    selectedGroup(val) {
      this.selectedGroupLocal = val;
    },
    search(val) {
      this.searchLocal = val;
    }
  }
};
</script>

<style scoped>
select, input {
  background: #f9fafb;
}
</style>

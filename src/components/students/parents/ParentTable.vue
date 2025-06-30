<template>
  <div class="overflow-x-auto bg-white">
    <table class="min-w-full text-left text-sm whitespace-nowrap">
      <thead class="uppercase tracking-wider border-b-2 text-gray-800 bg-gray-100">
        <tr>
          <th v-for="(label, column) in columns" :key="column" class="p-px">
            <div class="px-6 py-4 hover:bg-gray-100 cursor-pointer select-none" @click="$emit('sort', column)">
              {{ label }}
              <svg
                class="w-[0.75rem] h-[0.75rem] inline ml-1 text-neutral-500 mb-[1px]"
                :class="{ 'rotate-180': sortField === column && sortDirection === 'asc' }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128z" />
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!parents.length && !isLoading">
          <td :colspan="Object.keys(columns).length">
            <slot name="empty">
              <div class="text-center p-4">
                Ma'lumotlar topilmadi.
                <button
                  v-if="isFilterActive || isSearchActive"
                  @click="$emit('resetFilters')"
                  class="text-blue-500 hover:underline ml-2"
                >
                  Filtrlarni tiklash
                </button>
              </div>
            </slot>
          </td>
        </tr>
        <tr v-else-if="isLoading">
          <td :colspan="Object.keys(columns).length" class="text-center p-4">
            Yuklanmoqda...
          </td>
        </tr>
        <tr v-else v-for="parent in parents" :key="parent.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4">
            <a
              href="#"
              class="text-blue-600 hover:text-blue-900 hover:underline cursor-pointer"
              @click.prevent="$emit('show-student', parent.id)"
            >
              {{ parent.student_name }}
            </a>
          </td>
          <td class="px-6 py-4">{{ parent.student_phone }}</td>
          <td class="px-6 py-4">{{ parent.parent_name }}</td>
          <td class="px-6 py-4">{{ parent.parent_phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ParentTable',
  props: {
    parents: Array,
    columns: Object,
    sortField: String,
    sortDirection: String,
    isLoading: Boolean,
    isFilterActive: Boolean,
    isSearchActive: Boolean,
  },
  emits: [
    'sort',
    'resetFilters',
    'show-student',
  ],
};
</script>
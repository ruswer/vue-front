<template>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto text-sm text-left">
      <thead class="bg-gray-100 text-gray-700 font-semibold">
        <tr>
          <th
            v-for="(label, key) in columns"
            :key="key"
            class="p-2 border-b border-gray-300 cursor-pointer"
            @click="$emit('sort', key)"
          >
            {{ label }}
            <span v-if="sortField === key">
              {{ sortDirection === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td :colspan="Object.keys(columns).length" class="text-center p-4">
            Yuklanmoqda...
          </td>
        </tr>
        <tr v-else-if="parents.length === 0">
          <td :colspan="Object.keys(columns).length" class="text-center p-4">
            Ma'lumotlar topilmadi.
            <button
              v-if="isFilterActive || isSearchActive"
              @click="$emit('resetFilters')"
              class="text-blue-500 hover:underline ml-2"
            >
              Filtrlarni tiklash
            </button>
          </td>
        </tr>
        <tr v-else v-for="parent in parents" :key="parent.id" class="hover:bg-gray-50">
          <td class="p-2 border-b">{{ parent.student_name }}</td>
          <td class="p-2 border-b">{{ parent.student_phone }}</td>
          <td class="p-2 border-b">{{ parent.parent_name }}</td>
          <td class="p-2 border-b">{{ parent.parent_phone }}</td>
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
  emits: ['sort', 'resetFilters'],
};
</script>
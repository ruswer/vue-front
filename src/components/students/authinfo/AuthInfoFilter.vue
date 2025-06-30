<template>
  <div class="bg-white p-4 rounded-md shadow mb-6">
    <h2 class="text-lg font-semibold mb-4">Tanlash</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <!-- Branch Filter -->
      <div>
        <label for="branch" class="block text-sm font-medium text-gray-700">Filial</label>
        <select
          id="branch"
          :value="selectedBranch"
          @change="$emit('update:selectedBranch', $event.target.value)"
          class="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <option value="">Barcha filiallar</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">
            {{ branch.name }}
          </option>
        </select>
      </div>
      <!-- Group Filter -->
      <div>
        <label for="group" class="block text-sm font-medium text-gray-700">Guruh</label>
        <select
          id="group"
          :value="selectedGroup"
          @change="$emit('update:selectedGroup', $event.target.value)"
          class="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <option value="">Barcha guruhlar</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        @click="$emit('searchByFilters')"
        class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Qidirish
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthInfoFilter',
  props: {
    selectedBranch: [String, Number],
    selectedGroup: [String, Number],
    branches: Array,
    groups: Array,
  },
  emits: ['update:selectedBranch', 'update:selectedGroup', 'searchByFilters'],
};
</script>

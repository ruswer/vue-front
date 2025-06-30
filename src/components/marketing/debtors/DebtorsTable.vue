<template>
  <div class="overflow-x-auto bg-white">
    <table class="min-w-full text-left text-sm whitespace-nowrap">
      <thead class="uppercase tracking-wider border-b-2 text-gray-800 bg-gray-100">
        <tr>
          <th v-for="(label, column) in columns" :key="column" class="p-px">
            <div class="px-6 py-4 hover:bg-gray-100 cursor-pointer select-none flex items-center gap-1" @click="$emit('sort', column)">
              <span>{{ label }}</span>
              <svg
                class="w-[0.75rem] h-[0.75rem] inline ml-1 text-neutral-500 mb-[1px] transition-transform duration-200"
                :class="{ 'rotate-180': sortField === column && sortDirection === 'asc', 'text-blue-600': sortField === column }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128z" />
              </svg>
            </div>
          </th>
          <th class="p-px">
            <div class="px-6 py-4">Amallar</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!debtors.length">
          <td :colspan="Object.keys(columns).length + 1" class="text-center py-12 text-gray-500">
            Ma'lumot topilmadi
          </td>
        </tr>
        <tr v-else v-for="debtor in debtors" :key="debtor.id" class="border-b hover:bg-gray-50">
          <td v-for="(label, column) in columns" :key="column" class="px-6 py-4">
            <template v-if="column === 'student_name'">
              <a href="#" @click.prevent="$emit('show-student', debtor.id)" class="text-blue-600 hover:underline">
                {{ debtor.first_name }} {{ debtor.last_name }}
              </a>
            </template>
            <template v-else-if="column === 'groups'">
              {{ debtor.groups.join(', ') || '-' }}
            </template>
            <template v-else-if="column === 'total_debt'">
              <span class="font-semibold text-red-600">{{ formatCurrency(debtor.total_debt) }} UZS</span>
            </template>
            <template v-else-if="column === 'last_payment_date'">
              {{ formatDate(debtor.last_payment_date) }}
            </template>
            <template v-else-if="column === 'next_due_date'">
              {{ formatDate(debtor.next_due_date) }}
            </template>
            <template v-else>
              {{ debtor[column] }}
            </template>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center space-x-2">
              <button
                @click="$emit('remind', debtor.id)"
                class="btn btn-warning text-sm"
                title="Eslatma"
              >
                Eslatma
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  debtors: Array,
  columns: Object,
  sortField: String,
  sortDirection: String,
  formatCurrency: Function,
  formatDate: Function
})
</script>

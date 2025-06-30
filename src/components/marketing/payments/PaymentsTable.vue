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
            <div class="px-6 py-4">Tahrirlash</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!payments.length">
          <td :colspan="Object.keys(columns).length + 1">
            <slot name="empty"></slot>
          </td>
        </tr>
        <tr v-else v-for="payment in payments" :key="payment.id" class="border-b hover:bg-gray-50">
          <td v-for="(label, column) in columns" :key="column" class="px-6 py-4">
            <template v-if="column === 'student_name'">
              <a :href="`/students/${payment.student_id}`" target="_blank" class="text-blue-600 hover:underline">
                {{ payment.student_name }}
              </a>
            </template>
            <template v-else-if="column === 'group_name'">
              {{ payment.group_name }}
            </template>
            <template v-else-if="column === 'amount'">
              <span class="font-semibold text-green-700">{{ formatAmount(payment.amount - payment.discount_amount) }} UZS</span>
            </template>
            <template v-else-if="column === 'discount'">
              <span v-if="payment.discount_amount > 0" class="text-red-600">
                {{ calculatePoints(payment.discount_amount) }} ball ({{ formatAmount(payment.discount_amount) }} UZS)
              </span>
              <span v-else class="text-gray-400">-</span>
            </template>
            <template v-else-if="column === 'payment_date'">
              {{ formatDate(payment.payment_date) }}
            </template>
            <template v-else-if="column === 'payment_method'">
              {{ payment.payment_method }}
            </template>
            <template v-else>
              {{ payment[column] }}
            </template>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center space-x-2">
              <a
                href="#"
                @click.prevent="$emit('edit-payment', payment.id)"
                class="text-blue-600 hover:text-blue-900"
                title="Tahrirlash"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L9.38 17.273a4.5 4.5 0 01-1.897 1.13l-2.745.823.823-2.745a4.5 4.5 0 011.13-1.897l10.171-10.17z" />
                </svg>
              </a>
              <button
                @click="$emit('remove-payment', payment.id, payment.student_name)"
                class="text-red-600 hover:text-red-900"
                title="O'chirish"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PaymentsTable',
  props: {
    payments: Array,
    columns: Object,
    sortField: String,
    sortDirection: String,
    formatAmount: Function,
    formatDate: Function,
    calculatePoints: Function
  }
};
</script>

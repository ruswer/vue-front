<template>
  <div class="bg-white rounded-md shadow-sm p-6">
    <h2 class="text-lg font-bold text-gray-800 mb-6 py-4 border-b">Marketing Hisobot Jadvali</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm whitespace-nowrap">
        <thead class="bg-gray-100 text-gray-800">
          <tr>
            <th class="px-6 py-3">Filial</th>
            <th class="px-6 py-3">Oy</th>
            <th class="px-6 py-3">Yil</th>
            <th class="px-6 py-3">Yangi o'quvchilar</th>
            <th class="px-6 py-3">To'lovlar soni</th>
            <th class="px-6 py-3">Jami to'lov (UZS)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in reportData" :key="row.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">{{ row.branch_name }}</td>
            <td class="px-6 py-4">{{ row.month_name }}</td>
            <td class="px-6 py-4">{{ row.year }}</td>
            <td class="px-6 py-4">{{ row.new_students }}</td>
            <td class="px-6 py-4">{{ row.payments_count }}</td>
            <td class="px-6 py-4 font-semibold">{{ row.total_amount.toLocaleString('ru-RU') }}</td>
          </tr>
          <tr v-if="!reportData.length">
            <td colspan="6" class="text-center py-12 text-gray-500">Ma'lumot topilmadi</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  reportData: Array
})
</script>

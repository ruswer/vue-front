<template>
  <div class="min-h-screen flex flex-col m-4">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" class="mb-6" />

    <!-- Qidiruv Filtrlari -->
    <MarketingReportFilter v-model="filters" :loading="loading" class="bg-white rounded-md shadow-sm mb-6 p-6" @search="fetchData" />

    <!-- Reklama bo'yicha hisobot -->
    <MarketingReportAdvertisement :data="advertisementReportData" :total="totalAdvertisementCount" />

    <!-- Jins bo'yicha taqsimot -->
    <MarketingReportGender :data="genderDistributionData" :total="totalStudents" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/marketing/report/Breadcrumb.vue'
import MarketingReportFilter from '@/components/marketing/report/MarketingReportFilter.vue'
import MarketingReportAdvertisement from '@/components/marketing/report/MarketingReportAdvertisement.vue'
import MarketingReportGender from '@/components/marketing/report/MarketingReportGender.vue'

const filters = ref({ startDate: '', endDate: '' })
const loading = ref(false)
const advertisementReportData = ref([])
const totalAdvertisementCount = ref(0)
const genderDistributionData = ref({})
const totalStudents = ref(0)

const breadcrumbItems = [
  { text: 'Bosh sahifa', to: '/' },
  { text: 'Marketing', to: '/marketing' },
  { text: 'Hisobot', to: '/marketing/report', active: true }
]

async function fetchData() {
  loading.value = true
  try {
    // Demo: random data
    advertisementReportData.value = [
      { name: 'Instagram', count: 12 },
      { name: 'Telegram', count: 8 },
      { name: 'Banner', count: 5 }
    ]
    totalAdvertisementCount.value = advertisementReportData.value.reduce((a, b) => a + b.count, 0)
    genderDistributionData.value = { Erkak: 15, Ayol: 10 }
    totalStudents.value = 25
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<style scoped>
</style>

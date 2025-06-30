<template>
  <nav class="flex items-center text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1">
      <li v-for="(item, idx) in items" :key="idx" class="inline-flex items-center">
        <span v-if="idx !== 0" class="mx-1">/</span>
        <span
          v-if="item.to && !item.active"
          class="hover:text-blue-600 hover:underline cursor-pointer transition-colors"
          @click="$router.push(item.to)"
        >{{ item.text || item.label }}</span>
        <span v-else class="font-semibold text-gray-800">{{ item.text || item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
<script setup>
const props = defineProps({
  items: { type: Array, required: true }
})
</script>

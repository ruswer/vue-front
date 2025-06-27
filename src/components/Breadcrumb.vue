<template>
  <nav class="flex text-gray-500 text-sm mb-2" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(item, idx) in items" :key="idx" class="inline-flex items-center">
        <template v-if="item.to && !item.active">
          <a :href="item.to" class="inline-flex items-center hover:text-blue-600">
            <span v-if="idx === 0">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m0 0h4m-4 0a2 2 0 01-2-2V7m0 0L5 9m14 0l-2-2" />
              </svg>
            </span>
            {{ item.text }}
          </a>
        </template>
        <template v-else>
          <span class="inline-flex items-center text-gray-700 font-semibold">
            <span v-if="idx === 0">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m0 0h4m-4 0a2 2 0 01-2-2V7m0 0L5 9m14 0l-2-2" />
              </svg>
            </span>
            {{ item.text }}
          </span>
        </template>
        <span v-if="idx < items.length - 1" class="mx-2 text-gray-400">/</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
nav {
  user-select: none;
}
</style>

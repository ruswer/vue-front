<template>
  <div v-if="pagination.total > pagination.per_page" class="mt-4 px-4 py-3 bg-white border-t">
    <nav role="navigation" aria-label="Pagination Navigation" class="flex items-center justify-between">
      <!-- Mobile Pagination -->
      <div class="flex justify-between flex-1 sm:hidden">
        <span>
          <button
            v-if="!pagination.onFirstPage"
            @click="$emit('previous-page')"
            :disabled="isLoading"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          >
            {{ __('pagination.previous') }}
          </button>
          <span v-else class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-md">
            {{ __('pagination.previous') }}
          </span>
        </span>
        <span>
          <button
            v-if="pagination.hasMorePages"
            @click="$emit('next-page')"
            :disabled="isLoading"
            class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          >
            {{ __('pagination.next') }}
          </button>
          <span v-else class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default rounded-md">
            {{ __('pagination.next') }}
          </span>
        </span>
      </div>
      <!-- Desktop Pagination -->
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700 leading-5">
            {{ __('Showing') }}
            <span class="font-medium">{{ pagination.from }}</span>
            {{ __('to') }}
            <span class="font-medium">{{ pagination.to }}</span>
            {{ __('of') }}
            <span class="font-medium">{{ pagination.total }}</span>
            {{ __('results') }}
          </p>
        </div>
        <div>
          <span class="relative z-0 inline-flex rounded-md shadow-sm">
            <button
              v-if="!pagination.onFirstPage"
              @click="$emit('previous-page')"
              :disabled="isLoading"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <span v-else class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md cursor-default">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
            <button
              v-for="page in pagination.pages"
              :key="page"
              @click="$emit('goto-page', page)"
              class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-gray-300 leading-5 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
              :class="{
                'text-blue-600 bg-blue-50': page === pagination.current_page,
                'text-gray-700 bg-white hover:text-gray-500': page !== pagination.current_page
              }"
            >
              {{ page }}
            </button>
            <button
              v-if="pagination.hasMorePages"
              @click="$emit('next-page')"
              :disabled="isLoading"
              class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <span v-else class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md cursor-default">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: Object,
    isLoading: Boolean
  }
};
</script>

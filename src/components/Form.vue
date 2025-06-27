<template>
  <form @submit.prevent="$emit('submit')" :class="formClass.replace('mx-auto', '')">
    <div :class="bodyClass">
      <slot />
      <!-- Universal Input -->
      <div v-if="inputProps" class="flex flex-col gap-1">
        <label v-if="inputProps.label" :for="inputProps.name" class="text-sm font-medium text-gray-700">{{ inputProps.label }}</label>
        <input
          v-bind="inputProps"
          :id="inputProps.name"
          :class="['mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm', inputProps.error ? 'border-red-500' : '']"
        />
        <span v-if="inputProps.helper" class="text-xs text-gray-400">{{ inputProps.helper }}</span>
        <span v-if="inputProps.error" class="text-xs text-red-500">{{ inputProps.error }}</span>
      </div>
      <!-- Universal Select -->
      <div v-if="selectProps" class="flex flex-col gap-1">
        <label v-if="selectProps.label" :for="selectProps.name" class="text-sm font-medium text-gray-700">{{ selectProps.label }}</label>
        <select
          v-bind="selectProps"
          :id="selectProps.name"
          :class="['mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm', selectProps.error ? 'border-red-500' : '']"
        >
          <option v-for="option in selectProps.options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
        <span v-if="selectProps.helper" class="text-xs text-gray-400">{{ selectProps.helper }}</span>
        <span v-if="selectProps.error" class="text-xs text-red-500">{{ selectProps.error }}</span>
      </div>
      <!-- Universal Textarea -->
      <div v-if="textareaProps" class="flex flex-col gap-1">
        <label v-if="textareaProps.label" :for="textareaProps.name" class="text-sm font-medium text-gray-700">{{ textareaProps.label }}</label>
        <textarea
          v-bind="textareaProps"
          :id="textareaProps.name"
          :class="['mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm', textareaProps.error ? 'border-red-500' : '']"
        />
        <span v-if="textareaProps.helper" class="text-xs text-gray-400">{{ textareaProps.helper }}</span>
        <span v-if="textareaProps.error" class="text-xs text-red-500">{{ textareaProps.error }}</span>
      </div>
    </div>
    <div v-if="$slots.actions" :class="actionsClass">
      <slot name="actions" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    formClass: {
      type: String,
      default: 'flex flex-col gap-6 w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md'
    },
    bodyClass: {
      type: String,
      default: 'flex flex-col gap-4'
    },
    actionsClass: {
      type: String,
      default: 'flex justify-end gap-2 mt-4'
    },
    inputProps: Object,
    selectProps: Object,
    textareaProps: Object
  }
};
</script>

<style scoped>
select, input, textarea {
  background: #f9fafb;
}
</style>

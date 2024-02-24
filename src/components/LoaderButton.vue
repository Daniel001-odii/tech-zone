<template>
    <button
    :disabled="loading"
      :class="{ 'opacity-50 cursor-not-allowed': loading }"
      @click="handleClick"
      class="btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <!-- <span v-if="loading" class=" animate-spin mr-2">&#9696;</span> -->
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      buttonText: {
        type: String,
        required: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleClick() {
        if (!this.loading) {
          this.$emit('click');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  
<template>
    <div>
      <input
        type="text"
        class="form_input"
        :value="formattedValue"
        @input="handleInput"
        @blur="handleBlur"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Number,
        default: 0
      }
    },
    computed: {
      formattedValue() {
        return this.formatNumber(this.modelValue);
      }
    },
    methods: {
      formatNumber(value) {
        if (!value) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      parseNumber(value) {
        return value.replace(/,/g, '');
      },
      handleInput(event) {
        const value = event.target.value;
        const parsedValue = this.parseNumber(value);
        if (/^\d*$/.test(parsedValue)) { // Ensure only numeric values are accepted
          this.$emit('update:modelValue', Number(parsedValue));
        }
      },

      formatCurrency() {
      // Remove non-numeric characters and format the number
      let formattedValue = this.budgetValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
      // Add thousands separator
      formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // Update the input field value
      this.budgetValue = formattedValue;
      this.formData.budget = parseInt(this.budgetValue.replaceAll(",",""));;
      console.log(this.formData.budget);
    },
    
      handleBlur() {
        this.$emit('update:modelValue', this.modelValue); // Ensure the model value is emitted on blur
      }
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Add some basic styling */
  input {
    padding: 8px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }
  </style>
  
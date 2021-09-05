<template>
  <select @change="handleClick($event)">
    <option v-for="sheet in sheets" :value="sheet.title" :key="sheet.sheetId">{{
      sheet.title
    }}</option>
  </select>
</template>

<script>
export default {
  props: {
    sheets: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleClick(event) {
      const sheetName = event.target.value;
      this.$store.dispatch('getValuesFromSheet', sheetName);
    },
  },
};
</script>

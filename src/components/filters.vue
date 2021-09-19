<template>
  <div class="filters">
    <label>
      Not expired
      <input
        type="checkbox"
        v-model="filterExpireDate"
      />
    </label>
    <label>
      Enabled
      <input
        type="checkbox"
        v-model="filterEnabled"
      />
    </label>
    <Dropdown
      class="deal__dropdown"
      :merchants="merchantsId"
      @on-change="handleDropdownChange($event)"
    />
  </div>
</template>

<script>
import Dropdown from './dropdown.vue';

export default {
  components: {
    Dropdown,
  },

  computed: {
    filterExpireDate: {
      get() {
        return this.$store.state.filters.expireDate;
      },
      set(value) {
        this.$store.commit('filters/update', { expireDate: value });
      }
    },
    filterEnabled: {
      get() {
        return this.$store.state.filters.enabled;
      },
      set(value) {
        this.$store.commit('filters/update', { enabled: value });
      }
    },
    merchantsId() {
      return this.$store.state.merchantsId;
    },
  },

  methods: {
    handleDropdownChange(event) {
      const merchantId = event.target.value;

      if (merchantId === 'false') {
        this.$store.commit('filters/update', { merchantId: false })
      } else {
        this.$store.commit('filters/update', { merchantId })
      }
    },
  },
}
</script>

<style>
.filters {
  text-align: center;
}
</style>
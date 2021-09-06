<template>
  <div class="main">
    <Deals :deals="devDeals" title="Development deals" />
    <Deals :deals="prodDeals" title="Production deals" />
  </div>
</template>

<script>
import Deals from '../components/deals.vue';

export default {
  components: {
    Deals,
  },

  computed: {
    prodDeals() {
      return this.$store.state.prodDeals;
    },

    devDeals() {
      return this.$store.state.devDeals;
    },
  },

  created() {
    this.$store.dispatch('getProdDeals');
    this.$store.dispatch('getDevDeals');
  },
};
</script>

<style>
.main {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
</style>

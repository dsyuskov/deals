<template>

  <div class="main">
    <Filters />
    <div class="main__deals">
      <Deals :deals="devDeals" title="Development deals" />
      <Deals :deals="prodDeals" title="Production deals" :removable="true" />
    </div>
  </div>
</template>

<script>
import Deals from '../components/deals.vue';
import Filters from '../components/filters.vue';

export default {
  components: {
    Deals,
    Filters,
  },

  computed: {
    prodDeals() {
      const { filters } = this.$store.state;

      return this.filtredDeals(this.$store.state.prodDeals, filters);
    },

    devDeals() {
      const { filters } = this.$store.state;
      return this.filtredDeals(this.$store.state.devDeals, filters);
    },
  },

  created() {
    this.$store.dispatch('getProdDeals');
    this.$store.dispatch('getDevDeals');
  },

  methods: {
    filtredDeals(deals, filters) {
      const { enabled, expireDate, merchantId } = filters;

      let filtredDeals = [...deals];

      if (enabled) {
        filtredDeals = filtredDeals.filter((deal) => deal.enabled);
      }

      if (expireDate) {
        filtredDeals = filtredDeals.filter(
          (deal) => new Date(deal.expireDate) > new Date()
        );
      }

      if (merchantId) {
        filtredDeals = filtredDeals.filter(
          (deal) => deal.merchantId === merchantId
        );
      }

      return filtredDeals;
    },
  }
};
</script>

<style>
.main__deals {
  max-width: 1700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
</style>

<template>
  <div class="main">
    <!-- TODO: fixed filter on top -->
    <!-- TODO: add sort by merchant -->
    <Filters />
    <Deals :deals="allDeals" />
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
    allDeals() {
      const { filters } = this.$store.state;

      return this.filtredDeals(this.$store.state.allDeals, filters);
    },
  },

  created() {
    this.$store.dispatch('getAllDeals');
  },

  methods: {
    filtredDeals(deals, filters) {
      const { enabled, expireDate } = filters;

      let filtredDeals = [...deals];

      if (enabled) {
        filtredDeals = filtredDeals.filter((pairDeals) => {
         const [devDeal, prodDeal] = pairDeals;
         return devDeal.enabled?.value || prodDeal.enabled?.value
        });
      }

      if (expireDate) {
        filtredDeals = filtredDeals.filter((pairDeals) => {
         const [devDeal, prodDeal] = pairDeals;
         return new Date(devDeal.expireDate?.value) > new Date() || new Date(prodDeal.expireDate?.value) > new Date()
        });
      }

      // TODO: add filter by merchant
      return filtredDeals;
    },
  }
};
</script>

<style>

</style>

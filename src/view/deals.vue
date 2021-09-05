<template>
  <div class="deals">
    <!-- <Dropdown :sheets="allSheets" /> -->
    <!-- <a v-if="merchantDeals.length" download="deals.json" :href="dealDrl">
      save
    </a> -->
    <div class="deals__dev">
      <Deal v-for="deal in prodDeals" :key="deal.name" :deal="deal" />
    </div>
    <div class="deals__prod">
      <Deal v-for="deal in prodDeals" :key="deal.name" :deal="deal" />
    </div>
  </div>
</template>

<script>
import Deal from '../components/deal.vue';
// import Dropdown from '../components/dropdown.vue';
import { urlToSave } from '../utils';

export default {
  components: {
    Deal,
  },
  computed: {
    isGapiLoaded() {
      return this.$store.state.isGapiLoaded;
    },

    allSheets() {
      return this.$store.state.allSheets;
    },

    merchantDeals() {
      return this.$store.state.merchantDeals;
    },

    dealDrl() {
      return urlToSave(this.merchantDeals);
    },

    prodDeals() {
      return this.$store.state.prodDeals;
    },
  },

  created() {
    this.$store.dispatch('getAllSheets');
    this.$store.dispatch('getProdDeals');
  },
};
</script>

<style>
.deals {
  display: flex;
  justify-content: space-around;
}
</style>

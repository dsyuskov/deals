<template>
  <div>
    <button @click="handleButtonClick">button</button>
    <div class="main">
      <Deals :deals="devDeals" title="Development deals" />
      <Deals :deals="prodDeals" title="Production deals" :removable="true" />
    </div>
  </div>
</template>

<script>
import Deals from '../components/deals.vue';
import { sortDevDeals } from '../utils';

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

  methods: {
    handleButtonClick(){
      sortDevDeals(this.devDeals, this.prodDeals)
    }
  },

  created() {
    this.$store.dispatch('getProdDeals');
    this.$store.dispatch('getDevDeals');
  },
};
</script>

<style>
.main {
  max-width: 1700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
</style>

<template>
  <div>
    <Dropdown :sheets="allSheets" v-if="isAuth" />
    <a v-if="merchantDeals.length" download="deals.json" :href="dealDrl">
      save
    </a>
  </div>
</template>

<script>
import Dropdown from '../components/dropdown.vue';
import { urlToSave } from '../utils';

export default {
  components: {
    Dropdown,
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuthorized;
    },
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
  },

  created() {
    this.$store.dispatch('getAllSheets');
  },
};
</script>

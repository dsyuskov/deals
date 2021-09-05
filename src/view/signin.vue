<template>
  <div class="signin">
    <button
      class="signin__button"
      :disabled="!isGapiLoaded"
      @click="handleSignInClick"
    >
      Sign In
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isGapiLoaded() {
      return this.$store.state.isGapiLoaded;
    },
  },

  methods: {
    async handleSignInClick() {
      try {
        const isAuthorized = await this.$store.dispatch('signInAction');

        if (isAuthorized) {
          this.$router.push({ name: 'deals' });
        }
      } catch (error) {
        console.log(`int_21h-error:`, error);
      }
    },
  },
};
</script>

<style>
.signin {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signin__button {
  width: 150px;
  height: 50px;
}
</style>

<template>
  <v-container>
    <v-btn class="btn" @click="logout" color="error">Deslogar</v-btn>
    <Actions />
  </v-container>
</template>

<script>
  import Actions from '../components/Actions'

  export default {
    name: 'Dashboard',
    components: {
      Actions,
    },
    methods: {
      logout() {
        this.$store.commit('storeToken', null)
        this.$router.push({name: 'Login'})
      }
    },
  }
</script>

<style scoped>
  .btn {
    margin-left: 20%;
  }
</style>

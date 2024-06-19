<template>
  <v-app>
    <v-main>
      <TournamentTables />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TournamentTables from './components/TournamentTables.vue'
@Component({
  components: {
    TournamentTables
  }
})
export default class App extends Vue {}
</script>

<style>
@import "~vuetify/dist/vuetify.min.css";
</style>

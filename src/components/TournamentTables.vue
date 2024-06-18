<template>
  <v-container>
    <v-tabs v-model="activeTab" background-color="primary" dark>
      <v-tab>
        <v-icon left>mdi-tournament</v-icon>
        Основной турнир (ОТ)
      </v-tab>
      <v-tab>
        <v-icon left>mdi-tournament</v-icon>
        Отборочный этап (ОЭ)
      </v-tab>
      <v-tab>
        <v-icon left>mdi-tournament</v-icon>
        Ожидающие игроки (ОЖ)
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <TournamentTable
          :players="mainTournamentPlayers"
          title="Основной турнир (ОТ)"
        />
      </v-tab-item>

      <v-tab-item>
        <TournamentTable
          :players="qualifyingStagePlayers"
          title="Отборочный этап (ОЭ)"
        />
      </v-tab-item>

      <v-tab-item>
        <TournamentTable
          :players="waitingPlayers"
          title="Ожидающие игроки (ОЖ)"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TournamentTable from './TournamentTable.vue'

@Component({
  components: {
    TournamentTable
  }
})
export default class TournamentTables extends Vue {
  public activeTab = 0;

  get mainTournamentPlayers () {
    return this.$store.getters.getPlayersByStage('ОТ')
  }

  get qualifyingStagePlayers () {
    return this.$store.getters.getPlayersByStage('ОЭ')
  }

  get waitingPlayers () {
    return this.$store.getters.getPlayersByComment('Поздняя заявка')
  }
}
</script>

<style scoped>
.v-tabs {
  margin-bottom: 16px;
}

.v-tabs .v-tab {
  display: flex;
  align-items: center;
}

.v-tabs .v-icon {
  margin-right: 8px;
}
</style>

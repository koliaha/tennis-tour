<template>
  <v-container>
    <v-tabs v-model="activeTab" background-color="primary" dark>
      <v-tab>Основной турнир (ОТ)</v-tab>
      <v-tab>Отборочный этап (ОЭ)</v-tab>
      <v-tab>Ожидающие игроки (ОЖ)</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" label="Поиск" class="mx-4" clearable></v-text-field>
            <v-select v-model="filter.pay_member" :items="payMemberOptions" label="Оплата ежегодного взноса" class="mx-4" clearable></v-select>
            <v-text-field v-model="filter.comment" label="Примечание" class="mx-4" clearable></v-text-field>
            <v-text-field v-model="filter.join_date" label="Дата заявки" class="mx-4" clearable></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredMainTournamentPlayers"
            class="elevation-1"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            :item-class="itemClass"
            hide-default-footer
            :items-per-page="filteredMainTournamentPlayers.length"
          >
            <template v-slot:[`top`]="{ props }">
              <v-toolbar flat>
                <v-toolbar-title>Основной турнир (ОТ)</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:[`item.birth_date`]="{ item }">
              {{ formatDate(item.birth_date) }}
            </template>
            <template v-slot:[`item.join_date`]="{ item }">
              {{ formatDate(item.join_date) }}
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" label="Поиск" class="mx-4" clearable></v-text-field>
            <v-select v-model="filter.pay_member" :items="payMemberOptions" label="Оплата ежегодного взноса" class="mx-4" clearable></v-select>
            <v-text-field v-model="filter.comment" label="Примечание" class="mx-4" clearable></v-text-field>
            <v-text-field v-model="filter.join_date" label="Дата заявки" class="mx-4" clearable></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredQualifyingStagePlayers"
            class="elevation-1"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            :item-class="itemClass"
            hide-default-footer
            :items-per-page="filteredQualifyingStagePlayers.length"
          >
            <template v-slot:[`top`]="{ props }">
              <v-toolbar flat>
                <v-toolbar-title>Отборочный этап (ОЭ)</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:[`item.birth_date`]="{ item }">
              {{ formatDate(item.birth_date) }}
            </template>
            <template v-slot:[`item.join_date`]="{ item }">
              {{ formatDate(item.join_date) }}
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" label="Поиск" class="mx-4" clearable></v-text-field>
            <v-select v-model="filter.pay_member" :items="payMemberOptions" label="Оплата ежегодного взноса" class="mx-4" clearable></v-select>
            <v-text-field v-model="filter.comment" label="Примечание" class="mx-4" clearable></v-text-field>
            <v-text-field v-model="filter.join_date" label="Дата заявки" class="mx-4" clearable></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredWaitingPlayers"
            class="elevation-1"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            :item-class="itemClass"
            hide-default-footer
            :items-per-page="filteredWaitingPlayers.length"
          >
            <template v-slot:[`top`]="{ props }">
              <v-toolbar flat>
                <v-toolbar-title>Ожидающие игроки (ОЖ)</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:[`item.birth_date`]="{ item }">
              {{ formatDate(item.birth_date) }}
            </template>
            <template v-slot:[`item.join_date`]="{ item }">
              {{ formatDate(item.join_date) }}
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { players as rawPlayers } from '@/data/index'

interface RawPlayer {
  tm_id: string;
  freeze_stage?: string;
  check_public?: string;
  stage_type?: string;
  player_id: string;
  name: string;
  name_tour: string;
  gender: string;
  rtt_number: string;
  birth_date: string;
  doc_city: string;
  pay_member?: string;
  join_date?: string;
  comment?: string;
  stage: string;
}

interface Player {
  tm_id: string;
  player_id: string;
  name: string;
  name_tour: string;
  gender: string;
  rtt_number: string;
  birth_date: string;
  doc_city: string;
  pay_member: string;
  join_date: string;
  comment: string;
  stage: string;
}

@Component
export default class TournamentTables extends Vue {
  public players: Player[] = rawPlayers.map(this.transformPlayer);

  public headers = [
    { text: '№', value: 'tm_id' },
    { text: 'РНИ', value: 'rtt_number' },
    { text: 'ФИО', value: 'name' },
    { text: 'Город', value: 'doc_city' },
    { text: 'Дата рождения', value: 'birth_date' },
    { text: 'Оплата ежегодного взноса', value: 'pay_member', sortable: true },
    { text: 'Дата заявки', value: 'join_date', sortable: true },
    { text: 'Примечание', value: 'comment' }
  ];

  public sortBy = 'pay_member';
  public sortDesc = false;
  public activeTab = 0;
  public search = '';
  public filter = {
    comment: '',
    pay_member: '',
    join_date: ''
  };

  public payMemberOptions = [
    { text: 'Все', value: '' },
    { text: 'Оплачено', value: '1' },
    { text: 'Не оплачено', value: '0' }
  ];

  get mainTournamentPlayers (): Player[] {
    return this.players.filter(player => player.stage === 'ОТ')
  }

  get qualifyingStagePlayers (): Player[] {
    return this.players.filter(player => player.stage === 'ОЭ')
  }

  get waitingPlayers (): Player[] {
    return this.players.filter(player => player.comment === 'Поздняя заявка')
  }

  get filteredMainTournamentPlayers (): Player[] {
    return this.filterPlayers(this.mainTournamentPlayers)
  }

  get filteredQualifyingStagePlayers (): Player[] {
    return this.filterPlayers(this.qualifyingStagePlayers)
  }

  get filteredWaitingPlayers (): Player[] {
    return this.filterPlayers(this.waitingPlayers)
  }

  filterPlayers (players: Player[]): Player[] {
    return players.filter(player => {
      return (
        (this.filter.comment ? player.comment?.includes(this.filter.comment) : true) &&
        (this.filter.pay_member ? player.pay_member === this.filter.pay_member : true) &&
        (this.filter.join_date ? player.join_date?.includes(this.filter.join_date) : true) &&
        (this.search ? player.name?.includes(this.search) : true)
      )
    })
  }

  itemClass (item: Player): string {
    return item.pay_member === '0' ? 'no-pay' : ''
  }

  transformPlayer (player: RawPlayer): Player {
    return {
      tm_id: player.tm_id,
      player_id: player.player_id,
      name: player.name,
      name_tour: player.name_tour,
      gender: player.gender,
      rtt_number: player.rtt_number,
      birth_date: player.birth_date,
      doc_city: player.doc_city,
      pay_member: player.pay_member ?? '',
      join_date: player.join_date ?? '',
      comment: player.comment ?? '',
      stage: player.stage
    }
  }

  formatDate (date: string): string {
    if (!date) return '-'
    const [year, month, day] = date.split('-')
    return `${day}.${month}.${year}`
  }
}
</script>

<style scoped>
.v-data-table {
  width: 100%;
}

.no-pay {
  background-color: #ffcccc !important;
}
</style>

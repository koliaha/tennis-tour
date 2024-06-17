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
              <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-4"
              ></v-text-field>
              <v-select
                v-model="filter.payMember"
                :items="payMemberOptions"
                label="Оплата ежегодного взноса"
                class="mx-4"
              ></v-select>
              <v-text-field
                v-model="filter.comment"
                label="Примечание"
                class="mx-4"
              ></v-text-field>
              <v-text-field
                v-model="filter.joinDate"
                label="Дата заявки"
                class="mx-4"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="filteredMainTournamentPlayers"
              class="elevation-1"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              :item-class="itemClass"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Основной турнир (ОТ)</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-4"
              ></v-text-field>
              <v-select
                v-model="filter.payMember"
                :items="payMemberOptions"
                label="Оплата ежегодного взноса"
                class="mx-4"
              ></v-select>
              <v-text-field
                v-model="filter.comment"
                label="Примечание"
                class="mx-4"
              ></v-text-field>
              <v-text-field
                v-model="filter.joinDate"
                label="Дата заявки"
                class="mx-4"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="filteredQualifyingStagePlayers"
              class="elevation-1"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              :item-class="itemClass"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Отборочный этап (ОЭ)</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-4"
              ></v-text-field>
              <v-select
                v-model="filter.payMember"
                :items="payMemberOptions"
                label="Оплата ежегодного взноса"
                class="mx-4"
              ></v-select>
              <v-text-field
                v-model="filter.comment"
                label="Примечание"
                class="mx-4"
              ></v-text-field>
              <v-text-field
                v-model="filter.joinDate"
                label="Дата заявки"
                class="mx-4"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="filteredWaitingPlayers"
              class="elevation-1"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              :item-class="itemClass"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Ожидающие игроки (ОЖ)</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { players } from '@/data/index'

  interface Player {
    tmId: string;
    playerId: string;
    name: string;
    nameTour: string;
    gender: string;
    rttNumber: string;
    birthDate: string;
    docCity: string;
    payMember: string;
    joinDate: string;
    comment: string;
    stage: string;
  }

  @Component
export default class TournamentTables extends Vue {
    private players: Player[] = players.map(transformPlayer);

    private headers = [
      { text: '№', value: 'tmId' },
      { text: 'РНИ', value: 'rttNumber' },
      { text: 'ФИО', value: 'name' },
      { text: 'Город', value: 'docCity' },
      { text: 'Дата рождения', value: 'birthDate' },
      { text: 'Оплата ежегодного взноса', value: 'payMember', sortable: true },
      { text: 'Дата заявки', value: 'joinDate', sortable: true },
      { text: 'Примечание', value: 'comment' }
    ];

    private sortBy = 'payMember';
    private sortDesc = false;
    private activeTab = 0;
    private search = '';
    private filter = {
      comment: '',
      payMember: '',
      joinDate: ''
    };

    private payMemberOptions = [
      { text: 'Все', value: '' },
      { text: 'Оплачено', value: '1' },
      { text: 'Не оплачено', value: '0' }
    ];

    get mainTournamentPlayers () {
      return this.players.filter(player => player.stage === 'ОТ')
    }

    get qualifyingStagePlayers () {
      return this.players.filter(player => player.stage === 'ОЭ')
    }

    get waitingPlayers () {
      return this.players.filter(player => player.comment === 'Поздняя заявка')
    }

    get filteredMainTournamentPlayers () {
      return this.filterPlayers(this.mainTournamentPlayers)
    }

    get filteredQualifyingStagePlayers () {
      return this.filterPlayers(this.qualifyingStagePlayers)
    }

    get filteredWaitingPlayers () {
      return this.filterPlayers(this.waitingPlayers)
    }

    filterPlayers (players: Player[]) {
      return players.filter(player => {
        return (
          (this.filter.comment ? player.comment.includes(this.filter.comment) : true) &&
          (this.filter.payMember ? player.payMember === this.filter.payMember : true) &&
          (this.filter.joinDate ? player.joinDate.includes(this.filter.joinDate) : true) &&
          (this.search ? player.name.includes(this.search) : true)
        )
      })
    }

    itemClass (item: Player) {
      return item.payMember === '0' ? 'no-pay' : ''
    }
}

function transformPlayer (player: any): Player {
  return {
    tmId: player.tm_id,
    playerId: player.player_id,
    name: player.name,
    nameTour: player.name_tour,
    gender: player.gender,
    rttNumber: player.rtt_number,
    birthDate: player.birth_date,
    docCity: player.doc_city,
    payMember: player.pay_member,
    joinDate: player.join_date,
    comment: player.comment,
    stage: player.stage
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

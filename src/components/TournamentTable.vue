<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Поиск"
        class="mx-4"
        clearable
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-select
        v-model="filter.pay_member"
        :items="payMemberOptions"
        label="Оплата ежегодного взноса"
        class="mx-4"
        clearable
        append-icon="mdi-cash"
      ></v-select>
      <v-text-field
        v-model="filter.comment"
        label="Примечание"
        class="mx-4"
        clearable
        append-icon="mdi-comment-text-outline"
      ></v-text-field>
      <v-text-field
        v-model="filter.join_date"
        label="Дата заявки"
        class="mx-4"
        clearable
        append-icon="mdi-calendar"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filteredPlayers"
      class="elevation-1"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :item-class="itemClass"
      hide-default-footer
      :items-per-page="filteredPlayers.length"
    >
      <template v-slot:[`top`]="{}">
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Player } from '@/types/interfaces'

@Component
export default class TournamentTable extends Vue {
  @Prop({ required: true }) players!: Player[];
  @Prop({ required: true }) title!: string;

  public search = '';
  public filter = {
    comment: '',
    pay_member: '',
    join_date: ''
  };

  public sortBy = 'pay_member';
  public sortDesc = false;

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

  public payMemberOptions = [
    { text: 'Все', value: '' },
    { text: 'Оплачено', value: '1' },
    { text: 'Не оплачено', value: '0' }
  ];

  get filteredPlayers (): Player[] {
    return this.players.filter((player) => {
      return (
        (this.filter.comment
          ? player.comment?.includes(this.filter.comment)
          : true) &&
        (this.filter.pay_member
          ? player.pay_member === this.filter.pay_member
          : true) &&
        (this.filter.join_date
          ? player.join_date?.includes(this.filter.join_date)
          : true) &&
        (this.search ? player.name?.includes(this.search) : true)
      )
    })
  }

  itemClass (item: Player): string {
    return item.pay_member === '0' ? 'no-pay' : ''
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
  margin-top: 16px;
}

.v-card-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.v-text-field,
.v-select {
  flex: 1 1 auto;
  margin: 8px;
  max-width: 220px;
}

.v-toolbar-title {
  font-weight: bold;
  font-size: 1.25rem;
}

.no-pay {
  background-color: #ffcccc !important;
}

@media (max-width: 600px) {
  .v-card-title {
    flex-direction: column;
  }

  .v-text-field,
  .v-select {
    max-width: 100%;
    margin: 4px 0;
  }
}
</style>

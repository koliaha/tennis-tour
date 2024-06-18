<template>
  <v-card>
    <div class="filters">
      <v-text-field
        v-model="search"
        label="Поиск"
        class="mx-4"
        clearable
        append-icon="mdi-magnify"
        @click:clear="resetFilters"
      ></v-text-field>
      <v-select
        v-model="filter.pay_member"
        :items="payMemberOptions"
        label="Оплата ежегодного взноса"
        class="mx-4"
        clearable
        append-icon="mdi-cash"
        @click:clear="resetFilters"
      ></v-select>
      <v-text-field
        v-model="filter.comment"
        label="Примечание"
        class="mx-4"
        clearable
        append-icon="mdi-comment-text-outline"
        @click:clear="resetFilters"
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
        max-width="290px"
        style="z-index: 1"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRange"
            label="Диапазон дат заявки"
            class="mx-4"
            readonly
            v-bind="attrs"
            v-on="on"
            clearable
            append-icon="mdi-calendar"
            @click:clear="resetFilters"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filter.join_date"
          range
          @change="updateDateRange"
        ></v-date-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">OK</v-btn>
        </v-card-actions>
      </v-menu>
    </div>
    <v-data-table
      :headers="headers"
      :items="filteredPlayers"
      class="elevation-1 "
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :item-class="itemClass"
      hide-default-footer
      :items-per-page="filteredPlayers.length"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <!-- <v-spacer></v-spacer> -->
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Player } from '@/types/interfaces'

@Component
export default class TournamentTable extends Vue {
  @Prop({ required: true }) players!: Player[];
  @Prop({ required: true }) title!: string;

  public search = '';
  public filter = {
    comment: '',
    pay_member: '',
    join_date: []
  };

  public menu = false; // Для календаря
  public dateRange = '';

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
      const nameMatch = player.name
        .toLowerCase()
        .includes(this.search.toLowerCase())
      const commentMatch = this.filter.comment
        ? player.comment
          ?.toLowerCase()
          .includes(this.filter.comment.toLowerCase())
        : true
      const payMemberMatch = this.filter.pay_member
        ? player.pay_member === this.filter.pay_member
        : true
      const joinDateMatch = this.filter.join_date.length
        ? player.join_date >= this.filter.join_date[0] &&
          player.join_date <= this.filter.join_date[1]
        : true
      return nameMatch && commentMatch && payMemberMatch && joinDateMatch
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

  updateDateRange () {
    if (this.filter.join_date.length === 2) {
      const [start, end] = this.filter.join_date.map((date) =>
        this.formatDate(date)
      )
      this.dateRange = `${start} - ${end}`
    } else {
      this.dateRange = ''
    }
  }

  resetFilters () {
    this.search = ''
    this.filter = {
      comment: '',
      pay_member: '',
      join_date: []
    }
    this.dateRange = ''
  }

  @Watch('search')
  @Watch('filter.comment')
  @Watch('filter.pay_member')
  @Watch('filter.join_date')
  onFilterChange () {
    this.$forceUpdate()
  }
}
</script>

<style scoped>

</style>

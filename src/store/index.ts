import Vue from 'vue'
import Vuex from 'vuex'
import { players as rawPlayers } from '@/data/index'
import { Player, RawPlayer } from '@/types/interfaces'

Vue.use(Vuex)

const transformPlayer = (player: RawPlayer): Player => ({
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
})

export default new Vuex.Store({
  state: {
    players: rawPlayers.map(transformPlayer)
  },
  getters: {
    getPlayersByStage: (state) => (stage: string) => {
      return state.players.filter((player: Player) => player.stage === stage)
    },
    getPlayersByComment: (state) => (comment: string) => {
      return state.players.filter(
        (player: Player) => player.comment === comment
      )
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})

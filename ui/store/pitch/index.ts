
import 'reflect-metadata'

import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { container } from 'inversify-props'
import { Pitch } from '~/rest/modules/pitch/domain/Pitch'
import { GetRecent } from '~/rest/modules/pitch/usecase/getRecent'

export const state = () => ({
  loading: false,
  pitches: [] as Pitch[],
  error: null as string | null
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  totalPitches: state => state.pitches.length
}

export enum MutationTypes {
  GET_RECENT_PITCHES_REQUEST = 'GET_RECENT_PITCHES_REQUEST',
  GET_RECENT_PITCHES_SUCCESS = 'GET_RECENT_PITCHES_SUCCESS',
  GET_RECENT_PITCHES_ERROR = 'GET_RECENT_PITCHES_ERROR',
}

export const mutations: MutationTree<RootState> = {
  [MutationTypes.GET_RECENT_PITCHES_REQUEST](state) {
    state.loading = true
    state.error = null
  },

  [MutationTypes.GET_RECENT_PITCHES_ERROR](state, error) {
    state.loading = false
    state.error = error
  },

  [MutationTypes.GET_RECENT_PITCHES_SUCCESS](state, pitches: Pitch[]) {
    state.loading = false
    state.error = null
    state.pitches = pitches
  }
}

export enum ActionTypes {
  getRecentPitches = 'getRecentPitches'
}

export const actions: ActionTree<RootState, RootState> = {
  async [ActionTypes.getRecentPitches]({ commit }) {
    commit(MutationTypes.GET_RECENT_PITCHES_REQUEST)

    const getRecent = container.resolve(GetRecent)
    // Just to make it wait for a while
    await sleep(1000)

    await getRecent.execute(null, {
      onSuccess: (pitches) => {
        commit(MutationTypes.GET_RECENT_PITCHES_SUCCESS, pitches)
      },
      onClientError: (error) => {
        commit(
          MutationTypes.GET_RECENT_PITCHES_ERROR,
          `oops I Freaked up with a ${error.status} error! : ${error.message}`
        )
      },
      onServerError: (error) => {
        commit(
          MutationTypes.GET_RECENT_PITCHES_ERROR,
          `heheeh it is on them ${error.name}`
        )
      },
      onParseError: (error) => {
        commit(
          MutationTypes.GET_RECENT_PITCHES_ERROR,
          `Parse Error! ${error.message}`
        )
      }
    })

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}

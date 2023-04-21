import { defineStore } from 'pinia'

export interface WsPermissionState {
  funcRightDtos: FuncRightType[]
}

export const useWsPermissionStore = defineStore({
  id: 'wsPermission',
  state: (): WsPermissionState => ({
    funcRightDtos: []
  }),
  // persist: {
  //   enabled: true
  // },
  getters: {
    getPermissionList(): FuncRightType[] {
      return this.funcRightDtos
    }
  },
  actions: {
    setFuncPermission(funcRights: FuncRightType[]) {
      this.funcRightDtos = funcRights
    }
  }
})

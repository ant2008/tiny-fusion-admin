import { defineStore } from 'pinia'

export interface WsStoreState {
  sysCodeDicts: Recordable<WsDictType[]>
  roleDicts: WsDictType[]
  userDicts: WsDictType[]
  orgDicts: WsDictType[]
  deptDicts: WsDictType[]
  priceGroupDicts: WsDictType[]
  esStoreDicts: WsDictType[]
  expressDicts: WsDictType[]
  areaDicts: CommDictType[]
  glClassDicts: WsOptsType[]
  scheduleSiteDicts: WsDictType[]
  medicalDeptDicts: WsOptsType[]
  topSysCodeDicts: WsOptsType[]
}

export const useWsStore = defineStore({
  id: 'wsStore',
  state: (): WsStoreState => ({
    sysCodeDicts: {},
    roleDicts: [],
    userDicts: [],
    orgDicts: [],
    deptDicts: [],
    priceGroupDicts: [],
    esStoreDicts: [],
    expressDicts: [],
    areaDicts: [],
    glClassDicts: [],
    scheduleSiteDicts: [],
    medicalDeptDicts: [],
    topSysCodeDicts: []
  }),
  // persist: {
  //   enabled: true
  // },
  actions: {
    setSysCodeDicts(sysCodeDicts: Recordable<WsDictType[]>): void {
      this.sysCodeDicts = sysCodeDicts
    },
    setRoleDicts(roleDicts: WsDictType[]): void {
      this.roleDicts = roleDicts
    },
    setUserDicts(userDicts: WsDictType[]): void {
      this.userDicts = userDicts
    },
    setOrgDicts(orgDicts: WsDictType[]): void {
      this.orgDicts = orgDicts
    },
    setDeptDicts(deptDicts: WsDictType[]): void {
      this.deptDicts = deptDicts
    },
    setPriceGroupDicts(priceGroupDicts: WsDictType[]): void {
      this.priceGroupDicts = priceGroupDicts
    },
    setEsStoreDicts(esStoreDicts: WsDictType[]): void {
      this.esStoreDicts = esStoreDicts
    },
    setExpressDicts(expressDicts: WsDictType[]): void {
      this.expressDicts = expressDicts
    },
    setAreaDicts(areaDicts: CommDictType[]): void {
      this.areaDicts = areaDicts
    },
    setGlClassDicts(glClassDicts: WsOptsType[]): void {
      this.glClassDicts = glClassDicts
    },
    setScheduleSiteDicts(scheduleSiteDicts: WsDictType[]): void {
      this.scheduleSiteDicts = scheduleSiteDicts
    },
    setMedicalDeptDicts(medicalDeptDicts: WsOptsType[]): void {
      this.medicalDeptDicts = medicalDeptDicts
    },
    setTopSysCodeDits(topSysCodeDicts: WsOptsType[]): void {
      this.topSysCodeDicts = topSysCodeDicts
    }
  }
})

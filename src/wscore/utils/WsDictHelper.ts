import { useWsStore } from '@/wscore/store/wsStore'

const wsStore = useWsStore()

// 根据key获取符合select的格式。
export const getSyscodeSelect = (key): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const codeArr: WsDictType[] = wsStore.sysCodeDicts[key]
  if (codeArr == null || codeArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = codeArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: String(val.value)
      })
    })
  }

  return selectArr
}

export const getSyscodeSelectInt = (key): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const codeArr: WsDictType[] = wsStore.sysCodeDicts[key]

  if (codeArr == null || codeArr.length <= 0) {
    selectArr.push({
      label: '',
      value: undefined
    })
  } else {
    selectArr = codeArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: parseInt(val.value)
      })
    })
  }

  return selectArr
}

export const getRoleDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const roleArr: WsDictType[] = wsStore.roleDicts

  if (roleArr == null || roleArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = roleArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getUserDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const userDictsArr: WsDictType[] = wsStore.userDicts

  if (userDictsArr == null || userDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = userDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getOrgDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const orgDictsArr: WsDictType[] = wsStore.orgDicts

  if (orgDictsArr == null || orgDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = orgDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getDeptDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const deptDictsArr: WsDictType[] = wsStore.deptDicts

  if (deptDictsArr == null || deptDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = deptDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getPriceGroupDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const priceGroupDictsArr: WsDictType[] = wsStore.priceGroupDicts

  if (priceGroupDictsArr == null || priceGroupDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = priceGroupDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getEsStoreDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: WsDictType[] = wsStore.esStoreDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getExPressDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: WsDictType[] = wsStore.expressDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getAreaDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: CommDictType[] = wsStore.areaDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.label,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getGlClassDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: WsOptsType[] = wsStore.glClassDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.label,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getScheduleSiteDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: WsDictType[] = wsStore.scheduleSiteDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.name,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getMedicalDepartDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: WsOptsType[] = wsStore.medicalDeptDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.label,
        value: val.value
      })
    })
  }

  return selectArr
}

export const getTopSysCodeDictsSelect = (): SelectOptionType[] => {
  let selectArr: SelectOptionType[] = []
  const tmpDictsArr: WsOptsType[] = wsStore.topSysCodeDicts

  if (tmpDictsArr == null || tmpDictsArr.length <= 0) {
    selectArr.push({
      label: '',
      value: ''
    })
  } else {
    selectArr = tmpDictsArr.map<SelectOptionType>((val) => {
      return Object.assign({
        label: val.label,
        value: val.value
      })
    })
  }

  return selectArr
}

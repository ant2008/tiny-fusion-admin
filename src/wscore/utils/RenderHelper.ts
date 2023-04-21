import { h } from 'vue'
import { ElTag } from 'element-plus'
import { isEmpty } from '@/utils/is'
import { useWsStore } from '@/wscore/store/wsStore'
import { formatDate } from '@vueuse/core'

const wsStore = useWsStore()

export const renderTag = (text, color) => {
  return isEmpty(text) ? h('span', text) : h(ElTag, { color }, () => text)
}

export const renderSysCodeDict = (v, key, renderTag = false) => {
  let text = ''
  const sysCodeDicts: WsDictType[] = wsStore.sysCodeDicts[key]
  const obj = sysCodeDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return isEmpty(text) || !renderTag ? h('span', text) : h(ElTag, text)
}

export const renderUserDict = (v) => {
  let text = ''
  const userDicts: WsDictType[] = wsStore.userDicts
  const obj = userDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderRoleDict = (v) => {
  let text = ''
  const roleDicts: WsDictType[] = wsStore.roleDicts
  const obj = roleDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderOrgDict = (v) => {
  let text = ''
  const tmpDicts: WsDictType[] = wsStore.orgDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderDeptDict = (v) => {
  let text = ''
  const tmpDicts: WsDictType[] = wsStore.deptDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderPriceGroupDict = (v) => {
  let text = ''
  const tmpDicts: WsDictType[] = wsStore.priceGroupDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderEsStoreDict = (v) => {
  let text = ''
  const tmpDicts: WsDictType[] = wsStore.esStoreDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderExpressDict = (v) => {
  let text = ''
  const tmpDicts: WsDictType[] = wsStore.expressDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderAreaDict = (v) => {
  let text = ''
  const tmpDicts: CommDictType[] = wsStore.areaDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].label
  }
  return text
}

export const renderGlClassDict = (v) => {
  let text = ''
  const tmpDicts: WsOptsType[] = wsStore.glClassDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].label
  }
  return text
}

export const renderScheduleSiteDict = (v) => {
  let text = ''
  const tmpDicts: WsDictType[] = wsStore.scheduleSiteDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].name
  }
  return text
}

export const renderMedicalDepartSiteDict = (v) => {
  let text = ''
  const tmpDicts: WsOptsType[] = wsStore.medicalDeptDicts
  const obj = tmpDicts.filter((item) => {
    return item.value == v
  })
  if (obj.length > 0) {
    text = obj[0].label
  }
  return text
}

export const renderDate = (v) => {
  if (v == null) {
    return ''
  }
  return formatDate(new Date(v), 'YYYY-MM-DD')
}

export const renderDateTime = (v) => {
  if (v == null) {
    return ''
  }
  return formatDate(new Date(v), 'YYYY-MM-DD HH:mm:ss')
}

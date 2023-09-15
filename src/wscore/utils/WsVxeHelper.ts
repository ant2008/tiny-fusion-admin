//处理master表中存在的_X_ROW_KEY字段
export const handleDataVxeRowKey = (masterData: any) => {
  if (masterData !== null && typeof masterData !== 'undefined') {
    if (masterData.hasOwnProperty('_X_ROW_KEY')) {
      Reflect.deleteProperty(masterData, '_X_ROW_KEY')
    }
  }

  return masterData
}

//处理vxetalbe自带的_X_ROW_KEY元素
export const handleTableArraysVxeRowKey = (arrDatas: any[]) => {
  if (arrDatas.length <= 0) return null
  let i = 0
  for (i = 0; i < arrDatas.length; i++) {
    if (Reflect.has(arrDatas[i], '_X_ROW_KEY')) {
      Reflect.deleteProperty(arrDatas[i], '_X_ROW_KEY')
    }
  }
  return arrDatas
}

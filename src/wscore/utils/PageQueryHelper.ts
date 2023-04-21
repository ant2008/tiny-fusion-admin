import { WsFormSearchSchema, WsSearchConRequest } from '@/wscore/types/wsform'
import { unref } from 'vue'

export const buildQueryJson = (searchFormData: Recordable) => {
  const conRequestArrs: WsSearchConRequest[] = []

  //debug
  console.log('buildQueryJson:', searchFormData)
  const queryFields: WsFormSearchSchema[] = unref(searchFormData.formDatas) as WsFormSearchSchema[]

  //debug
  console.log('queryFields', queryFields)
  queryFields.forEach((val) => {
    const conRequest: WsSearchConRequest = {
      colName: val.field,
      colValue: val.value,
      opat: '=',
      rela: 'and',
      colType: 'String',
      leftBracket: '',
      rightBracket: ''
    }
    if (val.fieldDbType !== undefined) {
      conRequest.colType = val.fieldDbType
    }

    if (val.fieldOp !== undefined) {
      conRequest.opat = val.fieldOp
    }

    //对操作符进行相应的处理。
    if (conRequest.opat === 'like' || conRequest.opat === 'LIKE' || conRequest.opat === 'Like') {
      conRequest.colValue = conRequest.colValue === '' ? '%%' : conRequest.colValue + '%'
    } else if (
      (conRequest.opat === 'between' || conRequest.opat === 'BETWEEN') &&
      val.field === 'daterange'
    ) {
      // 获取日期的范围数组
      const dateArr = conRequest.colValue // field.fieldValue;

      if (dateArr === null || dateArr.length !== 2) {
        console.error('日期范围获取错误!')
        return
      } else {
        const tmpStartDate = dateArr[0]
        const tmpEndDate = dateArr[1]

        // 重新组建日期范围数值。

        // 加入数组
        // 开始日期
        conRequestArrs.push({
          colValue: tmpStartDate,
          opat: '>=',
          colType: 'timestamp',
          rela: 'and',
          colName: conRequest.colName,
          leftBracket: '',
          rightBracket: ''
        })

        conRequestArrs.push({
          colValue: tmpEndDate,
          opat: '<=',
          colType: 'timestamp',
          rela: 'and',
          colName: conRequest.colName,
          leftBracket: '',
          rightBracket: ''
        })
      }
    } else {
      // 如果是int,则把数值转换成int
      conRequest.colValue = val.value // field.fieldValue ;
    }
    conRequestArrs.push(conRequest)
  })
  return JSON.stringify(conRequestArrs)
}

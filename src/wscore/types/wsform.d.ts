import {
  ColProps,
  ComponentName,
  ComponentProps,
  FormItemProps,
  FormValueType
} from '@ty/componentType/form'
import { WsComponentName } from '@/wscore/types/wscomponentName'

declare type WsFormSearchSchema = {
  // 唯一值
  field: string
  // 标题
  label?: string
  // 提示
  labelMessage?: string
  // col组件属性
  colProps?: ColProps
  // 表单组件属性，slots对应的是表单组件的插槽，规则：${field}-xxx，具体可以查看element-plus文档
  componentProps?: { slots?: Recordable } & ComponentProps
  // formItem组件属性
  formItemProps?: FormItemProps
  // 渲染的组件
  component?: ComponentName | WsComponentName
  // 初始值
  value?: FormValueType
  // 是否隐藏
  hidden?: boolean
  /**
   * @returns 远程加载下拉项
   */
  optionApi?: any
  //TO WSCORE
  //字段查询条件
  fieldOp?: string
  //字段关系
  fieldRelation?: string
  //字段数据库类型
  fieldDbType?: string
}

declare type WsSearchConRequest = {
  colName: string
  opat: string
  colValue: any
  rela: 'and' | 'or' | ''
  colType: string
  leftBracket: '(' | ''
  rightBracket: ')' | ''
}

declare type WsResultObj = {
  total: number
  list: any
}

// export interface FormProps extends Partial<ElFormProps> {
//   schema?: FormSchema[]
//   isCol?: boolean
//   model?: Recordable
//   autoSetPlaceholder?: boolean
//   isCustom?: boolean
//   [key: string]: any
// }

<script lang="tsx">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  PropType,
  ref,
  unref,
  watch
} from 'vue'
import { ElCol, ElForm, ElFormItem, ElRow, ElTooltip } from 'element-plus'
import { componentMap } from '@/components/Form/src/componentMap'
import { propTypes } from '@/utils/propTypes'
import { getSlot } from '@/utils/tsxHelper'
import {
  initModel,
  setComponentProps,
  setFormItemSlots,
  setGridProp,
  setItemComponentSlots,
  setTextPlaceholder
} from '@/components/Form/src/helper'
import { useRenderSelect } from '@/components/Form/src/components/useRenderSelect'
import { useRenderRadio } from '@/components/Form/src/components/useRenderRadio'

import { useDesign } from '@/hooks/web/useDesign'
import { findIndex } from '@/utils'
import { set } from 'lodash-es'
import { FormProps } from '@/components/Form/src/types'
import { Icon } from '@/components/Icon'
import { WsFormSearchSchema } from '@/wscore/types/wsform'
import { FormSchema, FormSetPropsType } from '@/types/form'
import { useRenderCheckbox } from '@/components/Form/src/components/useRenderCheckbox'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('form')

export default defineComponent({
  name: 'WsForm',
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    // 是否需要栅格布局
    isCol: propTypes.bool.def(true),
    // 表单数据对象
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: propTypes.bool.def(false),
    // 是否自定义内容
    isCustom: propTypes.bool.def(false),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto')
  },
  emits: ['register', 'ev-item-return'],
  setup(props, { slots, expose, emit }) {
    // element form 实例
    const elFormRef = ref<ComponentRef<typeof ElForm>>()

    const thsForm = getCurrentInstance()

    // useForm传入的props
    const outsideProps = ref<FormProps>({})

    const mergeProps = ref<FormProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    // 表单数据
    const formModel = ref<Recordable>({})

    onMounted(() => {
      emit('register', unref(thsForm), unref(elFormRef))
    })

    // 对表单赋值
    const setValues = (data: Recordable = {}) => {
      formModel.value = Object.assign(unref(formModel), data)
    }

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const delSchema = (field: string) => {
      const { schema } = unref(getProps)

      const index = findIndex(schema, (v: FormSchema) => v.field === field)
      if (index > -1) {
        schema.splice(index, 1)
      }
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      const { schema } = unref(getProps)
      if (index !== void 0) {
        schema.splice(index, 0, formSchema)
        return
      }
      schema.push(formSchema)
    }

    const setSchema = (schemaProps: FormSetPropsType[]) => {
      const { schema } = unref(getProps)
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          }
        }
      }
      //强制刷新
      unref(elFormRef)?.$forceUpdate()
    }

    const getElFormRef = (): ComponentRef<typeof ElForm> => {
      return unref(elFormRef) as ComponentRef<typeof ElForm>
    }

    const getFormSchemaDatas = (): FormSchema[] => {
      const { schema } = unref(getProps)
      //此处还是必须用unref，不然导致获取不到对应的对象，使用unref解除响应关系
      const model = unref(formModel)
      //删除action列。
      const actionIdx = schema?.findIndex((val) => {
        return val.field === 'action'
      })
      if (actionIdx >= 0) {
        schema?.splice(actionIdx)
      }
      //删除非输入列。
      // const delIdx = schema?.findIndex((val) => {
      //   return val.field == ''
      // })
      // if (delIdx >= 0) {
      //   schema?.splice(delIdx)
      // }

      //循环数组，如果不存在则删除。
      for (let i = 0; i < schema?.length; i++) {
        const v = schema[i]
        //删除特殊的元素。
        if (v.field === '') {
          schema?.splice(i, 1)
          i--
        } else {
          const hasField = Reflect.has(model, v.field)
          // 如果先前已经有值存在，则不进行重新赋值，而是采用现有的值
          //model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : ''
          if (hasField) {
            //判断是否有数值，如果没有数值也不提交。
            const modelValue = model[v.field]
            //debug
            // console.log(v.field, modelValue)
            if (modelValue === null || modelValue === undefined || modelValue === '') {
              schema?.splice(i, 1)
              i--
            } else {
              set(v, 'value', model[v.field])
            }
          }
        }
      }
      return unref(schema)
    }

    const setFormFieldReadOnly = (readOnlyFlag: boolean): Recordable => {
      //获取现有的属性。
      const { schema } = unref(getProps)
      //判断是否有readonly属性
      schema?.forEach((val) => {
        let cmpProps = val?.componentProps
        if (cmpProps !== undefined) {
          if (Reflect.has(cmpProps, 'readonly')) {
            cmpProps['readonly'] = cmpProps['readonly'] || readOnlyFlag
          } else {
            Reflect.set(cmpProps, 'readonly', readOnlyFlag)
          }
        } else {
          const rd = { readonly: readOnlyFlag }
          Reflect.set(val, 'componentProps', rd)
        }
      })
      return schema
    }

    const getFormData = (): Recordable => {
      //此处还是必须用unref，不然导致获取不到对应的对象，使用unref解除响应关系
      return unref(formModel)
    }

    expose({
      setValues,
      formModel,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      getElFormRef,
      getFormSchemaDatas,
      setFormFieldReadOnly,
      getFormData
    })

    // 监听表单结构化数组，重新生成formModel
    watch(
      () => unref(getProps).schema,
      (schema = []) => {
        formModel.value = initModel(schema, unref(formModel))
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps)
      const content = isCol ? (
        <ElRow gutter={20}>{renderFormItemWrap()}</ElRow>
      ) : (
        renderFormItemWrap()
      )
      return content
    }

    // 是否要渲染el-col
    const renderFormItemWrap = () => {
      // hidden属性表示隐藏，不做渲染
      const { schema = [], isCol } = unref(getProps)

      return schema
        .filter((v) => !v.hidden)
        .map((item) => {
          // 如果是 Divider 组件，需要自己占用一行
          const isDivider = item.component === 'Divider'
          const Com = componentMap['Divider'] as ReturnType<typeof defineComponent>
          return isDivider ? (
            <Com {...{ contentPosition: 'left', ...item.componentProps }}>{item?.label}</Com>
          ) : isCol ? (
            // 如果需要栅格，需要包裹 ElCol
            <ElCol {...setGridProp(item.colProps)}>{renderFormItem(item)}</ElCol>
          ) : (
            renderFormItem(item)
          )
        })
    }

    // 渲染formItem
    const renderFormItem = (item: WsFormSearchSchema) => {
      // 单独给只有options属性的组件做判断
      const notRenderOptions = ['SelectV2', 'Cascader', 'Transfer']
      const slotsMap: Recordable = {
        ...setItemComponentSlots(slots, item?.componentProps?.slots, item.field)
      }
      if (
        item?.component !== 'SelectV2' &&
        item?.component !== 'Cascader' &&
        item?.componentProps?.options
      ) {
        slotsMap.default = () => renderOptions(item)
      }

      const formItemSlots: Recordable = setFormItemSlots(slots, item.field)
      // 如果有 labelMessage，自动使用插槽渲染
      if (item?.labelMessage) {
        formItemSlots.label = () => {
          return (
            <>
              <span>{item.label}</span>
              <ElTooltip placement="right" raw-content>
                {{
                  content: () => <span v-html={item.labelMessage}></span>,
                  default: () => (
                    <Icon
                      icon="ep:warning"
                      size={16}
                      color="var(--el-color-primary)"
                      class="ml-2px relative top-1px"
                    ></Icon>
                  )
                }}
              </ElTooltip>
            </>
          )
        }
      }
      return (
        <ElFormItem {...(item.formItemProps || {})} prop={item.field} label={item.label || ''}>
          {{
            ...formItemSlots,
            default: () => {
              const Com = componentMap[item.component as string] as ReturnType<
                typeof defineComponent
              >

              const { autoSetPlaceholder } = unref(getProps)

              return slots[item.field] ? (
                getSlot(slots, item.field, { item })
              ) : (
                <Com
                  vModel={formModel.value[item.field]}
                  {...(autoSetPlaceholder && setTextPlaceholder(item))}
                  {...setComponentProps(item)}
                  {...(notRenderOptions.includes(item?.component as string) &&
                  item?.componentProps?.options
                    ? { options: item?.componentProps?.options || [] }
                    : {})}
                >
                  {{ ...slotsMap }}
                </Com>
              )
            }
          }}
        </ElFormItem>
      )
    }

    // 渲染options
    const renderOptions = (item: FormSchema) => {
      switch (item.component) {
        case 'Select':
          const { renderSelectOptions } = useRenderSelect(slots)
          return renderSelectOptions(item)
        case 'Radio':
        case 'RadioButton':
          const { renderRadioOptions } = useRenderRadio()
          return renderRadioOptions(item)
        case 'Checkbox':
        case 'CheckboxButton':
          const { renderCheckboxOptions } = useRenderCheckbox()
          return renderCheckboxOptions(item)
        default:
          break
      }
    }

    // 过滤传入Form组件的属性
    const getFormBindValue = () => {
      // 避免在标签上出现多余的属性
      const delKeys = ['schema', 'isCol', 'autoSetPlaceholder', 'isCustom', 'model']
      const props = { ...unref(getProps) }
      for (const key in props) {
        if (delKeys.indexOf(key) !== -1) {
          delete props[key]
        }
      }
      return props
    }

    // const doItemReturn = (itemName, itemValue, retData) => {
    //   alert('event1')
    //   emit('ev-item-return', itemName, itemValue, retData)
    // }

    return () => (
      <ElForm
        ref={elFormRef}
        {...getFormBindValue()}
        model={props.isCustom ? props.model : formModel}
        class={prefixCls}
      >
        {{
          // 如果需要自定义，就什么都不渲染，而是提供默认插槽
          default: () => {
            const { isCustom } = unref(getProps)
            return isCustom ? getSlot(slots, 'default') : renderWrap()
          }
        }}
      </ElForm>
    )
  }
})
</script>

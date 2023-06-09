<script lang="tsx">
import { defineComponent, getCurrentInstance, onMounted, PropType, ref, Slots, unref } from 'vue'
import { FormSchema, FormSetPropsType } from '@/types/form'
import { propTypes } from '@/utils/propTypes'
import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from 'vue-i18n'
import { ElTabs, ElTabPane, ElButton, ElDivider, ElMessageBox } from 'element-plus'
// import { Toolbar as VxeToolbar, VxeButtonEvents, VxeTableInstance } from 'vxe-table'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { TableColumn, TableSlotDefault } from '@/types/table'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { useWsForm } from '@/wscore/hook/useWsForm'
import { FormProps } from '@/components/Form/src/types'
import { FormOpera, getGridDetailApi } from '@/wscore/api/base/base'
import { getSlot } from '@/utils/tsxHelper'
import { isFunction } from 'lodash-es'

export default defineComponent({
  name: 'WsForm',
  props: {
    editSchema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    detailColumns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    show: propTypes.bool.def(false),
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    isCol: propTypes.bool.def(true),
    funcNo: propTypes.string.def(''),
    detailDataList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['register', 'evExit', 'evSave'],
  setup(props, { slots, expose, emit }) {
    const { t } = useI18n()
    const formVisible = ref(false)
    const thsMdForm = getCurrentInstance()
    const saveLoadingFlag = ref(false)
    const formOpera = ref('init')
    const activeTabName = ref('')
    const detailTableDatas = ref([])
    //使用form
    const { register: formRegister, methods: formMethods } = useWsForm()
    //使用detailtable
    const {
      register: tableRegister,
      tableObject: detailTableObject,
      methods: detailTableMethods
    } = useWsTable()

    //获取refs
    //===注册事件
    onMounted(() => {
      emit('register', unref(thsMdForm))
    })
    //========Form Function
    // useForm传入的props
    const outsideProps = ref<FormProps>({})

    const mergeProps = ref<FormProps>({})

    // const getProps = computed(() => {
    //   const propsObj = { ...props }
    //   Object.assign(propsObj, unref(mergeProps))
    //   return propsObj
    // })

    // 对表单赋值
    const setValues = (data: Recordable = {}) => {
      formMethods.setValues(data)
    }

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const delSchema = (field: string) => {
      formMethods.delSchema(field)
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      formMethods.addSchema(formSchema, index)
    }

    const setSchema = (schemaProps: FormSetPropsType[]) => {
      formMethods.setSchema(schemaProps)
    }

    const showMdForm = () => {
      formVisible.value = true
    }

    const hideMdForm = () => {
      formVisible.value = false
    }

    const setFormFieldReadOnly = (readOnlyFlag: boolean) => {
      formMethods.setFormFieldReadOnly(readOnlyFlag)
    }

    const setFormOpera = (formOp: FormOpera) => {
      formOpera.value = formOp
    }

    const getFormData = async () => {
      return await formMethods.getFormData()
    }

    const getMdTableDatas = async (funcNo: string, idx: string) => {
      const res = await getGridDetailApi({
        funcNo: funcNo,
        idx: idx
      })
      if (res?.dataList !== null) {
        detailTableDatas.value = res.dataList
      }
      activeTabName.value = 'MD1'
    }
    //===========明细表格的按钮处理========================
    const insertMdTable = () => {
      //debug
      console.log('insertMdTable', slots)
      detailTableMethods.insertTableRow({}, -1)
    }

    const delMdTableRow = () => {
      ElMessageBox.confirm('是否删除选中行?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          detailTableMethods.delTableSelectRow()
        })
        .catch(() => {})
    }

    const getDetailTableModDatas = async (): Promise<WsTableRecordSet> => {
      return await detailTableMethods.getModRecords()
    }

    const getDetailTableDatas = async (): Promise<WsTableDatas> => {
      return await detailTableMethods.getTableDatas()
    }

    //===========当前使用逻辑处理函数========================
    //处理vxetalbe自带的_X_ROW_KEY元素
    const handleVxetableArrays = (arrDatas: any[]) => {
      if (arrDatas.length <= 0) return null
      let i = 0
      for (i = 0; i < arrDatas.length; i++) {
        if (Reflect.has(arrDatas[i], '_X_ROW_KEY')) {
          Reflect.deleteProperty(arrDatas[i], '_X_ROW_KEY')
        }
      }
      // arrDatas.every((value, index, array) => {
      //   if (Reflect.has(value, '_X_ROW_KEY')) {
      //     Reflect.deleteProperty(value, '_X_ROW_KEY')
      //   }
      // })
      return arrDatas
    }

    const doSave = () => {
      getFormData().then((res) => {
        getDetailTableDatas().then((res2) => {
          emit('evSave', unref(res), handleVxetableArrays(unref(res2).fullData), unref(formOpera))
          formVisible.value = false
          formOpera.value = 'init'
        })
      })
    }

    const doExit = () => {
      formVisible.value = false
      formOpera.value = 'init'
      emit('evExit', formVisible.value, formOpera.value)
    }

    //====暴露可调用函数
    expose({
      setValues,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      showMdForm,
      hideMdForm,
      setFormFieldReadOnly,
      setFormOpera,
      getFormData,
      getMdTableDatas,
      getDetailTableModDatas,
      getDetailTableDatas
    })
    //====================组件展现部分==========================
    const renderVxeToolbar = () => {
      const bt = (
        <>
          <vxe-button
            status="primary"
            content="新增行"
            onClick={insertMdTable}
            v-show={formOpera.value == FormOpera.ADD || formOpera.value == FormOpera.MOD}
          />
          <vxe-button
            status="warning"
            content="删除行"
            onClick={delMdTableRow}
            v-show={formOpera.value == FormOpera.ADD || formOpera.value == FormOpera.MOD}
          />
        </>
      )

      return bt
    }

    const setMdSlots = (sts: Slots, columnsArr: TableColumn[]): Recordable => {
      const slotObj: Recordable = {}
      columnsArr?.map((v) => {
        const stFn = sts[v.field]
        if (isFunction(stFn)) {
          //debug
          console.log('renderMdSlots', v.field, slotObj[v.field])
          slotObj[v.field] = (data: TableSlotDefault) => {
            //debug
            console.log('slotObj', slotObj[v.field], data)
            return getSlot(slots, v.field, data)
          }
        }
      })
      return slotObj
    }

    const setMdEditSlots = (sts: Slots, columnsArr: TableColumn[]): Recordable => {
      const slotObj: Recordable = {}
      columnsArr?.map((v) => {
        const stFn = sts[v.field.concat('-edit')]
        if (isFunction(stFn)) {
          //debug
          console.log('editSlots', v.field)
          slotObj[v.field.concat('-edit')] = (data: TableSlotDefault) => {
            return getSlot(slots, v.field.concat('-edit'), data)
          }
        }
      })
      return slotObj
    }

    //slots handle
    const slotsMap: Recordable = setMdSlots(slots, props.detailColumns)
    const slotEditMap: Recordable = setMdEditSlots(slots, props.detailColumns)

    return () => (
      <ContentWrap v-show={!!formVisible.value}>
        <ContentWrap>
          <WsForm
            isCustom={false}
            labelWidth={props.labelWidth}
            isCol={props.isCol}
            schema={props.editSchema}
            onRegister={formRegister}
            ref="thsMdFormInner"
          />
        </ContentWrap>
        <ContentWrap>
          <ElTabs model-value={unref(activeTabName)}>
            <ElTabPane label="明细信息" name="MD1">
              <vxe-toolbar>
                {{
                  buttons: () => renderVxeToolbar()
                }}
              </vxe-toolbar>
              <WsTable
                columns={props.detailColumns}
                data={unref(detailTableDatas)}
                loading={detailTableObject.loading}
                height="600"
                v-model:pageSize={detailTableObject.pageSize}
                v-model:currentPage={detailTableObject.currentPage}
                pagination={{
                  total: detailTableObject.total,
                  disabled: false
                }}
                edit-config={{
                  trigger: 'click',
                  mode: 'row',
                  autoClear: true,
                  showStatus: true,
                  enabled:
                    formOpera.value === FormOpera.ADD ? true : formOpera.value === FormOpera.MOD
                }}
                keep-source
                onRegister={tableRegister}
                ref="thsMdTableInner"
                row-config={{
                  useKey: false
                }}
              >
                {{
                  ...slotsMap,
                  ...slotEditMap
                  // actionexp: (data: TableSlotDefault) => getSlot(slots, 'action', data)
                }}
              </WsTable>
            </ElTabPane>
          </ElTabs>
        </ContentWrap>
        <div className="text-center">
          <ElDivider />
          <ElButton
            type="primary"
            loading={unref(saveLoadingFlag)}
            onClick={doSave}
            v-show={unref(formOpera) == 'ADD' || unref(formOpera) == 'MOD'}
          >
            {t('wsBase.save')}
          </ElButton>
          <ElButton onClick={doExit}>{t('wsBase.cancel')}</ElButton>
        </div>
      </ContentWrap>
    )
  }
})
</script>

<style scoped></style>

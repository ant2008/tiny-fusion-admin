// import { useI18n } from '@/hooks/web/useI18n'
import { TableProps } from '@/components/Table/src/types'
import { computed, nextTick, reactive, ref, unref, watch } from 'vue'
import { assign, get } from 'lodash-es'
import { TableExpose } from '@/components/Table'
// import { ElMessage, ElMessageBox } from 'element-plus'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { TableSetProps } from '@/components/Table'
import VXETable from 'vxe-table'

// const { t } = useI18n()

interface TableResponse<T = any> {
  total: number
  list: T[]
  pageNumber: number
  pageSize: number
}

interface UseTableConfig<T = any> {
  // getListApi: (option: L) => AxiosPromise<T>
  // delListApi?: (option: AxiosConfig) => AxiosPromise<unknown>
  // 返回数据格式配置
  response: {
    list: string
    total?: string
  }
  props?: TableProps
  pageQuery: (option: any) => Promise<IResponse<TableResponse<T>>>
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  tableList: T[]
  parmasObj: any
  loading: boolean
  currentRow: Nullable<T>
}

// export const useWsTable = <T, K, L extends AxiosConfig = AxiosConfig>(
//     config?: UseTableConfig<T, L>
// )
export const useWsTable = <T = any>(config?: UseTableConfig<T>) => {
  const tableObject = reactive<TableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    parmasObj: {},
    // 加载中
    loading: false,
    // 当前行的数据
    currentRow: null
  })

  const parmasObj = computed(() => {
    return assign(
      {
        params: {
          pageSize: tableObject.pageSize,
          pageIndex: tableObject.currentPage
        }
      },
      tableObject.parmasObj
    )
  })

  // const pageRequestObj = computed(() => {
  //   return assign({
  //     pageRequest: {
  //       aPage: tableObject.currentPage | 0,
  //       aSize: tableObject.pageSize | 10,
  //       aConMapJson: buildQueryJson(tableObject.parmasObj)
  //     },
  //     funcNo: ''
  //   })
  // })

  watch(
    () => tableObject.currentPage,
    () => {
      // methods.getList()
      //debug
      console.log('currentPage', tableObject)
      unref(parmasObj).params.pageIndex = tableObject.currentPage
      console.log('paramObj', parmasObj)
      methods.getList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      tableObject.currentPage = 1
      unref(parmasObj).params.pageIndex = tableObject.currentPage
      unref(parmasObj).params.pageSize = tableObject.pageSize
      methods.getList()
    }
  )

  // Table实例
  const tableRef = ref<typeof WsTable & TableExpose>()

  // ElTable实例
  // const elTableRef = ref<ComponentRef<typeof WsTable>>()
  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof VXETable>>()

  const register = (ref: typeof WsTable & TableExpose, elRef: ComponentRef<typeof VXETable>) => {
    tableRef.value = ref
    elTableRef.value = elRef
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  // 不知道要干嘛用，暂时屏蔽
  // const delData = async (paramsObj: AxiosConfig, ids: string[] | number[]) => {
  //   const res = await (config?.delListApi && config?.delListApi(paramsObj))
  //   if (res) {
  //     ElMessage.success(t('common.delSuccess'))
  //
  //     // 计算出临界点
  //     const currentPage =
  //       tableObject.total % tableObject.pageSize === ids.length || tableObject.pageSize === 1
  //         ? tableObject.currentPage > 1
  //           ? tableObject.currentPage - 1
  //           : tableObject.currentPage
  //         : tableObject.currentPage
  //
  //     tableObject.currentPage = currentPage
  //     // methods.getList()
  //   }
  // }

  const methods: {
    setProps: (props: Recordable) => void
    setColumn: (columnProps: TableSetProps[]) => void
    setSearchParmas: (data: Recordable) => void
    getSelections: () => Promise<T[]>
    // delList: (ids: string[] | number[], multiple: boolean, message?: boolean) => Promise<void>
    getList: () => Promise<void>
    //单纯设置datas
    setListDatas: (datas: []) => void
    //设置vxetable行编辑
    setTableRowEdit: (row: any) => void
    cancelTableRowEdit: (row: any) => void
    insertTableRow: (newRecord: any, rowNumber: any) => void
    delTableSelectRow: () => void
    getModRecords: () => Promise<WsTableRecordSet>
    getTableDatas: () => Promise<WsTableDatas>
    setEditRowData: (name: string, value: any) => Promise<any>
    getEditRowData: () => Promise<any>
    reloadRowData: (rows: any | any[]) => Promise<any>
  } = {
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: TableSetProps[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParmas: (data: Recordable) => {
      //debug
      console.log('tableObject', tableObject)
      tableObject.currentPage = 1
      tableObject.parmasObj = Object.assign(tableObject.parmasObj, {
        params: {
          pageSize: tableObject.pageSize,
          pageIndex: tableObject.currentPage,
          formDatas: data
        }
      })
      methods.getList()
    },
    // 删除数据
    // delList: async (ids: string[] | number[], multiple: boolean, message = true) => {
    //   const tableRef = await getTable()
    //   if (multiple) {
    //     if (!tableRef?.selections.length) {
    //       ElMessage.warning(t('common.delNoData'))
    //       return
    //     }
    //   } else {
    //     if (!tableObject.currentRow) {
    //       ElMessage.warning(t('common.delNoData'))
    //       return
    //     }
    //   }
    //   const paramsObj: AxiosConfig = {
    //     data: {
    //       ids
    //     }
    //   }
    //   if (message) {
    //     ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
    //       confirmButtonText: t('common.delOk'),
    //       cancelButtonText: t('common.delCancel'),
    //       type: 'warning'
    //     })
    //       .then(async () => {
    //         await delData(paramsObj, ids)
    //       })
    //       .catch(() => {})
    //   } else {
    //     await delData(paramsObj, ids)
    //   }
    // },
    getList: async () => {
      //debug
      console.log('getlist start....', tableObject)
      tableObject.loading = true
      // const res = await config
      //   ?.getListApi(unref(parmasObj) as L)
      //   .catch(() => {})
      //   .finally(() => {
      //     tableObject.loading = false
      //   })
      // if (res) {
      //   tableObject.tableList = get(res.data || {}, config?.response.list as string)
      //   tableObject.total = get(res.data || {}, config?.response?.total as string) || 0
      // }

      tableObject.loading = true
      const res = await config
        ?.pageQuery(unref(parmasObj))
        .catch(() => {})
        .finally(() => {
          tableObject.loading = false
        })
      //debug
      console.log('pagequery retsult', res)
      if (res) {
        //针对服务情况进行处理，过渡阶段方案，后续必须统一
        if (Reflect.has(res, 'page') && res['page'] !== null && res['page'] !== undefined) {
          tableObject.tableList = res['page']['pageDatas']
          tableObject.total = res['page']['totalRows']
        } else if (
          Reflect.has(res, 'dataList') &&
          res['dataList'] !== null &&
          res['dataList'] !== undefined
        ) {
          tableObject.tableList = res['dataList']
          tableObject.total = get(res['dataList'] || {}, config?.response?.total as string) || 0
          //debug
          console.log('tab-object', tableObject.tableList)
        } else if (Reflect.has(res, 'data') && res['data'] !== null && res['data'] !== undefined) {
          //debug
          console.log('res data', res['data'])
          if (Reflect.has(res['data'], 'pageDatas')) {
            tableObject.tableList = res['data']['pageDatas']
            tableObject.total = res['data']['totalRows']
          } else {
            // @ts-ignore
            tableObject.tableList = res['data']
            //get(res.data || {}, config?.response.list as string)
            // @ts-ignore
            tableObject.total = 0
          }
        } else {
          tableObject.tableList = get(res.data || {}, config?.response.list as string)
          tableObject.total = get(res.data || {}, config?.response?.total as string) || 0
        }
      }
    },

    setListDatas: async (datas: []) => {
      tableObject.loading = true
      tableObject.tableList = datas
      tableObject.loading = false
    },
    setTableRowEdit: async (row: any) => {
      //debug
      console.log('settablerowedit', row, unref(tableRef))
      unref(tableRef)?.setRowEdit(row)
    },
    cancelTableRowEdit: async (row) => {
      unref(tableRef)?.cancelRowEdit(row)
    },
    insertTableRow: async (newRecord: any, rowNumber: any) => {
      unref(tableRef)?.insertRow(newRecord, rowNumber)
    },
    delTableSelectRow: async () => {
      unref(tableRef)?.delSelectRow()
    },
    getModRecords: async (): Promise<WsTableRecordSet> => {
      return unref(tableRef)?.getModRecords()
    },
    getTableDatas: async (): Promise<WsTableDatas> => {
      return unref(tableRef)?.getTableDatas()
    },
    setEditRowData: async (name: string, value: any): Promise<any> => {
      //debug
      console.log('test', unref(tableRef))
      return unref(tableRef)?.setEditRowData(name, value)
    },
    getEditRowData: async (): Promise<any> => {
      return unref(tableRef)?.getEditRowData()
    },
    reloadRowData: async (rows: any | any[]): Promise<any> => {
      return unref(tableRef)?.reloadRowData(rows)
    }
  }

  config?.props && methods.setProps(config.props)

  return {
    register,
    elTableRef,
    tableObject,
    methods
  }
}

import { AxiosPromise } from 'axios'
import { TableProps } from '@/components/Table/src/types'
import { computed, nextTick, reactive, ref, unref, watch } from 'vue'
import { assign, get } from 'lodash-es'
import { TableExpose } from '@/components/Table'
// import { ElMessage, ElMessageBox } from 'element-plus'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import VXETable from 'vxe-table'
import { QuickQueryRequest } from '@/wscore/api/base/basetype'
import { TableSetPropsType } from '@/types/table'

// const { t } = useI18n()

interface UseQuickTableConfig<T> {
  // 返回数据格式配置
  response: {
    list: string
    total?: string
  }
  props?: TableProps
  funcNo?: string
  quickQuery: (pageRequest: QuickQueryRequest, pageFuncNo: string) => AxiosPromise<T>
}

interface QuickQueryTableObject<K> {
  pageSize: number
  currentPage: number
  total: number
  tableList: K[]
  paramsObj: {}
  parmasValue: string
  loading: boolean
  currentRow: Nullable<K>
  funcNo: string
}

export const useWsQickQueryTable = <T>(config?: UseQuickTableConfig<T>) => {
  const tableObject = reactive<QuickQueryTableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    paramsObj: {},
    parmasValue: '',
    // 加载中
    loading: false,
    // 当前行的数据
    currentRow: null,
    //功能号
    funcNo: ''
  })

  const parmasObj = computed(() => {
    return assign(
      {
        params: {
          pageSize: tableObject.pageSize,
          pageIndex: tableObject.currentPage
        }
      },
      tableObject.parmasValue
    )
  })

  watch(
    () => tableObject.currentPage,
    () => {
      unref(parmasObj).params.pageIndex = tableObject.currentPage
      console.log('paramObj', parmasObj)
      methods.getQuickList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      tableObject.currentPage = 1
      unref(parmasObj).params.pageIndex = tableObject.currentPage
      unref(parmasObj).params.pageSize = tableObject.pageSize
      methods.getQuickList()
    }
  )

  // Table实例
  const tableRef = ref<typeof WsTable & TableExpose>()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof VXETable>>()

  const quickTableRegister = (
    ref: typeof WsTable & TableExpose,
    elRef: ComponentRef<typeof VXETable>
  ) => {
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
  const methods: {
    setProps: (props: Recordable) => void
    setColumn: (columnProps: TableSetPropsType[]) => void
    setSearchParmas: (data: string) => void
    getSelections: () => Promise<T[]>
    getQuickList: () => Promise<void>
  } = {
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: TableSetPropsType[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParmas: (data: string) => {
      tableObject.currentPage = 1
      tableObject.parmasValue = data
      // tableObject.paramsObj = Object.assign(tableObject.paramsObj, {
      //   params: {
      //     pageSize: tableObject.pageSize,
      //     pageIndex: tableObject.currentPage,
      //     paramsValue: data
      //   }
      // })
      methods.getQuickList()
    },
    getQuickList: async () => {
      tableObject.loading = true
      if (config !== undefined) {
        const tmpPageRequest: QuickQueryRequest = {
          aPage: tableObject.currentPage,
          aSize: tableObject.pageSize,
          aWhere: tableObject.parmasValue
        }
        //debug
        console.log('getQuickList', tmpPageRequest, tableObject.funcNo)
        const res = await config
          ?.quickQuery(tmpPageRequest, config?.funcNo == undefined ? '' : config.funcNo)
          .catch(() => {})
          .finally(() => {
            tableObject.loading = false
          })
        if (res) {
          //debug
          console.log('ws quick query', res)
          //针对服务情况进行处理，过渡阶段方案，后续必须统一
          if (Reflect.has(res, 'page')) {
            tableObject.tableList = res['page']['pageDatas']
            tableObject.total = res['page']['totalRows']
          } else if (Reflect.has(res, 'data')) {
            //debug
            console.log('ws quick query res', res['data']['pageDatas'])
            tableObject.tableList = res['data']['pageDatas']
            tableObject.total = res['data']['totalRows']
          } else {
            tableObject.tableList = get(res.data || {}, config?.response.list as string)
            tableObject.total = get(res.data || {}, config?.response?.total as string) || 0
          }
        }
      }
    }
  }

  config?.props && methods.setProps(config.props)

  return {
    quickTableRegister,
    elTableRef,
    tableObject,
    methods
  }
}

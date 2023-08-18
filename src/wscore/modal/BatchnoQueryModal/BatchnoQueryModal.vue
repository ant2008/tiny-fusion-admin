<template>
  <el-dialog
    title="查询窗口"
    width="900px"
    :close-on-click-modal="false"
    v-model="modalShow"
    :show-close="true"
    :append-to-body="true"
    :destroy-on-close="true"
    :draggable="true"
  >
    <template #footer>
      <el-button size="default" @click="doSearchCancel">取消</el-button>
      <el-button type="primary" size="default" @click="doSearchOk">确定</el-button>
    </template>

    <content-wrap>
      <WsTable
        :columns="showColumns"
        :data="tableObject.tableList"
        :loading="tableObject.loading"
        :height="300"
        v-model:pageSize="tableObject.pageSize"
        v-model:currentPage="tableObject.currentPage"
        :pagination="{
          total: tableObject.total,
          disabled: false
        }"
        :row-config="{
          isCurrent: true,
          keyField: 'index'
        }"
        :radio-config="{
          highlight: true
        }"
        @register="register"
        @current-chagne="doCurrentChange"
        :radio-selection="radioSelection"
        :selection="multiSelection"
        ref="_queryModalTable"
      />
    </content-wrap>
  </el-dialog>
</template>

<script lang="ts">
import { ElButton, ElDialog } from 'element-plus'
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  PropType,
  ref,
  unref,
  watch
} from 'vue'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { ContentWrap } from '@/components/ContentWrap'
import { propTypes } from '@/utils/propTypes'
import { StockBatchnoRequest, TbStockD } from '@/wscore/api/stock/stockType'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { ListStockBatchnoApi } from '@/wscore/api/stock/stockApi'
import { TableColumn } from '@/types/table'

export default defineComponent({
  name: 'BatchnoQueryModal',
  components: { ElDialog, ElButton, WsTable, ContentWrap },
  inheritAttrs: false,
  props: {
    show: propTypes.bool.def(false),
    showColumns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    queryFuncNo: propTypes.string.def(''),
    queryValue: propTypes.string.def(''),
    itemId: propTypes.string.def(''),
    depotId: propTypes.string.def(''),
    multiSelection: propTypes.bool.def(false),
    radioSelection: propTypes.bool.def(false)
  },
  emits: ['modal-register', 'ev-return'],
  setup(props, { emit, expose }) {
    const thsModal = getCurrentInstance()

    const modalShow = ref(false)

    let modalShowColumns: TableColumn[] = []

    const stockRequest: StockBatchnoRequest = {
      depotId: unref(props).depotId,
      itemId: unref(props).itemId,
      searchKey: ''
    }

    const tableConfig = {
      pageQuery: ListStockBatchnoApi,
      response: {
        list: 'data',
        total: 'total'
      }
    }

    // const useTableConfig: AxiosConfig<StockBatchnoRequest, TbStockD[]> = {
    //   params: stockRequest,
    //   data: []
    // }

    const { register, tableObject, elTableRef, methods } = useWsTable<TbStockD[]>(tableConfig)

    const doOpen = () => {
      //debug
      console.log('dopen-s', unref(props).showColumns)
      //开始查询
      const tmpDepotId = unref(props).depotId
      const tmpItemId = unref(props).itemId
      if (tmpDepotId === undefined || tmpDepotId === '') {
        alert('请先设置库区编码!')
        return
      }

      if (tmpItemId === undefined || tmpDepotId === '') {
        alert('请先设置商品编码!')
        return
      }
      stockRequest.depotId = tmpDepotId
      stockRequest.itemId = tmpItemId
      methods.setSearchParmas(stockRequest)

      modalShow.value = true
    }

    const doSearchCancel = () => {
      modalShow.value = false
    }

    const doSearchOk = () => {
      emit('ev-return', getCurrentRow())
      modalShow.value = false
    }

    const doSearch = () => {
      //methods.setSearchParmas(unref(searchValue))
    }

    const doCurrentChange = (newValue, oldValue, row, rowIndex) => {
      //debug
      console.log('current-change', newValue, oldValue, row, rowIndex)
      //currRow = row
      console.log('ss', elTableRef)
    }

    const getCurrentRow = () => {
      // const wstable = elTableRef.value
      // currRow = wstable.getRadioRecord()
      // return currRow
    }

    const openModal = () => {
      //debug
      console.log('s', unref(props).showColumns)
      nextTick(() => {
        doOpen()
      })

      // nextTick(() => {
      //   doOpen()
      // })
    }

    const closeModal = () => {
      modalShow.value = false
    }

    watch(
      () => unref(props).show,
      (val) => {
        modalShow.value = val
      }
    )

    watch(
      () => props.showColumns,
      (val) => {
        //debug
        console.log('watch-columns', val)
        if (val !== null && val?.length > 0) {
          modalShowColumns = props.showColumns
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    onMounted(() => {
      //debug
      console.log('a-1', unref(thsModal))
      emit('modal-register', unref(thsModal))
    })

    expose({
      openModal,
      closeModal
    })

    return {
      modalShow,
      modalShowColumns,
      doOpen,
      doSearch,
      doCurrentChange,
      doSearchOk,
      getCurrentRow,
      doSearchCancel,
      register,
      tableObject,
      methods
    }
  }
})
</script>

<style scoped></style>

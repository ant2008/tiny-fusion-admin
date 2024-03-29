<script lang="ts">
export default {
  name: 'AutoCodeTableModal'
}
</script>
<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, PropType, ref, unref, watch } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { TableColumn } from '@/components/Table'
import { propTypes } from '@/utils/propTypes'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { ListTables } from '@/wscore/api/sys/glAutoCode'

const thsCp = getCurrentInstance()

const modalShow = ref(false)
const props = defineProps({
  show: propTypes.bool.def(false),
  showColumns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  queryValue: propTypes.string.def(''),
  multiSelection: propTypes.bool.def(false),
  radioSelection: propTypes.bool.def(false)
})

const emit = defineEmits<{
  (e: 'ev-return', value: any): void
  (e: 'modal-register', value: any): void
}>()

const thsModal = getCurrentInstance()

let modalShowColumns: TableColumn[] = []
let currRow = {}

let searchValue = ref('')

const tableConfig = {
  pageQuery: ListTables,
  response: {
    list: 'data',
    total: 'total'
  }
}

const queryRequest = {
  tableStr: ''
}

const { register, tableObject, elTableRef, methods } = useWsTable<any>(tableConfig)

const doOpen = () => {
  methods.setSearchParmas(queryRequest)
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
  queryRequest.tableStr = unref(searchValue)
  methods.setSearchParmas(queryRequest)
}

const doCurrentChange = (newValue, oldValue, row, rowIndex) => {
  //debug
  console.log('current-change', newValue, oldValue, row, rowIndex)
  //currRow = row
  console.log('ss', elTableRef)
}

const getCurrentRow = () => {
  const wstable = elTableRef.value
  currRow = wstable.getRadioRecord()
  return currRow
}

const openModal = () => {
  //debug
  console.log('s', unref(props).showColumns)
  nextTick(() => {
    doOpen()
  })
}

const closeModal = () => {
  modalShow.value = false
}

onMounted(() => {
  emit('modal-register', unref(thsModal))
  searchValue = ref(props.queryValue)
})

watch(
  () => props.showColumns,
  (val) => {
    if (val !== null && val?.length > 0) {
      modalShowColumns = props.showColumns
    }
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  openModal,
  closeModal
})
</script>

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
      <ElForm
        ref="queryModalForm"
        label-position="right"
        label-width="80px"
        @submit.prevent
        :inline="true"
      >
        <ElFormItem label="查询内容" style="width: 500px">
          <ElInput v-model="searchValue" ref="searchInput" @keyup.enter="doSearch" />
        </ElFormItem>

        <ElFormItem>
          <ElButton @click="doSearch" type="primary">搜索</ElButton>
        </ElFormItem>
      </ElForm>
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

<style scoped lang="less"></style>

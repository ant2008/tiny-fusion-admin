<template>
  <ElDialog
    title="查询窗口"
    width="900px"
    :close-on-click-modal="false"
    v-model="modalShow"
    :show-close="true"
    @open="doOpen"
    :append-to-body="true"
    :destroy-on-close="true"
    :draggable="true"
  >
    <template #footer>
      <ElButton size="default" @click="doSearchCancel">取消</ElButton>
      <ElButton type="primary" size="default" @click="doSearchOk">确定</ElButton>
    </template>

    <ContentWrap>
      <ElForm
        ref="queryModalForm"
        label-position="right"
        label-width="80px"
        @submit.prevent
        :inline="true"
      >
        <ElFormItem label="查询内容">
          <ElInput
            class="jquerymodal-formitem-label"
            v-model="searchValue"
            ref="searchInput"
            @keyup.enter="doSearch"
            @keyup.esc="doSearchEsc"
            @keyup.down="doSearchDown"
            @keyup.up="doSearchUp"
            @change="doSearchChange"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton @click="doSearch" type="primary" :icon="Search">搜索</ElButton>
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
        @register="quickTableRegister"
        @current-chagne="doCurrentChange"
        :radio-selection="radioSelection"
        :selection="multiSelection"
        ref="_queryModalTable"
      />
    </ContentWrap>
  </ElDialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, PropType, ref, unref, watch } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { ContentWrap } from '@/components/ContentWrap'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { useWsQickQueryTable } from '@/wscore/hook/useWsQuickQueryTable'
import { quickQueryApi } from '@/wscore/api/base/base'
import { Search } from '@element-plus/icons-vue'
import { TableColumn } from '@/types/table'
export default defineComponent({
  name: 'QueryModal',
  components: {
    ContentWrap,
    ElDialog,
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
    WsTable
  },
  inheritAttrs: false,
  props: {
    show: propTypes.bool.def(false),
    showColumns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    queryFuncNo: propTypes.string.def(''),
    queryValue: propTypes.string.def(''),
    multiSelection: propTypes.bool.def(false),
    radioSelection: propTypes.bool.def(false)
    // queryPage: Function as PropType<<L, T>(options: L) => Promise<T>>
    // queryApi: Function as PropType<(pageRequest: QuickQueryRequest, pageFuncNo: string) => AxiosPromise<any>
    // >
  },
  emits: ['ev-return', 'modal-register'],
  setup(prop, { emit, expose }) {
    const thsModal = getCurrentInstance()

    const modalShow = ref(false)

    const searchValue = ref('')

    let currRow = {}

    // const paramRequest: QuickQueryRequest = {
    //   aPage: 0,
    //   aSize: 10,
    //   aWhere: unref(prop).queryValue
    // }

    const { quickTableRegister, tableObject, elTableRef, methods } = useWsQickQueryTable({
      quickQuery: quickQueryApi,
      response: {
        list: 'list',
        total: 'total'
      },
      funcNo: unref(prop).queryFuncNo
    })

    const doOpen = () => {}

    const doSearchCancel = () => {
      modalShow.value = false
    }

    const doSearchOk = () => {
      emit('ev-return', getCurrentRow())
      modalShow.value = false
    }

    const doSearch = () => {
      methods.setSearchParmas(unref(searchValue))
    }

    const doSearchEsc = () => {
      modalShow.value = false
    }

    const doSearchUp = () => {}

    const doSearchDown = () => {}

    const doSearchChange = () => {}

    const doCurrentChange = (newValue, oldValue, row, rowIndex) => {
      //debug
      console.log('current-change', newValue, oldValue, row, rowIndex)
      //currRow = row
    }

    const getCurrentRow = () => {
      const wstable = elTableRef.value
      currRow = wstable.getRadioRecord()
      return currRow
    }

    const openModal = () => {
      modalShow.value = true
    }

    const closeModal = () => {
      modalShow.value = false
    }

    expose({
      openModal,
      closeModal
    })

    watch(
      () => unref(prop).show,
      (val) => {
        modalShow.value = val
      }
    )

    onMounted(() => {
      emit('modal-register', unref(thsModal))
    })

    return {
      Search,
      searchValue,
      modalShow,
      doOpen,
      doSearchCancel,
      doSearchOk,
      doSearch,
      doSearchEsc,
      doSearchUp,
      doSearchDown,
      doSearchChange,
      tableObject,
      quickTableRegister,
      methods,
      doCurrentChange,
      getCurrentRow
    }
  }
})
</script>

<style scoped lang="less">
.jquerymodal-slot-head-x {
  text-align: right;
  cursor: pointer;
  color: black;
  float: right;
}
.jquerymodal-card {
  margin-bottom: 5px;
  height: 70px;
}

.jquerymodal-formitem-label {
  width: 500px;
}
</style>

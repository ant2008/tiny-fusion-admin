<script setup lang="ts">
import {
  editSchema_Basic,
  editSchema_Colset,
  editSchema_Gen
} from '@/wscore/views/sys/GlAutoCode/GlAutoCodeData'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, getCurrentInstance, nextTick, onMounted, PropType, ref, unref } from 'vue'
import { MAutoCodePageQuery } from '@/wscore/api/sys/glAutoCode'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { useWsToolBar } from '@/wscore/hook/useWsToolBar'
import WsEditForm from '@/wscore/components/WsEditForm/WsEditForm.vue'
import { useWsEditForm } from '@/wscore/hook/useWsEditForm'
import { ElButton, ElTabs, ElTabPane } from 'element-plus'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { propTypes } from '@/utils/propTypes'
import { TableColumn } from '@/types/table'

//===========多语言及当前page级变量=================
const { t } = useI18n()

const ths = getCurrentInstance()

const thsTableInner = ref()

const funcNo = computed(() => {
  return ths === null ? '' : ths['ctx']['$options'].name
})

//-----------属性设置
const props = defineProps({
  show: propTypes.bool.def(false)
})

//-----------其他变量--------------
let activeName = 'basicSet'

//=====编辑FORM区======================
//-----------basic------------------
const { editFormRegister, editFormRef, editFormMethods } = useWsEditForm({
  funcNo: unref(funcNo)
})
const doBasicExit = (addFlag: boolean) => {
  emit('ev-exit')
}

const doBasicSave = (formData: Recordable, formOp: string) => {
  // saveCommit(formData, formOp).then(() => {
  //   editFormShow.value = false
  //   methods.getList()
  // })
}
//---------colset-------------------
const {
  register: colsetRegister,
  tableObject: colsetTableObject,
  methods: colsetMethods
} = useWsTable<[]>({
  pageQuery: MAutoCodePageQuery,
  response: {
    list: 'list',
    total: 'total'
  }
})

//--------genset----------------------
const {
  editFormRegister: gensetFormRegister,
  editFormRef: gensetFormRef,
  editFormMethods: gensetFormMethods
} = useWsEditForm({
  funcNo: unref(funcNo)
})
const doColSetExit = (addFlag: boolean) => {
  emit('ev-exit')
}

const doColSetSave = (formData: Recordable, formOp: string) => {
  // saveCommit(formData, formOp).then(() => {
  //   editFormShow.value = false
  //   methods.getList()
  // })
}

//===============expose function=================
const showTabForm = (row) => {
  nextTick(() => {
    //显示base
    //显示closeset
    //显示genset
    editFormMethods.modForm(row)
    gensetFormMethods.modForm(row)
  })
}

const hideTabForm = () => {
  editFormMethods.hideEditForm()
  gensetFormMethods.hideEditForm()
}

//============构造函数======
const emit = defineEmits<{
  (e: 'tabform-register', value: any): void
  (e: 'ev-exit')
}>()

onMounted(() => {
  emit('tabform-register', unref(ths))
})

defineExpose({
  showTabForm,
  hideTabForm
})
</script>

<template>
  <ElTabs v-model="activeName">
    <ElTabPane label="基本设置" name="basicSet">
      <WsEditForm
        :edit-schema="editSchema_Basic"
        @ev-exit="doBasicExit"
        @register="editFormRegister"
        @ev-save="doBasicSave"
        :if-show="true"
      />
    </ElTabPane>
    <ElTabPane label="字段设置" name="colSet">
      <WsTable
        :columns="editSchema_Colset"
        :data="colsetTableObject.tableList"
        :loading="colsetTableObject.loading"
        :height="600"
        v-model:pageSize="colsetTableObject.pageSize"
        v-model:currentPage="colsetTableObject.currentPage"
        :pagination="{
          total: colsetTableObject.total,
          disabled: false
        }"
        :edit-config="{
          trigger: 'click',
          mode: 'row',
          autoClear: true,
          showStatus: true
        }"
        keep-source
        @register="colsetRegister"
        ref="thsColTable"
        row-config="{
          useKey: false
        }"
      />
    </ElTabPane>
    <ElTabPane label="生成设置" name="genSet">
      <WsEditForm
        :edit-schema="editSchema_Gen"
        @ev-exit="doColSetExit"
        @register="gensetFormRegister"
        @ev-save="doColSetExit"
        :if-show="true"
      />
    </ElTabPane>
  </ElTabs>
</template>

<style scoped lang="less"></style>

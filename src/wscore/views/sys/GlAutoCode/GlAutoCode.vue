<script lang="ts">
export default {
  name: 'GlAutoCode'
}
</script>
<script setup lang="ts">
import WsToolBar from '@/wscore/components/WsToolBar/WsToolBar.vue'
import { ElButton, ElTabs, ElTabPane } from 'element-plus'
import ContentWrap from '@/components/ContentWrap/src/ContentWrap.vue'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import SearchForm from '@/wscore/components/SearchForm/SearchForm.vue'
import {
  editSchema_Basic,
  editSchema_Colset,
  editSchema_Gen,
  searchSchema,
  showColumns
} from '@/wscore/views/sys/GlAutoCode/GlAutoCodeData'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, getCurrentInstance, onMounted, ref, unref } from 'vue'
import { MAutoCodePageQuery } from '@/wscore/api/sys/glAutoCode'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { useWsToolBar } from '@/wscore/hook/useWsToolBar'
import WsEditForm from '@/wscore/components/WsEditForm/WsEditForm.vue'
import { useWsEditForm } from '@/wscore/hook/useWsEditForm'
import TplTableModal from '@/wscore/modal/TplTableModal/TplTableModal.vue'
import { useWsQueryModal } from '@/wscore/hook/useWsQueryModal'
import { tplTableShowColumns } from '@/wscore/modal/TplTableModal/TplTableModalData'
import GlAutoCodeTabForm from '@/wscore/views/sys/GlAutoCode/GlAutoCodeTabForm.vue'
import { useGlAutoCodeTabForm } from '@/wscore/views/sys/GlAutoCode/useGlAutoCodeTabForm'

//===========多语言及当前page级变量=================
const { t } = useI18n()

const ths = getCurrentInstance()

const thsTableInner = ref()

const funcNo = computed(() => {
  return ths === null ? '' : ths['ctx']['$options'].name
})

//-----------其他变量--------------
let activeName = ''
let tplTableModalFlag = unref(false)

//===== 查询及展现表格=============================

const { register, tableObject, methods } = useWsTable({
  pageQuery: MAutoCodePageQuery,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { setSearchParmas } = methods

//====表格按钮区=================================
let { toolBarRegister, toolBarMethods } = useWsToolBar()
//控制修改窗体标志。
let editFormShow = ref(false)
//toolbar区权限标志。
const modrFlag = ref(false)

//增
const doUeAdd = (addVisible) => {
  editFormShow.value = addVisible
  // editFormMethods.addForm()
}
//改
const doUeEdit = (row) => {
  editFormShow.value = true
  tabFormMethods.showTabForm(row)
  // editFormMethods.modForm(row)
}

//查
const doUeView = (row) => {}

//导入表
const doImpTable = () => {
  //弹出对话框
  // tplTableModalFlag = true
  modalMethods.openModal()
}

//modal return
const doModalReturn = (retData) => {
  // inputValue.value = retData[unref(props).itemKey]
  // // const selfInput = selfCp?.refs['_thsInput'] as ComponentRef<typeof ElInput>
  // // unref(selfInput)?.$forceUpdate()
  // emit('ev-item-return', unref(props).itemKey, inputValue.value, retData)
  // emit('update:modelValue', retData[unref(props).itemKey])
  //debug
  console.log('modal return ', retData)
}

//======PAGE MOUNT 事件=================
onMounted(() => {
  //获取按钮修改权限
  toolBarMethods.hasModR().then((res) => {
    modrFlag.value = unref(res)
  })
})
//=====编辑FORM区======================
//-----------basic------------------
// const { editFormRegister, editFormRef, editFormMethods } = useWsEditForm({
//   funcNo: unref(funcNo)
// })

const { queryModalRegister, methods: modalMethods } = useWsQueryModal()

const { tabFormRegister, formRef, tabFormMethods } = useGlAutoCodeTabForm()

const doTabFormExit = () => {
  editFormShow.value = false
  tabFormMethods.hideTabForm()
}

// const doBasicExit = (addFlag: boolean) => {}
//
// const doBasicSave = (formData: Recordable, formOp: string) => {
//   // saveCommit(formData, formOp).then(() => {
//   //   editFormShow.value = false
//   //   methods.getList()
//   // })
// }
//---------colset-------------------
// const {
//   register: colsetRegister,
//   tableObject: colsetTableObject,
//   methods: colsetMethods
// } = useWsTable<[]>({
//   pageQuery: MAutoCodePageQuery,
//   response: {
//     list: 'list',
//     total: 'total'
//   }
// })
//--------genset----------------------
// const {
//   editFormRegister: gensetFormRegister,
//   editFormRef: gensetFormRef,
//   editFormMethods: gensetFormMethods
// } = useWsEditForm({
//   funcNo: unref(funcNo)
// })
// const doColSetExit = (addFlag: boolean) => {}
//
// const doColSetSave = (formData: Recordable, formOp: string) => {
//   // saveCommit(formData, formOp).then(() => {
//   //   editFormShow.value = false
//   //   methods.getList()
//   // })
// }
</script>

<template>
  <ContentWrap v-if="!editFormShow">
    <SearchForm :schema="searchSchema" @search="setSearchParmas" />
  </ContentWrap>
  <ContentWrap v-if="!editFormShow">
    <WsToolBar :func-no="funcNo" @ue-add="doUeAdd" @register="toolBarRegister" ifExtButton>
      <template #usExtButton>
        <el-button @click="doImpTable" type="primary">导入表</el-button>
      </template>
    </WsToolBar>
    <WsTable
      :columns="showColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :height="600"
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :pagination="{
        total: tableObject.total,
        disabled: false
      }"
      @register="register"
    >
      <!--      <template #itemUnit="{ row }">-->
      <!--        <ElInput v-model="row.itemUnit" />-->
      <!--      </template>-->
      <!--      <template #vendorId="{ row }">-->
      <!--        <ElTag v-model="row.vendorId" />-->
      <!--      </template>-->

      <template #action="{ row }">
        <el-button @click="doUeEdit(row)" type="primary" link>编辑</el-button>
        <el-button @click="doUeView(row)" type="primary" link>查看</el-button>
      </template>
    </WsTable>
  </ContentWrap>
  <GlAutoCodeTabForm
    @tabform-register="tabFormRegister"
    v-if="editFormShow"
    @ev-exit="doTabFormExit"
  />
  <TplTableModal
    :show-columns="tplTableShowColumns"
    @modal-register="queryModalRegister"
    @ev-return="doModalReturn"
    radio-selection
  />
</template>

<style scoped lang="less"></style>

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
  editSchema_Colset, editSchema_Gen,
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

//===========多语言及当前page级变量=================
const { t } = useI18n()

const ths = getCurrentInstance()

const thsTableInner = ref()

const funcNo = computed(() => {
  return ths === null ? '' : ths['ctx']['$options'].name
})

//-----------其他变量--------------
let activeName = ''

//===== 查询及展现表格=============================

const { register, tableObject, methods } = useWsTable<[]>({
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
const doUeEdit = (row) => {}

//查
const doUeView = (row) => {}

//======PAGE MOUNT 事件=================
onMounted(() => {
  //获取按钮修改权限
  toolBarMethods.hasModR().then((res) => {
    modrFlag.value = unref(res)
  })
})
//=====编辑FORM区======================
//-----------basic------------------
const { editFormRegister, editFormRef, editFormMethods } = useWsEditForm({
  funcNo: unref(funcNo)
})
const doBasicExit = (addFlag: boolean) => {}

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
  editFormRegister: colsetFormRegister,
  editFormRef: colsetFormRef,
  editFormMethods: colsetFormMethods
} = useWsEditForm({
  funcNo: unref(funcNo)
})
const doColSetExit = (addFlag: boolean) => {}

const doColSetSave = (formData: Recordable, formOp: string) => {
  // saveCommit(formData, formOp).then(() => {
  //   editFormShow.value = false
  //   methods.getList()
  // })
}
</script>

<template>
  <ContentWrap v-if="!editFormShow">
    <SearchForm :schema="searchSchema" @search="setSearchParmas" />
  </ContentWrap>
  <ContentWrap v-if="!editFormShow">
    <WsToolBar :func-no="funcNo" @ue-add="doUeAdd" @register="toolBarRegister" />
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
        <el-button @click="doUeEdit(row)" type="primary" link v-if="modrFlag">编辑</el-button>
        <el-button @click="doUeView(row)" type="primary" link>查看</el-button>
      </template>
    </WsTable>
  </ContentWrap>
  <ContentWrap v-if="editFormShow">
    <ElTabs v-if="editFormShow" v-model="activeName">
      <ElTabPane label="基本设置" name="basicSet">
        <WsEditForm
          :edit-schema="editSchema_Basic"
          @ev-exit="doBasicExit"
          @register="editFormRegister"
          @ev-save="doBasicSave"
        />
      </ElTabPane>
      <ElTabPane label="字段设置" name="colSet">
        <WsTable
          :columns="editSchema_Colset"
          :data="tableObject.tableList"
          :loading="tableObject.loading"
          :height="600"
          v-model:pageSize="tableObject.pageSize"
          v-model:currentPage="tableObject.currentPage"
          :pagination="{
            total: tableObject.total,
            disabled: false
          }"
          :edit-config="{
            trigger: 'click',
            mode: 'row',
            autoClear: true,
            showStatus: true
          }"
          keep-source
          @Register="colsetRegister"
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
          @register="colsetRegister"
          @ev-save="doColSetSave"
        />
      </ElTabPane>
    </ElTabs>
  </ContentWrap>
</template>

<style scoped lang="less"></style>

<script lang="ts">
export default {
  name: 'GlTplColumns'
}
</script>
<script setup lang="ts">
import SearchForm from '@/wscore/components/SearchForm/SearchForm.vue'
import ContentWrap from '@/components/ContentWrap/src/ContentWrap.vue'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import WsToolBar from '@/wscore/components/WsToolBar/WsToolBar.vue'
import { ElButton } from 'element-plus'
import WsModalForm from '@/wscore/components/WsModalForm/WsModalForm.vue'
import {
  editSchema,
  searchSchema,
  showColumns
} from '@/wscore/views/sys/GlTplColumns/GlTplColumnsData'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, getCurrentInstance, ref, unref } from 'vue'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { TbProductDto } from '@/wscore/views/met/MGoods/MGoodsType'

import { useWsToolBar } from '@/wscore/hook/useWsToolBar'
import { useWsModalForm } from '@/wscore/hook/useWsModalForm'
import { MTplColumnsPageQuery } from '@/wscore/api/sys/glTplColumnsApi'

const { t } = useI18n()

const ths = getCurrentInstance()

const funcNo = computed(() => {
  return ths === null ? '' : ths['ctx']['$options'].name
})
//=====

const { register, tableObject, methods } = useWsTable<TbProductDto[]>({
  pageQuery: MTplColumnsPageQuery,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { setSearchParmas } = methods

//可编辑form
let { toolBarRegister } = useWsToolBar()

//后去可编辑form
const { modalFormRegister, editFormRef, editFormMethods } = useWsModalForm(
  {
    funcNo: String(unref(funcNo))
  }.funcNo
)
const { saveCommit } = editFormMethods

// getList()

// useEmitt({
//   name: 'getList',
//   callback: (type: string) => {
//     if (type === 'add') {
//       tableObject.currentPage = 1
//     }
//     getList()
//   }
// })

// watch(
//   () => addPageVisible,
//   () => {
//     //debug
//     console.log('mgoods-addPageVisible', addPageVisible)
//   }
// )

//定义控制编辑窗口
let editFormShow = ref(false)

const doEvExit = (addFlag: boolean) => {
  editFormShow.value = addFlag
  editFormMethods.hideEditForm()
}

const doUeAdd = (addVisible) => {
  editFormShow.value = addVisible
  editFormMethods.addForm()
}

const doUeEdit = (row) => {
  editFormShow.value = true
  editFormMethods.modForm(row)
}

const doUeView = (row) => {
  console.log(row)
  editFormShow.value = true
  editFormMethods.viewForm(row)
}

const doItemReturn = (itemName, _itemValue, retData) => {
  //debug
  console.log('itemReturn', itemName, _itemValue, retData)
  if (itemName === 'itemId') {
    unref(editFormRef)?.exposed?.setValues({ itemName: retData['itemName'] })
  } else if (itemName === 'userId') {
    unref(editFormRef)?.exposed?.setValues({ ecCode: retData['userName'] })
  }
}

const doItemChange = (itemName, itemValue, formData) => {
  //debug
  console.log('vendor itemchange', itemName, itemValue, formData['vendorId'])
  if (formData !== null) {
    const tmpItemId = formData['itemID']
    const tmpDepotId = formData['itemName']
    if (tmpItemId || tmpDepotId) {
      alert('请先输入商品编码或者库存编码!')
      return
    }
  }
}

const doModalFormOk = (formData) => {
  console.log('debug modal form ok', unref(formData))
}
</script>

<template>
  <ContentWrap>
    <SearchForm :schema="searchSchema" @search="setSearchParmas" />
  </ContentWrap>
  <ContentWrap>
    <WsToolBar :func-no="funcNo" @ue-add="doUeAdd" />
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
  <WsModalForm
    :edit-schema="editSchema"
    @ev-exit="doEvExit"
    @modal-form-register="modalFormRegister"
    @ev-item-return="doItemReturn"
    @modal-form-item-change="doItemChange"
    @modal-form-ok="saveCommit"
  />
</template>

<style scoped lang="less"></style>

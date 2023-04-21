<script lang="ts">
export default {
  name: 'MOrder'
}
</script>
<script setup lang="ts">
import ContentWrap from '@/components/ContentWrap/src/ContentWrap.vue'
import SearchForm from '@/wscore/components/SearchForm/SearchForm.vue'
import WsToolBar from '@/wscore/components/WsToolBar/WsToolBar.vue'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import {
  detailColumns,
  editSchema,
  searchSchema,
  showColumns
} from '@/wscore/views/pur/MOrder/MOrderData'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { WsResultObj } from '@/wscore/types/wsform'
import { TbProductDto } from '@/wscore/views/met/MGoods/MGoodsType'
import { MVendorPageQuery } from '@/wscore/api/met/mvendor/mvendor'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, defineComponent, getCurrentInstance, ref, unref } from 'vue'
import { MOrderPageQuery } from '@/wscore/api/pur/MOrderApi'
import { ElButton } from 'element-plus'
import WsMdForm from '@/wscore/components/WsMdForm/WsMdForm.vue'
import { useWsMdForm } from '@/wscore/hook/useWsMdForm'

const { t } = useI18n()

const ths = getCurrentInstance()

const funcNo = computed(() => {
  //debug
  console.log('funcno', ths === null ? '' : ths['ctx']['$options'].name)
  return ths === null ? '' : ths['ctx']['$options'].name
})

const { register, tableObject, methods } = useWsTable<TbProductDto[]>({
  pageQuery: MOrderPageQuery,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { mdFormRegister, mdFormMethods } = useWsMdForm(unref(funcNo))

const { setSearchParmas } = methods

let editFormShow = ref(false)

const doEvExit = (addFlag: boolean) => {
  editFormShow.value = addFlag
  // editFormMethods.hideEditForm()
}

const doUeAdd = (addVisible) => {
  editFormShow.value = addVisible
  // editFormMethods.addForm()
}

const doUeEdit = (row) => {
  editFormShow.value = true
  mdFormMethods.modForm(row)
}

const doUeView = (row) => {
  console.log(row)
  editFormShow.value = true
  // editFormMethods.viewForm(row)
}
</script>

<template>
  <ContentWrap v-if="!editFormShow">
    <SearchForm :schema="searchSchema" @search="setSearchParmas" />
  </ContentWrap>
  <ContentWrap v-if="!editFormShow">
    <WsToolBar :func-no="funcNo" @ue-add="doUeAdd" v-if="!editFormShow" />
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
        <ElButton @click="doUeEdit(row)" link type="primary">编辑</ElButton>
        <ElButton @click="doUeView(row)" link type="primary">查看</ElButton>
      </template>
    </WsTable>
  </ContentWrap>
  <!--    主从表-->
  <WsMdForm
    :edit-schema="editSchema"
    :func-no="funcNo"
    :detail-columns="detailColumns"
    @register="mdFormRegister"
  />
</template>

<style scoped></style>

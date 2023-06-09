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
import { ElButton, ElInput } from 'element-plus'
import WsMdForm from '@/wscore/components/WsMdForm/WsMdForm.vue'
import { useWsMdForm } from '@/wscore/hook/useWsMdForm'

const { t } = useI18n()

const ths = getCurrentInstance()

const thsMdTableInner = ref()

const mdTableRowEditFlag = ref(false)

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

//获取父子表的子表数据。
const {
  register: tableRegister,
  elTableRef,
  tableObject: detailTableObject,
  methods: tableMethods
} = useWsTable()

//debug
console.log('ef table', elTableRef)
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
  mdFormMethods.viewForm(row)
}
const doUeDetailEdit = (row) => {
  tableMethods.setTableRowEdit(row)
  mdTableRowEditFlag.value = true
}

const doUeCancleEdit = (row) => {
  tableMethods.cancelTableRowEdit(row)
  mdTableRowEditFlag.value = false
}

const doMdFormExit = (formVisible, formOper) => {
  editFormShow.value = false
  mdFormMethods.hideMdForm()
}

const doMdFormCommit = (masterData, detailData, formOper) => {
  editFormShow.value = false
  //debug
  console.log('commit', masterData, detailData, formOper)
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
      <template #orderNo-header>
        <ElButton>TEST</ElButton>
      </template>
    </WsTable>
  </ContentWrap>
  <!--    主从表-->
  <WsMdForm
    :edit-schema="editSchema"
    :func-no="funcNo"
    :detail-columns="detailColumns"
    @register="mdFormRegister"
    @ev-exit="doMdFormExit"
    @ev-save="doMdFormCommit"
  >
    <!--    <template #action="{ row }">-->
    <!--      <ElButton @click="doUeDetailEdit(row)" text type="primary">编辑</ElButton>-->
    <!--    </template>-->
    <template #itemId-edit="{ row }">
      <ElInput v-model="row.itemId" />
    </template>
    <template #orderQty-edit="{ row }">
      <ElInput v-model="row.orderQty" />
    </template>
    <!--    <template #slt_detailTable="{ dataList }">-->
    <!--      <WsTable-->
    <!--        :columns="detailColumns"-->
    <!--        :data="dataList"-->
    <!--        :loading="detailTableObject.loading"-->
    <!--        :height="600"-->
    <!--        v-model:pageSize="detailTableObject.pageSize"-->
    <!--        v-model:currentPage="detailTableObject.currentPage"-->
    <!--        :pagination="{-->
    <!--          total: detailTableObject.total,-->
    <!--          disabled: false-->
    <!--        }"-->
    <!--        :edit-config="{ trigger: 'click', mode: 'row' }"-->
    <!--        keep-source-->
    <!--        @register="tableRegister"-->
    <!--        ref="thsMdTableInner"-->
    <!--      >-->
    <!--        &lt;!&ndash;      <template #itemUnit="{ row }">&ndash;&gt;-->
    <!--        &lt;!&ndash;        <ElInput v-model="row.itemUnit" />&ndash;&gt;-->
    <!--        &lt;!&ndash;      </template>&ndash;&gt;-->
    <!--        &lt;!&ndash;            <template #vendorId="{ row }">&ndash;&gt;-->
    <!--        &lt;!&ndash;              <ElTag v-model="row.vendorId" />&ndash;&gt;-->
    <!--        &lt;!&ndash;            </template>&ndash;&gt;-->

    <!--        <template #action="{ row }">-->
    <!--          <ElButton @click="doUeDetailEdit(row)" text type="primary" v-if="!mdTableRowEditFlag"-->
    <!--            >编辑</ElButton-->
    <!--          >-->
    <!--          <ElButton @click="doUeCancleEdit(row)" text type="warning" v-if="mdTableRowEditFlag"-->
    <!--            >取消</ElButton-->
    <!--          >-->
    <!--          &lt;!&ndash;          <ElButton @click="doUeView(row)" text type="primary">查看</ElButton>&ndash;&gt;-->
    <!--        </template>-->
    <!--        <template #itemId-edit="{ row }">-->
    <!--          <ElInput v-model="row.itemId" />-->
    <!--        </template>-->
    <!--      </WsTable>-->
    <!--    </template>-->
  </WsMdForm>
</template>

<style scoped></style>

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
      <template #vendorId="{ row }">
        <ElTag v-model="row.vendorId" />
      </template>

      <template #action="{ row }">
        <el-button @click="doUeEdit(row)" text type="primary">编辑</el-button>
        <el-button @click="doUeView(row)" text type="primary">查看</el-button>
      </template>
    </WsTable>
  </ContentWrap>
  <WsEditForm
    :edit-schema="editSchema"
    @ev-exit="doEvExit"
    @register="editFormRegister"
    @ev-save="saveCommit"
    @ev-item-return="doItemReturn"
    @ev-item-change="doItemChange"
  />
</template>

<script lang="ts">
import SearchForm from '@/wscore/components/SearchForm/SearchForm.vue'
import { computed, defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
import ContentWrap from '@/components/ContentWrap/src/ContentWrap.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { TbProductDto } from '@/wscore/views/met/MGoods/MGoodsType'
// import { delTableListApi, getTableListApi } from '@/api/table'
import { MGoodsPageQuery } from '@/wscore/api/mgoods/mgoods'
import { ElTag, ElButton } from 'element-plus'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import WsToolBar from '@/wscore/components/WsToolBar/WsToolBar.vue'
import WsEditForm from '@/wscore/components/WsEditForm/WsEditForm.vue'
import { useWsToolBar } from '@/wscore/hook/useWsToolBar'
import { useWsEditForm } from '@/wscore/hook/useWsEditForm'
import { editSchema, searchSchema, showColumns } from './MGoodsData'
// import {useEmitt} from "@/hooks/web/useEmitt";

export default defineComponent({
  name: 'MGoods',
  components: { WsToolBar, WsTable, ContentWrap, SearchForm, ElTag, WsEditForm, ElButton },
  // emits: ['getList'],
  setup: function () {
    const { t } = useI18n()

    const ths = getCurrentInstance()

    //获取当前功能号
    const funcNo = computed(() => {
      return ths === null ? '' : ths['ctx']['$options'].name
    })
    //=====

    const { register, tableObject, methods } = useWsTable<TbProductDto[]>({
      pageQuery: MGoodsPageQuery,
      response: {
        list: 'list',
        total: 'total'
      }
    })

    const { setSearchParmas } = methods

    //可编辑form
    let { toolBarRegister } = useWsToolBar()

    //后去可编辑form
    const { editFormRegister, editFormRef, editFormMethods } = useWsEditForm({
      funcNo: unref(funcNo)
    })
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
      console.log('itemchange', itemName, itemValue, formData['itemName'])
      if (formData !== null) {
        const tmpItemId = formData['itemID']
        const tmpDepotId = formData['itemName']
        if (tmpItemId || tmpDepotId) {
          alert('请先输入商品编码或者库存编码!')
          return
        }
      }
    }

    // const saveCommitTest = (formData: Recordable) => {
    //   console.log('mgoods save commit', formData)
    // }

    // const saveCommitTest = saveCommit
    //
    // watch(
    //   () => unref(addPageVisibleFlag),
    //   (val: boolean) => {
    //     //debug
    //     console.log('watch', addPageVisibleFlag)
    //     editFormShow.value = val === undefined ? false : val
    //   },
    //   {
    //     immediate: true,
    //     deep: true
    //   }
    // )

    onMounted(() => {
      //editFormShow = addPageVisibleFlag
      //debug
      //console.log('mgoods', addPageVisibleFlag)
    })

    return {
      searchSchema,
      t,
      register,
      setSearchParmas,
      tableObject,
      showColumns,
      funcNo,
      editSchema,
      toolBarRegister,
      doEvExit,
      doUeAdd,
      doUeEdit,
      doUeView,
      editFormShow,
      editFormRegister,
      saveCommit,
      doItemReturn,
      doItemChange
    }
  }
})
</script>

<style scoped></style>

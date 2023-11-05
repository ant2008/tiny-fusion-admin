<script setup lang="ts">
import { editSchema_Basic, editSchema_Colset } from '@/wscore/views/sys/GlAutoCode/GlAutoCodeData'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, getCurrentInstance, nextTick, onMounted, PropType, ref, unref } from 'vue'
import { MAutoCodePageQuery, SaveAutoCodeAll } from '@/wscore/api/sys/glAutoCode'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { useWsToolBar } from '@/wscore/hook/useWsToolBar'
import WsEditForm from '@/wscore/components/WsEditForm/WsEditForm.vue'
import { useWsEditForm } from '@/wscore/hook/useWsEditForm'
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElInput,
  ElSwitch,
  ElSelect,
  ElOption,
  ElMessageBox
} from 'element-plus'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { propTypes } from '@/utils/propTypes'
import { TableColumn } from '@/types/table'
import { getSyscodeSelect, getTopSysCodeDictsSelect } from '@/wscore/utils/WsDictHelper'
import { any } from 'vue-types'
import { handleDataVxeRowKey, handleTableArraysVxeRowKey } from '@/wscore/utils/WsVxeHelper'
import { AllAutoCommitRequest } from '@/wscore/api/sys/glAutocodetype'
import { FormOpera } from '@/wscore/api/base/base'
import WsAutoCodeChildTableInput from '@/wscore/components/WsAutoCodeChildTableInput/WsAutoCodeChildTableInput.vue'

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

let saveLoadingFlag = false

let currRowValue = any

const tableEditProp = {
  trigger: 'click',
  mode: 'row',
  autoClear: true,
  showStatus: true,
  enabled: true
}
//form 组件类型
const formCpType = getSyscodeSelect('S64')
//操作符号
const queryOpType = getSyscodeSelect('S69')
//可选择字典
const dictOpList = getTopSysCodeDictsSelect()

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
  elTableRef: colsetTable,
  tableObject: colsetTableObject,
  methods: colsetMethods
} = useWsTable<[]>({
  pageQuery: MAutoCodePageQuery,
  response: {
    list: 'list',
    total: 'total'
  }
})

const doAllSave = () => {
  let commitData: AllAutoCommitRequest = {
    autocodeH: undefined,
    autocodeDs: [],
    autocodeEs: []
  }
  //debug
  editFormMethods.getFormData().then((res) => {
    console.log('basesetForm Value:', handleDataVxeRowKey(unref(res)))
    commitData.autocodeH = unref(handleDataVxeRowKey(unref(res)))
    colsetMethods.getTableDatas().then((res3) => {
      console.log('tableset value:', res3)
      commitData.autocodeDs = unref(handleTableArraysVxeRowKey(unref(res3).fullData))
      //debug
      console.log('final all:', commitData)
      //进行提交。
      SaveAutoCodeAll(unref(commitData)).then((res4) => {
        if (res4['code'] !== '200') {
          ElMessageBox.alert('保存错误:' + res4['msg'], '提示')
        } else {
          ElMessageBox.alert('保存成功', '提示')
          doAllExit()
        }
      })
    })
  })
}

const doAllExit = () => {
  emit('ev-exit')
}

//--------genset----------------------
// const {
//   editFormRegister: gensetFormRegister,
//   editFormRef: gensetFormRef,
//   editFormMethods: gensetFormMethods
// } = useWsEditForm({
//   funcNo: unref(funcNo)
// })

//===============expose function=================
const showTabForm = (row) => {
  nextTick(() => {
    //显示base
    //显示closeset
    //显示genset
    editFormMethods.modForm(row)
    // gensetFormMethods.modForm(row)
    currRowValue = row
  })
}

const hideTabForm = () => {
  editFormMethods.hideEditForm()
  // gensetFormMethods.hideEditForm()
}

const listTabGrid = (datas: []) => {
  colsetMethods.setListDatas(datas)
}

const doItemReturn = (itemName, itemValue, retData) => {
  if (itemName === 'autocodeTableName') {
    nextTick(() => {
      unref(editFormRef)?.exposed?.setValues({
        autocodeDtlTableName: retData['autocodeTableName'],
        autocodeDtlEntityName: retData['autocodeEntityName']
      })
    })
  }
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
  hideTabForm,
  listTabGrid
})
</script>

<template>
  <ElTabs v-model="activeName">
    <ElTabPane label="基本设置" name="basicSet">
      <WsEditForm
        :edit-schema="editSchema_Basic"
        @register="editFormRegister"
        :if-show="true"
        :if-func-button="false"
        @ev-item-return="doItemReturn"
      />
    </ElTabPane>
    <ElTabPane label="字段设置" name="colSet">
      <WsTable
        :columns="editSchema_Colset"
        :data="colsetTableObject.tableList"
        :loading="colsetTableObject.loading"
        :height="500"
        :edit-config="tableEditProp"
        keep-source
        show-overflow
        :selection="false"
        :radioSelection="false"
        @register="colsetRegister"
        ref="thsColTable"
        :row-config="{
          useKey: false
        }"
      >
        <!--        列显示自定义模版-->
        <template #autocodeGridShow="{ row }">
          <ElSwitch v-model="row.autocodeGridShow" :active-value="1" :inactive-value="0" disabled />
        </template>
        <template #autocodeQueryShow="{ row }">
          <ElSwitch
            v-model="row.autocodeQueryShow"
            :active-value="1"
            :inactive-value="0"
            disabled
          />
        </template>
        <template #autocodeFormShow="{ row }">
          <ElSwitch v-model="row.autocodeFormShow" :active-value="1" :inactive-value="0" disabled />
        </template>
        <template #autocodeReadonly="{ row }">
          <ElSwitch v-model="row.autocodeReadonly" :active-value="1" :inactive-value="0" disabled />
        </template>
        <template #autocodeRequired="{ row }">
          <ElSwitch v-model="row.autocodeRequired" :active-value="1" :inactive-value="0" disabled />
        </template>
        <template #autocodeGridSortable="{ row }">
          <ElSwitch
            v-model="row.autocodeGridSortable"
            :active-value="1"
            :inactive-value="0"
            disabled
          />
        </template>
        <!--        设置编辑组件-->
        <!--        设置各个列的组件，不再做更多封装，直接硬代码-->
        <template #autocodeColChname-edit="{ row }">
          <ElInput v-model="row.autocodeColChname" />
        </template>
        <template #autocodeKeyName-edit="{ row }">
          <ElInput v-model="row.autocodeKeyName" />
        </template>
        <template #autocodeColMaptype-edit="{ row }">
          <ElInput v-model="row.autocodeColMaptype" />
        </template>
        <template #autocodeGridShow-edit="{ row }">
          <ElSwitch v-model="row.autocodeGridShow" :active-value="1" :inactive-value="0" />
        </template>
        <template #autocodeFormShow-edit="{ row }">
          <ElSwitch v-model="row.autocodeFormShow" :active-value="1" :inactive-value="0" />
        </template>
        <template #autocodeQueryShow-edit="{ row }">
          <ElSwitch v-model="row.autocodeQueryShow" :active-value="1" :inactive-value="0" />
        </template>
        <template #autocodeReadonly-edit="{ row }">
          <ElSwitch v-model="row.autocodeReadonly" :active-value="1" :inactive-value="0" />
        </template>
        <template #autocodeRequired-edit="{ row }">
          <ElSwitch v-model="row.autocodeRequired" :active-value="1" :inactive-value="0" />
        </template>
        <template #autocodeFormType-edit="{ row }">
          <vxe-select v-model="row.autocodeFormType">
            <vxe-option
              v-for="item in formCpType"
              :key="item"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
          <!--          <ElSelect v-model="row.autocodeFormType" @change="colsetTable.updateStatus(row)">-->
          <!--            <ElOption-->
          <!--              v-for="item in formCpType"-->
          <!--              :key="item.value"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--            />-->
          <!--          </ElSelect>-->
        </template>
        <template #autocodeFormSpan-edit="{ row }">
          <ElInput v-model="row.autocodeFormSpan" />
        </template>
        <template #autocodeFormOplist-edit="{ row }">
          <vxe-select v-model="row.autocodeFormOplist">
            <vxe-option
              v-for="item in dictOpList"
              :key="item"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
          <!--          <ElSelect v-model="row.autocodeFormOplist" @change="colsetTable.updateStatus(row)">-->
          <!--            <ElOption-->
          <!--              v-for="item in dictOpList"-->
          <!--              :key="item.value"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--            />-->
          <!--          </ElSelect>-->
        </template>
        <template #autocodeQueryOpera-edit="{ row }">
          <vxe-select v-model="row.autocodeQueryOpera">
            <vxe-option
              v-for="item in queryOpType"
              :key="item"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
          <!--          <ElSelect v-model="row.autocodeQueryOpera" @change="colsetTable.updateStatus(row)">-->
          <!--            <ElOption-->
          <!--              v-for="item in queryOpType"-->
          <!--              :key="item.value"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--            />-->
          <!--          </ElSelect>-->
        </template>
        <template #autocodeQueryStyle-edit="{ row }">
          <ElInput v-model="row.autocodeQueryStyle" />
        </template>
        <template #autocodeGridSortable-edit="{ row }">
          <ElSwitch v-model="row.autocodeGridSortable" :active-value="1" :inactive-value="0" />
        </template>
        <template #autocodeGridWidth-edit="{ row }">
          <ElInput v-model="row.autocodeGridWidth" />
        </template>
      </WsTable>
    </ElTabPane>
    <!--    <ElTabPane label="生成设置" name="genSet">-->
    <!--      <WsEditForm-->
    <!--        :edit-schema="editSchema_Gen"-->
    <!--        @register="gensetFormRegister"-->
    <!--        :if-show="true"-->
    <!--        :if-func-button="false"-->
    <!--      />-->
    <!--    </ElTabPane>-->
  </ElTabs>
  <div class="text-right">
    <el-divider />
    <el-button type="primary" :loading="saveLoadingFlag" @click="doAllSave">
      {{ t('wsBase.save') }}
    </el-button>

    <el-button @click="doAllExit">{{ t('wsBase.cancel') }}</el-button>
  </div>
</template>

<style scoped lang="less"></style>

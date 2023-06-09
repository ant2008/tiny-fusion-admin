<template>
  <ContentWrap v-if="formVisible">
    <ContentWrap>
      <WsForm
        :is-custom="false"
        :label-width="labelWidth"
        :is-col="isCol"
        :schema="editSchema"
        @register="formRegister"
        ref="thsMdFormInner"
      />
    </ContentWrap>
    <!--    放置明细表-->
    <ContentWrap>
      <!--      子表放在tab中-->
      <ElTabs v-model="activeTabName">
        <ElTabPane label="明细信息" name="MD1">
          <vxe-toolbar>
            <template #buttons>
              <vxe-button status="primary" content="新增行" @click="insertMdTable" />
              <vxe-button status="warning" content="删除行" />
            </template>
          </vxe-toolbar>
          <WsTable
            :columns="detailColumns"
            :data="detailTableDatas"
            :loading="detailTableObject.loading"
            :height="600"
            v-model:pageSize="detailTableObject.pageSize"
            v-model:currentPage="detailTableObject.currentPage"
            :pagination="{
              total: detailTableObject.total,
              disabled: false
            }"
            :edit-config="{ trigger: 'click', mode: 'row' }"
            keep-source
            @register="tableRegister"
            ref="thsMdTableInner"
          >
            <template v-for="c in detailColumns" #[c.field]>
              <!--              <template #[c.field]>-->
              <slot :name="c.filed.concat('-st')" :dataList="detailTableDatas"> </slot>
              <!--              </template>-->
            </template>
          </WsTable>
        </ElTabPane>
        <!--        <slot name="slt_detailTable" :dataList="detailTableDatas"></slot>-->
        <!--        暂时屏蔽-->
        <!--        <ElTabPane label="审核信息" name="MD99">-->
        <!--          <WsTable-->
        <!--              :columns="showColumns"-->
        <!--              :data="tableObject.tableList"-->
        <!--              :loading="tableObject.loading"-->
        <!--              :height="600"-->
        <!--              v-model:pageSize="tableObject.pageSize"-->
        <!--              v-model:currentPage="tableObject.currentPage"-->
        <!--              :pagination="{-->
        <!--        total: tableObject.total,-->
        <!--        disabled: false-->
        <!--      }"-->
        <!--              @register="register"-->
        <!--          >-->
        <!--            &lt;!&ndash;      <template #itemUnit="{ row }">&ndash;&gt;-->
        <!--            &lt;!&ndash;        <ElInput v-model="row.itemUnit" />&ndash;&gt;-->
        <!--            &lt;!&ndash;      </template>&ndash;&gt;-->
        <!--            <template #vendorId="{ row }">-->
        <!--              <ElTag v-model="row.vendorId" />-->
        <!--            </template>-->

        <!--            <template #action="{ row }">-->
        <!--              <el-button @click="doUeEdit(row)" text type="primary">编辑</el-button>-->
        <!--              <el-button @click="doUeView(row)" text type="primary">查看</el-button>-->
        <!--            </template>-->
        <!--          </WsTable>-->
        <!--        </ElTabPane>-->
      </ElTabs>
    </ContentWrap>

    <div class="text-center">
      <ElDivider />
      <ElButton
        type="primary"
        :loading="saveLoadingFlag"
        @click="doSave"
        v-if="formOpera === 'ADD' || formOpera === 'MOD'"
      >
        {{ t('wsBase.save') }}
      </ElButton>

      <ElButton @click="doExit">{{ t('wsBase.cancel') }}</ElButton>
    </div>
  </ContentWrap>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, PropType, ref, unref, useSlots } from 'vue'
import { FormSchema, FormSetPropsType } from '@/types/form'
import { propTypes } from '@/utils/propTypes'
import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from 'vue-i18n'
import { ElTabs, ElTabPane, ElButton, ElTag, ElDivider } from 'element-plus'
import { Toolbar as VxeToolbar, VxeButtonEvents, VxeTableInstance } from 'vxe-table'
import WsTable from '@/wscore/components/Table/WsTable.vue'
import { TableColumn } from '@/types/table'
import { useWsTable } from '@/wscore/hook/useWsTable'
import { TbProductDto } from '@/wscore/views/met/MGoods/MGoodsType'
import { MGoodsPageQuery } from '@/wscore/api/mgoods/mgoods'
import { useWsForm } from '@/wscore/hook/useWsForm'
import { FormProps } from '@/components/Form/src/types'
import { FormOpera, getGridDetailApi } from '@/wscore/api/base/base'

const props = defineProps({
  editSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  detailColumns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  show: propTypes.bool.def(false),
  labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
  isCol: propTypes.bool.def(true),
  funcNo: propTypes.string.def('')
})

const { t } = useI18n()
const formVisible = ref(false)
const thsMdForm = getCurrentInstance()
const saveLoadingFlag = ref(false)
const formOpera = ref('init')
const activeTabName = ref('')
const detailTableDatas = ref([])

const emit = defineEmits(['register'])

//使用form
const { register: formRegister, methods: formMethods } = useWsForm()

//使用detailtable
const {
  register: tableRegister,
  elTableRef,
  tableObject: detailTableObject,
  methods: tableMethods
} = useWsTable()

//获取solots
const slots = useSlots()
//获取refs
//===注册事件
onMounted(() => {
  emit('register', unref(thsMdForm))
})
//========Form Function
// useForm传入的props
const outsideProps = ref<FormProps>({})

const mergeProps = ref<FormProps>({})

// const getProps = computed(() => {
//   const propsObj = { ...props }
//   Object.assign(propsObj, unref(mergeProps))
//   return propsObj
// })

// 对表单赋值
const setValues = (data: Recordable = {}) => {
  formMethods.setValues(data)
}

const setProps = (props: FormProps = {}) => {
  mergeProps.value = Object.assign(unref(mergeProps), props)
  outsideProps.value = props
}

const delSchema = (field: string) => {
  formMethods.delSchema(field)
}

const addSchema = (formSchema: FormSchema, index?: number) => {
  formMethods.addSchema(formSchema, index)
}

const setSchema = (schemaProps: FormSetPropsType[]) => {
  formMethods.setSchema(schemaProps)
}

const showMdForm = () => {
  formVisible.value = true
}

const hideMdForm = () => {
  formVisible.value = false
}

const setFormFieldReadOnly = (readOnlyFlag: boolean) => {
  formMethods.setFormFieldReadOnly(readOnlyFlag)
}

const setFormOpera = (formOp: FormOpera) => {
  formOpera.value = formOp
}

const getFormData = async () => {
  return await formMethods.getFormData()
}

const getDetailTableDatas = async (funcNo: string, idx: string) => {
  const res = await getGridDetailApi({
    funcNo: funcNo,
    idx: idx
  })
  if (res?.dataList !== null) {
    detailTableDatas.value = res.dataList
  }
  activeTabName.value = 'MD1'
}
//===========明细表格的按钮处理========================
const insertMdTable = () => {
  //debug
  console.log('insertMdTable', slots)
}
//===========当前使用逻辑处理函数========================
const doSave = () => {}

const doExit = () => {}

//====暴露可调用函数
defineExpose({
  setValues,
  setProps,
  delSchema,
  addSchema,
  setSchema,
  showMdForm,
  hideMdForm,
  setFormFieldReadOnly,
  setFormOpera,
  getFormData,
  getDetailTableDatas
})
</script>

<style scoped></style>

<template>
  <ElDialog
    :title="titleName"
    width="900px"
    :close-on-click-modal="false"
    v-model="modalShow"
    :show-close="true"
    :append-to-body="true"
    :destroy-on-close="true"
    :draggable="true"
  >
    <template #footer>
      <ElButton size="default" @click="doCancel">取消</ElButton>
      <ElButton type="primary" size="default" @click="doOk">确定</ElButton>
    </template>

    <ContentWrap>
      <WsForm
        label-position="right"
        :is-custom="false"
        :label-width="labelWidth"
        :is-col="isCol"
        :schema="editSchema"
        @register="register"
        ref="thsModalFormInner"
      />
      <!--      <div class="text-center">-->
      <!--        <ElDivider />-->
      <!--        <ElButton-->
      <!--          type="primary"-->
      <!--          :loading="saveLoadingFlag"-->
      <!--          @click="doSave"-->
      <!--          v-if="formOpera === 'ADD' || formOpera === 'MOD'"-->
      <!--        >-->
      <!--          {{ t('wsBase.save') }}-->
      <!--        </ElButton>-->

      <!--        <ElButton @click="doSearchCancel">{{ t('wsBase.cancel') }}</ElButton>-->
      <!--      </div>-->
    </ContentWrap>
  </ElDialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, PropType, ref, unref, watch } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { ContentWrap } from '@/components/ContentWrap'
import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import { FormProps } from '@/components/Form/src/types'
import { FormOpera } from '@/wscore/api/base/base'
import { useI18n } from 'vue-i18n'
import { useWsForm } from '@/wscore/hook/useWsForm'
import { FormSchema, FormSetPropsType } from '@/types/form'
import { useEmitt } from '@/hooks/web/useEmitt'

export default defineComponent({
  name: 'WsModalForm',
  components: { WsForm, ElDialog, ContentWrap, ElButton },
  inheritAttrs: false,
  props: {
    editSchema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    show: propTypes.bool.def(false),
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    isCol: propTypes.bool.def(true),
    funcNo: propTypes.string.def('')
  },
  emits: [
    'modal-form-register',
    'modal-form-ok',
    'modal-form-item-return',
    'modal-form-item-change'
  ],
  setup(props, { emit, expose }) {
    const thsModal = getCurrentInstance()
    const modalShow = ref(false)
    const saveLoadingFlag = ref(false)
    const formOpera = ref('init')

    const { t } = useI18n()
    const { register, methods } = useWsForm()

    useEmitt({
      name: 'modal-form-item-change',
      callback: ({ itemName, itemValue }) => {
        methods.getFormData().then((result) => {
          emit('modal-form-item-change', itemName, itemValue, result)
        })
      }
    })

    //用于捕获在Data中定义的事件
    useEmitt({
      name: 'modal-form-item-return',
      callback: ({ itemName, itemValue, retData }) => {
        emit('modal-form-item-return', itemName, itemValue, retData)
      }
    })

    const doSave = () => {}

    const doCancel = () => {
      //如有更改需要进行判断。
      setModalShow(false)
    }

    const doOk = () => {
      methods.getFormData().then((res) => {
        emit('modal-form-ok', unref(res), unref(formOpera))
        setModalShow(false)
      })
    }

    const titleName = ref('查询窗口')

    watch(
      () => unref(props).show,
      (val) => {
        modalShow.value = val
      }
    )

    watch(
      () => unref(formOpera),
      (val) => {
        if (val === 'ADD' || val === 'MOD') {
          titleName.value = '编辑窗口'
        } else {
          titleName.value = '查看窗口'
        }
      }
    )

    onMounted(() => {
      emit('modal-form-register', unref(thsModal))
    })

    //======WSForm Funcion override
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
      methods.setValues(data)
    }

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const delSchema = (field: string) => {
      methods.delSchema(field)
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      methods.addSchema(formSchema, index)
    }

    const setSchema = (schemaProps: FormSetPropsType[]) => {
      methods.setSchema(schemaProps)
    }

    // const showEditForm = () => {
    //   formVisible.value = true
    // }
    //
    // const hideEditForm = () => {
    //   formVisible.value = false
    // }

    const setFormFieldReadOnly = (readOnlyFlag: boolean) => {
      methods.setFormFieldReadOnly(readOnlyFlag)
    }

    const setFormOpera = (formOp: FormOpera) => {
      formOpera.value = formOp
    }

    const getFormData = async () => {
      return await methods.getFormData()
    }

    const setModalShow = (modalShowFlag: boolean) => {
      modalShow.value = modalShowFlag
      //debug test
      console.log('modal show test', unref(props).editSchema)
    }

    expose({
      setValues,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      // showEditForm,
      // hideEditForm,
      setFormFieldReadOnly,
      setFormOpera,
      getFormData,
      setModalShow
    })

    return {
      modalShow,
      saveLoadingFlag,
      doSave,
      formOpera,
      doOk,
      doCancel,
      register,
      t,
      titleName
    }
  }
})
</script>

<style scoped lang="less"></style>

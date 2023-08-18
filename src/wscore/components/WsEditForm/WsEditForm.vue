<template>
  <ContentWrap v-if="formVisible">
    <WsForm
      :is-custom="false"
      :label-width="labelWidth"
      :is-col="isCol"
      :schema="editSchema"
      @register="register"
      ref="thsEditFormInner"
    />
    <div class="text-center">
      <el-divider />
      <el-button
        type="primary"
        :loading="saveLoadingFlag"
        @click="doSave"
        v-if="formOpera === 'ADD' || formOpera === 'MOD'"
      >
        {{ t('wsBase.save') }}
      </el-button>

      <el-button @click="doExit">{{ t('wsBase.cancel') }}</el-button>
    </div>
  </ContentWrap>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  PropType,
  ref,
  unref,
  watch
} from 'vue'
import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import ContentWrap from '@/components/ContentWrap/src/ContentWrap.vue'
import { propTypes } from '@/utils/propTypes'
import { useWsForm } from '@/wscore/hook/useWsForm'
import { useI18n } from 'vue-i18n'
import { ElButton, ElDivider } from 'element-plus'
import { FormProps } from '@/components/Form/src/types'
import { FormOpera } from '@/wscore/api/base/base'
import { useEmitt } from '@/hooks/web/useEmitt'
import { FormSchema, FormSetPropsType } from '@/types/form'

export default defineComponent({
  name: 'WsEditForm',
  components: { ContentWrap, WsForm, ElButton, ElDivider },
  props: {
    editSchema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
    isCol: propTypes.bool.def(true),
    saveLoading: propTypes.bool.def(false),
    //功能号
    funcNo: propTypes.string.def(''),
    ifShow: propTypes.bool.def(false)
  },
  emits: ['evSave', 'evExit', 'register', 'ev-item-return', 'ev-item-change'],
  setup(props, { emit, expose }) {
    const { t } = useI18n()
    const { register, methods } = useWsForm()

    const editForm = getCurrentInstance()

    const saveLoadingFlag = unref(props).saveLoading

    const formVisible = ref(false)

    //form操作记录。
    const formOpera = ref(FormOpera.INIT)

    let addPageVisibleFlag = false

    const doSave = () => {
      methods.getFormData().then((res) => {
        emit('evSave', unref(res), unref(formOpera))
      })
    }

    const doExit = () => {
      emit('evExit', addPageVisibleFlag)
    }

    const getFuncNo = computed(() => {
      return {
        funcNo: unref(props.funcNo)
      }
    })

    //用于捕获在Data中定义的事件
    useEmitt({
      name: 'ev-item-return',
      callback: ({ itemName, itemValue, retData }) => {
        emit('ev-item-return', itemName, itemValue, retData)
      }
    })

    //抛出相应的字段
    useEmitt({
      name: 'ev-item-change',
      callback: ({ itemName, itemValue }) => {
        //
        methods.getFormData().then((result) => {
          emit('ev-item-change', itemName, itemValue, result)
        })
      }
    })

    // const doItemReturn = ({ itemName, itemValue, retData }) => {
    //   //debug
    //   console.log('doitemreturn---wsEditForm', editForm)
    //   emit('ev-item-return', itemName, itemValue, retData)
    // }

    onMounted(() => {
      emit('register', unref(editForm), unref(editForm))
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

    const showEditForm = () => {
      formVisible.value = true
    }

    const hideEditForm = () => {
      formVisible.value = false
    }

    const setFormFieldReadOnly = (readOnlyFlag: boolean) => {
      methods.setFormFieldReadOnly(readOnlyFlag)
    }

    const setFormOpera = (formOp: FormOpera) => {
      formOpera.value = formOp
    }

    const getFormData = async () => {
      return await methods.getFormData()
    }

    watch(
      () => props.ifShow,
      (val) => {
        if (val !== null && val) {
          formVisible.value = props.ifShow
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    expose({
      setValues,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      showEditForm,
      hideEditForm,
      setFormFieldReadOnly,
      setFormOpera,
      getFormData
    })

    return {
      register,
      editForm,
      methods,
      t,
      doSave,
      doExit,
      saveLoadingFlag,
      getFuncNo,
      formVisible,
      formOpera
    }
  }
})
</script>

<style scoped></style>

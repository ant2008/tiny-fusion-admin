import { nextTick, ref, unref } from 'vue'

import { WsFormExpose } from '@/wscore/components/WsEditForm/WsEditFormType'
import { ElMessageBox } from 'element-plus'
import { addPost, FormOpera, initAdd, modPost } from '@/wscore/api/base/base'
import { FormProps } from '@/components/Form/src/types'
import { CommitPostRequest } from '@/wscore/api/base/basetype'
import WsModalForm from '@/wscore/components/WsModalForm/WsModalForm.vue'
import { FormSchema, FormSetPropsType } from '@/types/form'

export const useWsModalForm = (funcNo?: string) => {
  // From实例
  const formRef = ref<typeof WsModalForm & WsFormExpose>()

  // ElForm实例
  // const elFormRef = ref<ComponentRef<typeof ElForm>>()

  const formOpera = ref(FormOpera.INIT)

  /**
   * @param ref Form实例
   * @param elRef ElForm实例
   */
  const modalFormRegister = (ref: typeof WsModalForm & WsFormExpose) => {
    //debug
    console.log('modalFormRegister-ref', ref)
    formRef.value = ref
  }

  const getForm = async () => {
    await nextTick()
    const form = unref(formRef)
    if (!form) {
      console.error('The form is not registered. Please use the register method to register')
    }
    return form
  }

  // 一些内置的方法
  const editFormMethods: {
    setProps: (props: Recordable) => void
    setValues: (data: Recordable) => void
    getFormData: <T = Recordable | undefined>() => Promise<T>
    setSchema: (schemaProps: FormSetPropsType[]) => void
    addSchema: (formSchema: FormSchema, index?: number) => void
    delSchema: (field: string) => void
    getFormSchemaDatas: <T = Recordable | undefined>() => Promise<T>
    saveCommit: (formData: Recordable, formOp: string) => Promise<Recordable>
    initAdd: () => void
    showEditForm: () => void
    hideEditForm: () => void
    addForm: () => void
    modForm: (formData: Recordable) => void
    viewForm: (formData: Recordable) => void
    setFormReadOnly: (readOnlyFlag: boolean) => void
    getFormOpera: () => string
    setFormOpera: (formOp: string) => void
  } = {
    setProps: async (props: FormProps = {}) => {
      const form = await getForm()
      form?.exposed.setProps(props)
    },

    setValues: async (data: Recordable) => {
      const form = await getForm()
      form?.exposed.setValues(data)
    },

    /**
     * @param schemaProps 需要设置的schemaProps
     */
    setSchema: async (schemaProps: FormSetPropsType[]) => {
      const form = await getForm()
      form?.exposed.setSchema(schemaProps)
    },

    /**
     * @param formSchema 需要新增数据
     * @param index 在哪里新增
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const form = await getForm()
      form?.exposed.addSchema(formSchema, index)
    },

    /**
     * @param field 删除哪个数据
     */
    delSchema: async (field: string) => {
      const form = await getForm()
      form?.exposed.delSchema(field)
    },

    /**
     * @returns form data
     */
    getFormData: async <T = Recordable>(): Promise<T> => {
      const form = await getForm()
      return form?.exposed.formModel as T
    },
    getFormSchemaDatas: async <T = Recordable>(): Promise<T> => {
      const form = await getForm()
      return form?.exposed.getFormSchemaDatas() as T
    },
    saveCommit: async (formData: Recordable, formOp: string): Promise<Recordable> => {
      if (formData !== undefined) {
        const paramRequest: CommitPostRequest = {
          formData: formData,
          aFuncNo: funcNo === undefined ? '' : funcNo
        }

        if (formOp === 'ADD') {
          const res = await addPost(paramRequest)
          if (res['code'] !== '200') {
            ElMessageBox.alert('保存错误:' + res['msg'], '提示')
          } else {
            ElMessageBox.alert('保存成功' + res['msg'], '提示')
          }
        } else if (formOp === 'MOD') {
          const res2 = await modPost(paramRequest)
          if (res2['code'] !== '200') {
            ElMessageBox.alert('保存错误:' + res2['msg'], '提示')
          } else {
            ElMessageBox.alert('保存成功' + res2['msg'], '提示')
          }
        }
      }
      return formData
    },
    initAdd: async () => {
      const res = await initAdd(funcNo == undefined ? '' : funcNo)
      const form = await getForm()
      if (res.data !== null && res.data !== undefined) {
        form?.exposed.setValues(res.data)
      }
    },
    showEditForm: async () => {
      const form = await getForm()
      //DEBUG
      console.log('showEditForm', form)
      return await form?.exposed.setModalShow(true)
    },
    hideEditForm: async () => {
      const form = await getForm()
      return form?.exposed.hideEditForm()
    },
    addForm: async () => {
      await editFormMethods.showEditForm()
      await editFormMethods.setFormReadOnly(false)
      await editFormMethods.initAdd()
      await editFormMethods.setFormOpera(FormOpera.ADD)
    },
    modForm: async (formData: Recordable) => {
      await editFormMethods.showEditForm()
      await editFormMethods.setFormReadOnly(false)
      await editFormMethods.setValues(formData)
      await editFormMethods.setFormOpera(FormOpera.MOD)
    },
    viewForm: async (formData: Recordable) => {
      await editFormMethods.showEditForm()
      await editFormMethods.setFormReadOnly(true)
      await editFormMethods.setValues(formData)
      await editFormMethods.setFormOpera(FormOpera.VIEW)
    },
    setFormReadOnly: async (readOnlyFlag: boolean) => {
      const form = await getForm()
      return form?.exposed.setFormFieldReadOnly(readOnlyFlag)
    },
    getFormOpera: () => {
      return unref(formOpera)
    },
    setFormOpera: async (formOp: FormOpera) => {
      const form = await getForm()
      form?.exposed.setFormOpera(formOp)
      formOpera.value = formOp
    }
  }

  //props && editFormMethods.setProps(props)

  return { modalFormRegister, editFormRef: formRef, editFormMethods }
}

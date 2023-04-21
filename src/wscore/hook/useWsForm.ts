import { FormProps } from '@/components/Form/src/types'
import { getCurrentInstance, nextTick, ref, unref } from 'vue'
import { FormExpose } from '@/components/Form'
import { ElForm } from 'element-plus'
import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import { FormSchema, FormSetPropsType } from '@/types/form'

export const useWsForm = (props?: FormProps) => {
  // From实例
  const formRef = ref<typeof WsForm & FormExpose>()

  // ElForm实例
  const elFormRef = ref<ComponentRef<typeof ElForm>>()

  /**
   * @param ref Form实例
   * @param elRef ElForm实例
   */
  const register = (ref: typeof WsForm & FormExpose, elRef: ComponentRef<typeof ElForm>) => {
    //debug
    console.log('useWsForm register', ref)
    formRef.value = ref
    elFormRef.value = elRef
  }

  const getForm = async () => {
    //debug
    console.log('useWsForm', formRef, getCurrentInstance())
    await nextTick()
    const form = unref(formRef)
    if (!form) {
      console.error('The form is not registered. Please use the register method to register')
    }
    return form
  }

  // 一些内置的方法
  const methods: {
    setProps: (props: Recordable) => void
    setValues: (data: Recordable) => void
    getFormData: <T = Recordable | undefined>() => Promise<T>
    setSchema: (schemaProps: FormSetPropsType[]) => void
    addSchema: (formSchema: FormSchema, index?: number) => void
    delSchema: (field: string) => void
    getFormSchemaDatas: <T = Recordable | undefined>() => Promise<T>
    setFormFieldReadOnly: (readOnlyFlag: boolean) => void
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
      //debug
      console.log('usewsform getform', form)
      // return form?.getFormSchemaDatas() as Recordable
      return form?.exposed.getFormSchemaDatas() as T
    },
    setFormFieldReadOnly: async (readOnlyFlag: boolean) => {
      const form = await getForm()
      form?.exposed.setFormFieldReadOnly(readOnlyFlag)
    }
  }

  props && methods.setProps(props)

  return {
    register,
    elFormRef,
    methods
  }
}

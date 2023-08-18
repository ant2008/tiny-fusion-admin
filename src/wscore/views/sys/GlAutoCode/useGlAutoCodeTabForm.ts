import GlAutoCodeTabForm from '@/wscore/views/sys/GlAutoCode/GlAutoCodeTabForm.vue'
import { nextTick, ref, unref } from 'vue'

// interface GlAutoCodeTabFormExpose {
//   showTabForm: (formData: Recordable) => void
// }

export const useGlAutoCodeTabForm = () => {
  // From实例
  const formRef = ref<InstanceType<typeof GlAutoCodeTabForm>>()

  const tabFormRegister = (ref: typeof GlAutoCodeTabForm) => {
    formRef.value = ref
    //debug
    console.log('useGlAutoCodeForm', ref)
  }

  const getForm = async () => {
    await nextTick()
    const form = unref(formRef)
    if (!form) {
      console.error('The form is not registered. Please use the register method to register')
    }
    return form
  }
  const tabFormMethods: {
    showTabForm: (formData: Recordable) => void
    hideTabForm: () => void
  } = {
    showTabForm: async (formData: Recordable) => {
      const form = await getForm()
      return form?.exposed.showTabForm(formData)
    },
    hideTabForm: async () => {
      const form = await getForm()
      form?.exposed.hideTabForm()
    }
  }

  return { tabFormRegister, formRef, tabFormMethods }
}

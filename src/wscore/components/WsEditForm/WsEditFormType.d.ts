import WsForm from '@/wscore/components/WsForm/WsForm.vue'
import { FormExpose } from '@/components/Form'

export interface WsFormExpose extends FormExpose {
  addCommit: (formData: Recordable) => Recordable
  initAdd: <T>() => Promise<T>
  modCommit: (formData: Recordable) => Recordable
  initMod: <T>() => Promise<T>
  getFuncNo: string
  getFormInner: () => Promise<WsForm>
}

export type WsEditFormProp = {
  funcNo: string
}

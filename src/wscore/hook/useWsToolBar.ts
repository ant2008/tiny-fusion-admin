import { VxeTableInstance } from 'vxe-table'
import WsToolBar from '@/wscore/components/WsToolBar/WsToolBar.vue'
import { ref } from 'vue'
import { WsToolBarExpose } from '@/wscore/components/WsToolBar/WsToolBarType'

export const useWsToolBar = () => {
  const refCp = ref<typeof WsToolBar & WsToolBarExpose>()

  const refElCp = ref<VxeTableInstance>()

  const toolBarRegister = (
    ref: typeof WsToolBar & WsToolBarExpose,
    elRef: ComponentRef<VxeTableInstance>
  ) => {
    refCp.value = ref
    refElCp.value = elRef
    //debug
    console.log('test', refCp.value, refElCp.value)
    // console.log('test2', unref(refCp)?.exposed['addPageVisibleFlag'].value)
  }

  return {
    toolBarRegister
  }
}

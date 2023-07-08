import WsToolBar from '@/wscore/components/WsToolBar/WsToolBar.vue'
import { nextTick, ref, unref } from 'vue'
import { WsToolBarExpose } from '@/wscore/components/WsToolBar/WsToolBarType'

export const useWsToolBar = () => {
  const refCp = ref<typeof WsToolBar & WsToolBarExpose>()

  // const refTableCp = ref<VxeTableInstance>()

  const toolBarRegister = (ref: typeof WsToolBar & WsToolBarExpose) => {
    refCp.value = ref
  }

  const getToolBar = async () => {
    await nextTick()
    const thsCp = unref(refCp)
    if (!thsCp) {
      console.error('The toolBar is not registered. Please use the register method to register')
    }
    return thsCp
  }

  const toolBarMethods: {
    getPermissionData: <T = Recordable | undefined>() => Promise<T>
    hasModR: () => Promise<boolean>
  } = {
    getPermissionData: async <T = Recordable>(): Promise<T> => {
      const thsCp = await getToolBar()
      return thsCp?.exposed.getPagePermission() as T
    },
    hasModR: async () => {
      const thsCp = await getToolBar()
      return thsCp?.exposed.hasModR()
    }
  }

  return {
    toolBarRegister,
    toolBarMethods
  }
}

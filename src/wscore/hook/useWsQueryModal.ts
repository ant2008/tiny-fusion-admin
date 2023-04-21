import { ref, unref } from 'vue'
import QueryModal from '@/wscore/modal/QueryModal/QueryModal.vue'
import { QueryModalExpose } from '@/wscore/modal/QueryModal/QueryModalType'

export const useWsQueryModal = () => {
  const refCp = ref<typeof QueryModal & QueryModalExpose>()
  const queryModalRegister = (ref: typeof QueryModal & QueryModalExpose) => {
    refCp.value = ref
  }
  const methods: {
    openModal: () => void
    closeModal: () => void
  } = {
    openModal: () => {
      const ths = unref(refCp)
      ths?.exposed.openModal()
    },
    closeModal: () => {
      const ths = unref(refCp)
      ths?.exposed.closeModal()
    }
  }
  return {
    refCp,
    queryModalRegister,
    methods
  }
}

<template>
  <QueryModal
    :query-func-no="funcNo"
    :show-columns="showColums"
    @ev-return="doReturn"
    @modal-register="queryModalRegister"
    v-model:show="modalShow"
    :query-value="queryValue"
    :radio-selection="true"
  />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, PropType, ref, unref } from 'vue'
import QueryModal from '@/wscore/modal/QueryModal/QueryModal.vue'
import { useWsQueryModal } from '@/wscore/hook/useWsQueryModal'
import { propTypes } from '@/utils/propTypes'
import { TableColumn } from '@/types/table'

export default defineComponent({
  name: 'QuickQueryModal',
  components: { QueryModal },
  props: {
    inValue: propTypes.string.def(''),
    showColums: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    funcNo: propTypes.string.def('')
  },
  emits: ['ev-return', 'query-modal-register', 'update:value'],
  setup(props, { emit, expose }) {
    const thsCp = getCurrentInstance()

    const modalShow = ref(false)

    const queryValue = ref('')

    const { queryModalRegister, methods } = useWsQueryModal()

    const doReturn = (retData) => {
      emit('update:value', retData['itemId'])
      emit('ev-return', retData)
    }

    const openModal = () => {
      methods.openModal()
    }

    const closeModal = () => {
      methods.closeModal()
    }

    onMounted(() => {
      emit('query-modal-register', unref(thsCp))
      queryValue.value = unref(props).inValue
    })

    expose({
      openModal,
      closeModal
    })
    return {
      queryValue,
      doReturn,
      queryModalRegister,
      modalShow,
      methods
    }
  }
})
</script>

<style scoped></style>

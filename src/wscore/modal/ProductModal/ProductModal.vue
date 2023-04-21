<template>
  <QueryModal
    :query-func-no="funcNo"
    :show-columns="productShowColumns"
    @ev-return="doReturn"
    @modal-register="queryModalRegister"
    v-model:show="modalShow"
    :query-value="queryValue"
    :radio-selection="true"
  />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref, unref } from 'vue'
import { productShowColumns } from '@/wscore/modal/ProductModal/ProductModalData'
import QueryModal from '@/wscore/modal/QueryModal/QueryModal.vue'
import { useWsQueryModal } from '@/wscore/hook/useWsQueryModal'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  name: 'ProductModal',
  components: { QueryModal },
  props: {
    inValue: propTypes.string.def('')
  },
  emits: ['ev-return', 'query-modal-register', 'update:value'],

  setup(props, { emit, expose }) {
    const funcNo = 'MGoods'
    const thsCp = getCurrentInstance()

    const modalShow = ref(false)

    const queryValue = ref('')

    const { queryModalRegister, methods } = useWsQueryModal()

    const doReturn = (retData) => {
      emit('update:value', retData['itemId'])
      emit('ev-return', retData)
    }

    const openModal = () => {
      //alert('productmodal-open')
      //debug
      //console.log('productmodal-openmodal', methods)
      //modalShow.value = true
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
      productShowColumns,
      funcNo,
      doReturn,
      queryModalRegister,
      modalShow,
      methods
    }
  }
})
</script>

<style scoped></style>

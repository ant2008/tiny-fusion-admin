<template>
  <WsQuickQueryInput
    func-no="MiniMallProduct"
    :quick-show-columns="miniMallShowColumns"
    :readonly="readonly"
    item-key="productId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { miniMallShowColumns } from '@/wscore/components/WsMiniMallProductInput/WsMiniMallProductInputData'

export default defineComponent({
  name: 'WsMiniMallProductInput',
  components: { WsQuickQueryInput },
  inheritAttrs: false,
  props: {
    readonly: propTypes.bool.def(false),
    style: propTypes.style.def({}),
    modelValue: propTypes.string.def('')
  },
  emits: ['ev-item-return', 'update:modelValue'],
  setup(_props, { emit }) {
    const doItemReturn = (itemName, itemValue, retData) => {
      emit('ev-item-return', itemName, itemValue, retData)
    }

    return {
      miniMallShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

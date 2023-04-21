<template>
  <WsQuickQueryInput
    func-no="GlCustomer"
    :quick-show-columns="glCustomerShowColumns"
    :readonly="readonly"
    item-key="customerId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { glCustomerShowColumns } from '@/wscore/components/WsGlCustomerInput/WsGlCustomerInputData'

export default defineComponent({
  name: 'WsGlCustomerInput',
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
      glCustomerShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

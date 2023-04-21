<template>
  <WsQuickQueryInput
    func-no="MVendor"
    :quick-show-columns="vendorShowColumns"
    :readonly="readonly"
    item-key="vendorId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { vendorShowColumns } from '@/wscore/components/WsVendorInput/WsVendorInputData'

export default defineComponent({
  name: 'WsVendorInput',
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
      vendorShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

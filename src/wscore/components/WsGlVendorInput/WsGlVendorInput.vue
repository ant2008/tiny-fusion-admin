<template>
  <WsQuickQueryInput
    func-no="MGlVendor"
    :quick-show-columns="glVendorShowColumns"
    :readonly="readonly"
    item-key="vendorId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { glVendorShowColumns } from '@/wscore/components/WsGlVendorInput/WsGlVendorInputData'

export default defineComponent({
  name: 'WsGlVendorInput',
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
      glVendorShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

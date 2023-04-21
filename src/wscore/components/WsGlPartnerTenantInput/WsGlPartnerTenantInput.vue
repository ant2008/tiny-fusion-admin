<template>
  <WsQuickQueryInput
    func-no="GlPartnerTenant"
    :quick-show-columns="partnerShowColumns"
    :readonly="readonly"
    item-key="targetTenantId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { partnerShowColumns } from '@/wscore/components/WsGlPartnerTenantInput/WsGlPartnerTenantInputData'

export default defineComponent({
  name: 'WsGlPartnerTenantInput',
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
      partnerShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

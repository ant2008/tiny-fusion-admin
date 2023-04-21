<template>
  <WsQuickQueryInput
    func-no="MSystenant"
    :quick-show-columns="tenantShowColumns"
    :readonly="readonly"
    item-key="tenantId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { tenantShowColumns } from '@/wscore/components/WsTenantInput/WsTenantInputData'

export default defineComponent({
  name: 'WsTenantInput',
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
      tenantShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

<template>
  <WsQuickQueryInput
    func-no="CounsellorApply"
    :quick-show-columns="glCounsellorShowColumns"
    :readonly="readonly"
    item-key="counsellorId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { glCounsellorShowColumns } from '@/wscore/components/WsGlCounsellorInput/WsGlCounsellorInputData'

export default defineComponent({
  name: 'WsGlCounsellorInput',
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
      glCounsellorShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

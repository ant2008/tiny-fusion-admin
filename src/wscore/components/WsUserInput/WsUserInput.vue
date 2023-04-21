<template>
  <WsQuickQueryInput
    func-no="MUser"
    :quick-show-columns="userShowColumns"
    :readonly="readonly"
    item-key="userId"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { userShowColumns } from '@/wscore/components/WsUserInput/WUserInputData'

export default defineComponent({
  name: 'WsUserInput',
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
      userShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

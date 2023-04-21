<template>
  <WsQuickQueryInput
    func-no="GlTplColumns"
    :quick-show-columns="tplFormSubShowColumns"
    :readonly="readonly"
    item-key="gplTableName"
    @ev-item-return="doItemReturn"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import WsQuickQueryInput from '@/wscore/components/WsQuickQueryInput/WsQuickQueryInput.vue'
import { tplFormSubShowColumns } from '@/wscore/components/WsTplFormSubInput/WsTplFormSubInputData'

export default defineComponent({
  name: 'WsTplFormSubInput',
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
      tplFormSubShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

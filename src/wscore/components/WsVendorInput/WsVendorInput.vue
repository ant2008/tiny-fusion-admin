<template>
  <WsQuickQueryInput
    func-no="MVendor"
    :quick-show-columns="vendorShowColumns"
    :readonly="readonly"
    item-key="vendorId"
    @ev-item-return="doItemReturn"
    v-model="inputValue"
  />
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue'
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
    const inputValue = ref('')
    watch(
      () => _props.modelValue,
      (value) => {
        nextTick(() => {
          if (value && value !== '') {
            inputValue.value = value
          } else {
            inputValue.value = ''
          }
        })
      },
      { immediate: true, deep: true }
    )

    return {
      inputValue,
      vendorShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

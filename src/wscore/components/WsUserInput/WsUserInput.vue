<template>
  <WsQuickQueryInput
    func-no="MUser"
    :quick-show-columns="userShowColumns"
    :readonly="readonly"
    item-key="userId"
    @ev-item-return="doItemReturn"
    v-model="inputValue"
  />
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue'
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
      userShowColumns,
      doItemReturn
    }
  }
})
</script>

<style scoped lang="less"></style>

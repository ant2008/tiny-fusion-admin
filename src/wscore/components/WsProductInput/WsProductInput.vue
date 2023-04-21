<template>
  <ElInput
    :readonly="readonly"
    v-model="inputValue"
    :input-style="style"
    @keydown.enter="doenter"
    @input="doInput"
    ref="_thsInput"
    v-bind="bindProps"
  >
    <template #suffix>
      <ElButton type="primary" link @click="doclick" :disabled="readonly">
        <template #icon>
          <ElIcon><Search /></ElIcon>
        </template>
      </ElButton>
    </template>
  </ElInput>
  <ProductModal
    @query-modal-register="queryModalRegister"
    @ev-return="doReturn"
    :in-value="inputValue"
  />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, unref, useAttrs, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElInput, ElButton, ElIcon } from 'element-plus'
import ProductModal from '@/wscore/modal/ProductModal/ProductModal.vue'
import { useWsQueryModal } from '@/wscore/hook/useWsQueryModal'
import { Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'WsProductInput',
  components: { Search, ProductModal, ElInput, ElButton, ElIcon },
  inheritAttrs: false,
  props: {
    readonly: propTypes.bool.def(false),
    //modelValue: propTypes.string.def(''),
    style: propTypes.style.def({}),
    modelValue: propTypes.string.def('')
  },
  emits: ['ev-item-return', 'update:modelValue'],
  setup(props, { emit }) {
    const selfCp = getCurrentInstance()

    const attrs = useAttrs()

    //绑定属性
    const getBindValue = () => {
      const delKeys = ['modelValue', 'v-model']
      const tmpProps = { ...unref(props) }
      for (const key in tmpProps) {
        if (delKeys.indexOf(key) !== -1) {
          delete tmpProps[key]
        }
      }
      return Object.assign({}, unref(tmpProps), unref(attrs))
    }

    const bindProps = getBindValue()

    // const selfInput = ref<ComponentRef<typeof ElInput>>()

    const { queryModalRegister, methods } = useWsQueryModal()

    // const inputValue = ref('a')

    const doenter = () => {
      //methods.openModal()
    }
    const doclick = () => {
      methods.openModal()
    }

    const doReturn = (retData) => {
      inputValue.value = retData['itemId']
      const selfInput = selfCp?.refs['_thsInput'] as ComponentRef<typeof ElInput>
      unref(selfInput)?.$forceUpdate()
      emit('ev-item-return', 'itemId', inputValue.value, retData)
      emit('update:modelValue', retData['itemId'])
    }

    const doInput = (val) => {
      emit('update:modelValue', val)
    }

    watch(
      () => props.modelValue,
      (value) => {
        if (value && value !== '') {
          inputValue.value = value
        }
      },
      { immediate: true, deep: true }
    )

    const inputValue = ref('')

    return {
      inputValue,
      queryModalRegister,
      doenter,
      doclick,
      doReturn,
      doInput,
      bindProps
    }
  }
})
</script>

<style scoped lang="less"></style>

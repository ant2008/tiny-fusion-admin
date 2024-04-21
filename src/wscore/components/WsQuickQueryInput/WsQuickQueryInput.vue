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
      <ElButton link @click="doclick" :disabled="readonly">
        <!--        <template #icon>-->
        <!--          <ElIcon><Search /></ElIcon>-->
        <!--        </template>-->
      </ElButton>
    </template>
  </ElInput>
  <QuickQueryModal
    @query-modal-register="queryModalRegister"
    @ev-return="doReturn"
    :in-value="inputValue"
    :show-colums="quickShowColumns"
    :func-no="funcNo"
  />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, ref, unref, useAttrs, watch } from 'vue'
import { ElButton, ElIcon, ElInput } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { useWsQueryModal } from '@/wscore/hook/useWsQueryModal'
import QuickQueryModal from '@/wscore/modal/QuickQueryModal/QuickQueryModal.vue'
import { TableColumn } from '@/components/Table/'
// import { Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'WsQuickQueryInput',
  components: { QuickQueryModal, ElInput, ElButton },
  inheritAttrs: false,
  props: {
    readonly: propTypes.bool.def(false),
    style: propTypes.style.def({}),
    modelValue: propTypes.string.def(''),
    quickShowColumns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    funcNo: propTypes.string.def(''),
    //这个itemKey一般需要为retData中的字段，不然容易出现不一致的数据情况
    itemKey: propTypes.string.def('')
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
      inputValue.value = retData[unref(props).itemKey]
      const selfInput = selfCp?.refs['_thsInput'] as ComponentRef<typeof ElInput>
      unref(selfInput)?.$forceUpdate()
      emit('ev-item-return', unref(props).itemKey, inputValue.value, retData)
      emit('update:modelValue', retData[unref(props).itemKey])
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

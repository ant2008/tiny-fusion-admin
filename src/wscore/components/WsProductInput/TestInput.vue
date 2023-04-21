<script lang="tsx">
import { defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElInput } from 'element-plus'

export default defineComponent({
  name: 'TestInput',
  props: {
    modelValue: propTypes.string.def('')
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const doInput = (val) => {
      // let val = e?.target?.value ?? ''
      //debug
      console.log('e-value', val)
      // emit('update:change', value)
      //inputValue.value = val
      // nextTick(() => {
      //   emit('update:value', val)
      // })
      emit('update:modelValue', val)

      //emit('input', value)
    }
    expose({
      doInput
    })
    return () => <ElInput modelValue={props.modelValue} onInput={doInput} />
  }
})
</script>

<style scoped lang="less"></style>
